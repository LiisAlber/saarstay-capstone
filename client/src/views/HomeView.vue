<template>
  <div class="flex min-h-screen flex-col bg-[#F7EBE9]">
    <!-- Header -->
    <Header />

    <!-- Hero Section -->
    <section
      class="relative h-screen bg-cover bg-center p-4 pt-[80px] text-white"
      :style="{
        backgroundImage:
          'url(https://stghbucket.s3.eu-north-1.amazonaws.com/interior/vecteezy_ai-generated-living-room-in-green-color-with-wood-furniture_36746398.jpg)',
      }"
    >
      <!-- Overlay with increased opacity for a darker effect -->
      <div class="absolute bottom-0 left-0 right-0 top-0 bg-black bg-opacity-40"></div>
      <div
        class="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4"
      >
        <h1 class="mb-4 text-3xl font-extrabold sm:text-5xl">
          {{ t('hero.title') }}
        </h1>
        <p class="mb-6 mt-4 text-lg sm:mt-6 sm:text-xl">
          {{ t('hero.description') }}
        </p>
        <!-- BookingSubmit button -->
        <div class="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div class="flex justify-center">
            <BookingSubmit class="mt-6 md:mt-12 lg:mt-24" />
          </div>
        </div>
      </div>
    </section>

    <!-- Combined About Us and Gallery Section -->
    <section class="mx-8 my-8 flex flex-col items-stretch justify-center md:flex-row">
      <Gallery class="w-full md:mr-4 md:w-1/2" />
      <AboutSection class="w-full md:ml-4 md:w-1/2" />
    </section>

    <!-- What We Offer Section -->
    <WhatWeOffer />

    <!-- Pricelist Section -->
    <section class="bg-[#4F6259]">
      <div class="mx-auto max-w-6xl p-4">
        <PriceList class="mx-auto" />
      </div>
    </section>

    <!-- Feedback Section -->
    <FeedbackDisplay class="mb-8" />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import BookingSubmit from '@/components/BookingSubmit.vue'
import Header from '@/components/Header.vue'
import FeedbackDisplay from '@/components/FeedbackDisplay.vue'
import WhatWeOffer from '@/components/WhatWeOffer.vue'
import AboutSection from '@/components/AboutSection.vue'
import Footer from '@/components/Footer.vue'
import Gallery from '@/components/Gallery.vue'
import PriceList from '@/components/PriceList.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.text-shadow {
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
}

@media (min-width: 768px) {
  .md\:w-1\/2 {
    width: 50%;
  }
  .md\:mr-4 {
    margin-right: 1rem;
  }
  .md\:ml-4 {
    margin-left: 1rem;
  }
}
</style>
