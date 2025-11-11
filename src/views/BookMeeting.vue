<template>
  <div>
    <NavBar />

    <main class="book-meeting-main">
      <!-- Sticky Back to Home Button -->
      <RouterLink class="btn-back-home" to="/" title="Back to Home">
        <i class="bi bi-house-fill"></i>
        <span class="btn-text">Back to Home</span>
      </RouterLink>
      
      <section class="page-wrap">
        <!-- Hero -->
        <header class="hero">
          <h1>Book a Meeting</h1>
          <p class="tagline">
            Schedule a 30-minute meeting to connect with me.
          </p>
        </header>

        <!-- Cal.com Embed -->
        <div class="cal-embed-container">
          <div class="cal-embed-wrapper">
            <div id="my-cal-inline-30min" class="cal-inline-embed"></div>
          </div>
          <div class="cal-notes">
            <p class="cal-notes-title">Important Notice</p>
            <p class="cal-notes-content">
              Please make sure to fill in the <strong>Additional notes</strong> with the reason for the meeting 
              (e.g., "Interview invitation from [Company Name]"). Meetings without this information will be automatically <strong>cancelled</strong>.
            </p>
          </div>
        </div>
      </section>
    </main>

    <FooterComponent />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { RouterLink } from 'vue-router';

// Initialize Cal.com embed using official embed code
function initCalEmbed() {
  // Initialize Cal namespace loader (from Cal.com official code)
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else {
          p(cal, ar);
        }
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  // Initialize Cal with namespace
  window.Cal("init", "30min", { origin: "https://app.cal.com" });

  // Configure inline embed
  window.Cal.ns["30min"]("inline", {
    elementOrSelector: "#my-cal-inline-30min",
    config: { "layout": "month_view" },
    calLink: "chris-luo-myweb/30min",
  });

  // Configure UI
  window.Cal.ns["30min"]("ui", {
    "cssVarsPerTheme": {
      "light": { "cal-brand": "#082f59" },
      "dark": { "cal-brand": "#e9a235" }
    },
    "hideEventTypeDetails": false,
    "layout": "month_view"
  });
}

onMounted(() => {
  // Scroll to top on mount
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Initialize Cal.com embed after component is mounted
  initCalEmbed();
});
</script>

