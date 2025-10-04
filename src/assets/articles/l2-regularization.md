# Do you “+“ or “-“ in the L2 Regularization ?

## 🎯 The key point:

Whether L2 regularization is **added** or **subtracted** depends on **how the objective function is defined**:

| If you're... | You should... | 
|---|---|
| **Maximizing** log-likelihood | **Subtract** L2 penalty | 
| **Minimizing** loss (e.g., MSE) | **Add** L2 penalty | 

---

## ✅ In My Note

You're minimizing the **mean squared error (MSE)** loss:

$$
\min_w \sum_{i=1}^{n} (y_i - w^T x_i)^2 + \lambda \sum_{j=1}^{p} w_j^2
$$

- The **L2 regularization term** $\lambda \sum w_j^2$ is **added** to the loss.

- This is standard when minimizing errors.

### ➕ Why **plus**?

Because regularization is meant to **penalize** large weights.\
So it **increases** the loss value if your weights are too large.

---

## 🔁 But in Logistic Regression...

When we work with the **log-likelihood**, we usually **maximize** it:

$$
\max_w \log L(w) = \sum_i \log P(y_i \mid x_i, w)
$$

Then, adding L2 regularization gives:

$$
\log L(w) - \frac{\lambda}{2} \|w\|^2
$$

Here the L2 term is **subtracted** to **penalize** overly large weights — making the overall objective smaller when weights grow.

---

## 🔁 Duality: Maximizing vs Minimizing

| Objective Type | Expression | L2 Sign | 
|---|---|---|
| Minimize loss (MSE, cross-entropy) | $\text{Loss} + \lambda \|w\|^2$ | **+** | 
| Maximize log-likelihood | $\log L(w) - \lambda \|w\|^2$ | **-** | 

So:

> It's not that **one is wrong and one is right** — they’re just written from opposite **optimization perspectives**.