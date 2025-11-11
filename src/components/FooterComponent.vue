<template>
  <footer>
    <div class="container text-center">
      <div class="social-icons mb-2">
        <a :href="personalInfo.socials.linkedin" target="_blank" rel="noopener noreferrer"
          ><i class="bi bi-linkedin"></i
        ></a>
        <a :href="personalInfo.socials.github" target="_blank" rel="noopener noreferrer"
          ><i class="bi bi-github"></i
        ></a>
        <a :href="'mailto:' + personalInfo.email"
          ><i class="bi bi-envelope-fill"></i
        ></a>
      </div>
      <p>
        &copy; {{ new Date().getFullYear() }} {{ personalInfo.name }}. All
        Rights Reserved.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const personalInfo = ref({
  name: 'JI DUNG LO',
  email: 'chrislo5311@gmail.com',
  phone: '((408) 387-4040)',
  socials: {
    linkedin: 'https://www.linkedin.com/in/ji-dung-lo-b4b350189/',
    github: 'https://github.com/chrisluo5311'
  }
});
</script>
