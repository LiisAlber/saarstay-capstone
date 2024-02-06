<template>
  <div class="carousel-container">
    <Carousel :itemsToShow="1" :wrapAround="true" :autoplayTimeout="3000" :navigationEnabled="true">
      <Slide v-for="(image, index) in images" :key="index">
        <img :src="image" :alt="'Image ' + (index + 1)" class="slide-img" />
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const images = [
  'https://stghbucket.s3.eu-north-1.amazonaws.com/interior/342527477_940737597078606_2584740212666738388_n.jpg',
  'https://stghbucket.s3.eu-north-1.amazonaws.com/interior/385054423_333224095891928_4164220259967355016_n.jpg',
  'https://stghbucket.s3.eu-north-1.amazonaws.com/interior/385775339_333224145891923_6596905371440269734_n.jpg',
  'https://stghbucket.s3.eu-north-1.amazonaws.com/interior/vecteezy_ai-generated-green-master-bedroom-that-looks-like-a_35675864.jpg',
]
</script>

<style scoped>
.carousel-container {
  max-width: 50%;
  margin: auto;
}

.slide-img {
  max-width: 100%;
  display: block;
  margin: 0 auto;
  height: auto;
}

/* Navigation buttons styles */
.vue3-carousel__navigation-button {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  border: none;
  color: white; /* Arrow color */
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.vue3-carousel__navigation-button:hover {
  background-color: rgba(0, 0, 0, 0.7); /* Darker on hover */
}

@media (max-width: 768px) {
  .carousel-container {
    max-width: 95%;
  }
}
</style>
