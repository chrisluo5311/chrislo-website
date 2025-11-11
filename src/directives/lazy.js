// v-lazy: IntersectionObserver based lazy loading directive for images
// Usage examples:
//  - v-lazy="'https://example.com/image.jpg'"
//  - v-lazy="{ src: 'https://example.com/image.jpg', placeholder: 'data:image/svg+xml...' }"
//  - v-lazy="{ src: 'https://example.com/image.jpg', rootMargin: '50px' }"

function normalize(binding) {
  const def = {
    rootMargin: '50px', // Start loading 50px before image enters viewport
    threshold: 0.01,
    placeholder: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E', // Transparent 1x1 placeholder
  };

  if (!binding || !binding.value) return null;

  // If binding value is a string, treat it as the image source
  if (typeof binding.value === 'string') {
    return { ...def, src: binding.value };
  }

  // If binding value is an object, merge with defaults
  if (typeof binding.value === 'object') {
    return { ...def, ...binding.value };
  }

  return null;
}

// Setup lazy loading for an element
function setupLazyLoad(el, binding) {
  const config = normalize(binding);
  if (!config || !config.src) {
    console.warn('v-lazy: No image source provided');
    return;
  }

  // Clean up existing observer if any
  if (el.__lazyObserver) {
    el.__lazyObserver.disconnect();
    delete el.__lazyObserver;
  }

  // Set placeholder initially
  if (config.placeholder) {
    el.src = config.placeholder;
    el.classList.add('lazy-loading');
  }

  // Add loading state class
  el.classList.add('lazy-image');

  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Image is in viewport, load it
          const img = entry.target;
          const imageSrc = config.src;

          // Create new image to preload
          const imageLoader = new Image();
          
          imageLoader.onload = () => {
            img.src = imageSrc;
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-loaded');
            // Trigger load event for any listeners
            img.dispatchEvent(new Event('load'));
          };

          imageLoader.onerror = () => {
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-error');
            // Trigger error event
            img.dispatchEvent(new Event('error'));
          };

          // Start loading
          imageLoader.src = imageSrc;

          // Stop observing once loading starts
          observer.unobserve(img);
        }
      });
    },
    {
      rootMargin: config.rootMargin,
      threshold: config.threshold,
    }
  );

  // Start observing
  observer.observe(el);
  el.__lazyObserver = observer;
  el.__lazyConfig = config; // Store config for comparison in updated hook
}

export default {
  mounted(el, binding) {
    setupLazyLoad(el, binding);
  },
  updated(el, binding) {
    // Check if the source actually changed
    const oldConfig = el.__lazyConfig;
    const newConfig = normalize(binding);
    
    // Only update if source changed
    if (newConfig && newConfig.src && (!oldConfig || oldConfig.src !== newConfig.src)) {
      // Reset image state
      el.classList.remove('lazy-loaded', 'lazy-error');
      el.classList.add('lazy-loading');
      if (newConfig.placeholder) {
        el.src = newConfig.placeholder;
      }
      
      // Store new config
      el.__lazyConfig = newConfig;
      
      // Re-setup with new source
      setupLazyLoad(el, binding);
    }
  },
  beforeUnmount(el) {
    if (el.__lazyObserver) {
      el.__lazyObserver.disconnect();
      delete el.__lazyObserver;
    }
    if (el.__lazyConfig) {
      delete el.__lazyConfig;
    }
  },
};

