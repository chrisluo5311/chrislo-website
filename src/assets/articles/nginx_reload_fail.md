# **Nginx Reload Failure (`226/NAMESPACE`) – Technical Notes (with EC2 PrivateTmp Analysis)**

## **1\. Problem Description**

On AWS EC2, running:

```
sudo systemctl reload nginx
```

may fail even though Nginx is still **Active (running)**.\
This causes configuration changes to **not** be applied.

The error message indicates that systemd failed while preparing a sandbox namespace:

```
Failed to create destination mount point node '/run/systemd/unit-root/tmp'
Failed at step NAMESPACE
status=226/NAMESPACE
```

This issue is typically caused by systemd’s sandbox mechanism, not by nginx.conf syntax.

Root cause:\
→ **`PrivateTmp=true` in nginx.service breaks systemd’s mount namespace setup.**

---

## **2\. Example Error Output**

From `systemctl status nginx`:

```
Failed to create destination mount point node '/run/systemd/unit-root/tmp': No such file or directory
Failed to set up mount namespacing: /run/systemd/unit-root/tmp: No such file or directory
nginx.service: Failed at step NAMESPACE spawning /usr/sbin/nginx
status=226/NAMESPACE
```

However, `nginx -t` passes:

```
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

This confirms it’s a **systemd issue**, not an Nginx configuration issue.

---

## **3\. Why PrivateTmp Frequently Breaks on EC2**

Nginx’s `PrivateTmp=true` tends to malfunction on EC2 for several reasons:

### **1\. EC2 AMI tmpfs behavior differs from upstream systemd**

- Amazon Linux (especially Amazon Linux 2023 or patched versions)

   - Includes custom patches to systemd

   - Uses a slightly different tmpfs layout (especially `/run/systemd/unit-root`)

This can cause systemd to fail when creating the private namespace `/tmp`.

### **2\. `/run` may not be fully initialized after reboot**

`/run` is a tmpfs (memory-based), recreation occurs on every boot.

Sometimes:

- EC2’s boot sequence initializes services *before* systemd has fully prepared `/run/systemd/*`

- systemd then tries to create `/run/systemd/unit-root/tmp` but the parent directories do not yet exist

This race condition triggers the `226/NAMESPACE` failure.

### **3\. PrivateTmp depends on stable mount-namespace support**

If any of the following are misconfigured, sandbox creation fails:

- `/tmp` has unexpected permissions or mount type

- `/var/tmp` symlinked to a nonstandard location

- CloudWatch Agent, SSM Agent, or other daemons modified the mount table

- Manual edits to `/tmp` or related directories

- Permission mismatches on tmpfs directories

Result:\
**systemd fails during sandbox initialization → reload dies with `226/NAMESPACE`.**

In short:\
**EC2’s tmpfs behavior often conflicts with systemd sandboxing, and Nginx reload is the most common casualty.**

---

## **4\. Solution (Most Stable): Disable PrivateTmp for Nginx**

Instead of modifying the original unit file, create a service override.

### **1\. Create the override directory**

```
sudo mkdir -p /etc/systemd/system/nginx.service.d
```

### **2\. Create the override.conf**

```
sudo nano /etc/systemd/system/nginx.service.d/override.conf
```

Contents:

```
[Service]
PrivateTmp=false
```

### **3\. Reload systemd**

```
sudo systemctl daemon-reload
```

### **4\. Test reload**

```
sudo systemctl reload nginx
```

You should no longer see `226/NAMESPACE`.

### **5\. (Optional) Restart Nginx**

```
sudo systemctl restart nginx
```

This verifies that Nginx can fully restart without sandbox issues.