<template>
  <div class="flex min-h-screen flex-col bg-[#F7EBE9]">
    <!-- Header -->
    <Header class="fixed top-0 z-10 w-full bg-[#4F6259] bg-opacity-60 shadow-md" />

    <!-- Hero Section -->
    <section
      class="relative h-screen bg-cover bg-center p-4 pt-[80px] text-white"
      :style="{
        backgroundImage:
          'url(https://stghbucket.s3.eu-north-1.amazonaws.com/interior/vecteezy_ai-generated-living-room-in-green-color-with-wood-furniture_36746398.jpg)',
      }"
    >
      <!-- Overlay with increased opacity for a darker effect -->
      <div class="absolute bottom-0 left-0 right-0 top-0 bg-black bg-opacity-20"></div>
      <div
        class="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4"
      >
        <h1 class="mb-4 text-3xl font-extrabold sm:text-5xl">
          City charm meets contemporary elegance
        </h1>
        <p class="mb-6 mt-4 text-lg sm:mt-6 sm:text-xl">
          Embrace the fusion of modern elegance and city charm in the pulsating heart of Kuressaare.
        </p>
        <!-- BookingSubmit button -->
        <div class="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div class="flex justify-center">
            <BookingSubmit class="mt-6 md:mt-12 lg:mt-24" />
          </div>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <AboutSection />

    <!-- Gallery Section -->
    <section class="bg-[#F7EBE9]">
      <Gallery />
    </section>

    <!-- What We Offer Section -->
    <WhatWeOffer />

    <!-- Pricelist Section -->
    <section class="bg-[#F7EBE9] py-8">
      <div class="container mx-auto">
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
</script>

<style scoped>
.text-shadow {
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
