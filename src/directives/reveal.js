// v-reveal: IntersectionObserver based scroll reveal directive
// Usage examples:
//  - v-reveal
//  - v-reveal="'fade-up'"
//  - v-reveal="{ animation: 'fade-right', duration: 700, delay: 100, once: true }"
//  - v-reveal="{ animation: 'fade-up', stagger: 80 }"  // apply to children with incremental delays

function normalize(binding) {
  const def = {
    animation: 'fade-up',
    duration: 600,
    delay: 0,
    once: true,
    threshold: 0.15,
    rootMargin: '0px',
    stagger: 0, // ms per child, if > 0 apply to children instead of the container itself
  };
  if (!binding || !binding.value) return def;
  if (typeof binding.value === 'string') {
    return { ...def, animation: binding.value };
  }
  return { ...def, ...binding.value };
}

function applyBase(el, opts, delay = 0) {
  el.classList.add('reveal', `reveal-${opts.animation}`);
  el.style.transitionDuration = `${opts.duration}ms`;
  el.style.transitionDelay = `${Math.max(0, (opts.delay || 0) + delay)}ms`;
  el.style.willChange = 'opacity, transform';
}

export default {
  mounted(el, binding) {
    const opts = normalize(binding);

    // If stagger enabled, prepare children, otherwise prepare element itself
    let targets = [el];
    if (opts.stagger && el.children && el.children.length) {
      targets = Array.from(el.children);
      targets.forEach((child, idx) => applyBase(child, opts, idx * opts.stagger));
    } else {
      applyBase(el, opts, 0);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
          if (isVisible) {
            if (opts.stagger && el.children && el.children.length) {
              Array.from(el.children).forEach((child) => child.classList.add('is-visible'));
            } else {
              el.classList.add('is-visible');
            }
            if (opts.once) io.unobserve(entry.target);
          } else if (!opts.once) {
            if (opts.stagger && el.children && el.children.length) {
              Array.from(el.children).forEach((child) => child.classList.remove('is-visible'));
            } else {
              el.classList.remove('is-visible');
            }
          }
        });
      },
      { threshold: opts.threshold, rootMargin: opts.rootMargin }
    );

    // Observe the wrapper (if stagger) or element itself
    io.observe(el);
    el.__revealObserver = io;
  },
  beforeUnmount(el) {
    if (el.__revealObserver) {
      el.__revealObserver.disconnect();
      delete el.__revealObserver;
    }
  },
};
