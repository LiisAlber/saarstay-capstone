<template>
  <section class="about-section bg-pink-light py-8 text-left">
    <h2 class="about-heading text-4f6259 text-3xl mb-6 font-semibold">{{ t('about.title') }}</h2>
    <div class="about-content mx-auto max-w-prose text-4f6259 text-lg mb-4 leading-relaxed">
      <p class="mb-6 mt-8  font-medium">{{ t('about.paragraph1') }}</p>
      <p class="mb-6 mt-8 font-medium">{{ t('about.paragraph2') }}</p>
      <p class="mb-6 mt-8 font-medium">{{ t('about.paragraph3') }}</p>
      <p class="font-semibold mt-8 text-xl">{{ t('about.cta') }}</p>
    </div>
    <div class="social-icons flex justify-center gap-4 mt-4">
      <!-- Facebook Icon -->
      <i class="fa-brands fa-facebook-f text-2xl text-4f6259 hover:text-green-700 cursor-pointer"></i>
      <!-- Instagram Icon -->
      <i class="fa-brands fa-instagram text-2xl text-4f6259 hover:text-green-700 cursor-pointer"></i>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.about-section {
  background-color: #f7ebe9; /* Light pink background */
  padding: 2rem;
}

.about-heading {
  color: #4f6259; /* Dark green text */
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
}

.about-content p {
  color: #4f6259; /* Dark green text */
 
  margin-bottom: 0.5rem;
}

.text-4f6259 {
  --tw-text-opacity: 1;
  color: rgba(79, 98, 89, var(--tw-text-opacity));
}

</style>
