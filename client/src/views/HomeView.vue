<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <Header class="fixed top-0 z-10 w-full bg-[#4F6259] bg-opacity-60 shadow-md" />

        <!-- Hero Section with padding-top to push the content down below the header -->
        <section
      class="pt-[80px] h-screen bg-cover bg-center p-4 text-white relative"
      :style="{ backgroundImage: 'url(https://stghbucket.s3.eu-north-1.amazonaws.com/interior/vecteezy_ai-generated-living-room-in-green-color-with-wood-furniture_36746398.jpg)' }"
    >
      <!-- Overlay with increased opacity for a darker effect -->
      <div class="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20"></div>
    <div class="container mx-auto flex flex-col items-center justify-center h-full px-4 z-10 relative">
      <h1 class="text-3xl font-extrabold sm:text-5xl mb-4"> <!-- Added mb-4 for spacing -->
        City charm meets contemporary elegance
      </h1>
      <p class="mt-4 text-lg sm:mt-6 sm:text-xl mb-6"> <!-- Adjusted mb-6 for spacing -->
        Embrace the fusion of modern elegance and city charm in the pulsating heart of Kuressaare.
      </p>
        <!-- BookingSubmit button with responsive margin -->
        <div class="absolute bottom-0 left-0 right-0 pb-4 px-4">
      <!-- Center the button in the container -->
      <div class="flex justify-center">
        <BookingSubmit class="mt-6 md:mt-12 lg:mt-24" />
      </div>
    </div>
      </div>
    </section>
    
    <!-- About Us Section -->
    <AboutSection />

    <!-- Gallery Section -->
    <Gallery />

    <!-- What We Offer Section -->
    <WhatWeOffer />

    <!-- Feedback Section -->
    <FeedbackDisplay />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import BookingSubmit from '@/components/BookingSubmit.vue';
import Header from '@/components/Header.vue';
import FeedbackDisplay from '@/components/FeedbackDisplay.vue';
import WhatWeOffer from '@/components/WhatWeOffer.vue';
import AboutSection from '@/components/AboutSection.vue';
import Footer from '@/components/Footer.vue';
import Gallery from '@/components/Gallery.vue';
</script>


<style scoped>
.text-shadow {
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>