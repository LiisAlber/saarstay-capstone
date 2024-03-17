<template>
  <section class="about-section bg-pink-light py-8 text-center">
    <h2 class="text-4f6259 mb-6 text-2xl font-bold">{{ $t('about.title') }}</h2>
    <div class="about-content mx-auto max-w-prose">
      <p>{{ t('about.paragraph1') }}</p>
      <p>{{ t('about.paragraph2') }}</p>
      <p>{{ t('about.paragraph3') }}</p>
      <p>{{ t('about.paragraph4') }}</p>
      <p>{{ t('about.cta') }}</p>
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
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.text-4f6259 {
  --tw-text-opacity: 1;
  color: rgba(79, 98, 89, var(--tw-text-opacity));
}
.bg-pink-light {
  --tw-bg-opacity: 1;
  background-color: rgba(247, 235, 233, var(--tw-bg-opacity));
}
</style>
