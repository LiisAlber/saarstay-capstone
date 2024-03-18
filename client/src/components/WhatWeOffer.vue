<template>
  <section class="offers-section bg-pink-light py-8 text-center">
    <h2 class="text-4f6259 mb-6 text-2xl font-bold">{{ t('offers.title') }}</h2>
    <div class="offers-grid grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="offer-item" v-for="offer in offers" :key="offer.key">
        <i :class="['offer-icon', offer.icon]"></i>
        <div class="offer-text">{{ t(offer.key) }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const offers = [
  { icon: 'fas fa-home', key: 'offers.privateHouse' },
  { icon: 'fas fa-bed', key: 'offers.bedrooms' },
  { icon: 'fas fa-wifi', key: 'offers.tvWifi' },
  { icon: 'fas fa-chair', key: 'offers.terraceYard' },
  { icon: 'fas fa-hot-tub', key: 'offers.saunaHotTub' },
  { icon: 'fas fa-utensils', key: 'offers.fullKitchen' },
  { icon: 'fas fa-child', key: 'offers.familyFriendly' },
  { icon: 'fas fa-parking', key: 'offers.freeParking' },
  { icon: 'fas fa-map-marked-alt', key: 'offers.greatLocation' },
]
</script>

<style scoped>
.offers-section {
  background-color: #f7ebe9; /* Light pink background */
  padding: 2rem;
  text-align: center;
}

.offers-heading {
  color: #4f6259; /* Dark green text */
  margin-bottom: 1rem;
}

/* Mobile styles */
.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
}

.offer-item {
  background-color: rgba(79, 98, 89, 0.8);
  border-radius: 10px;
  width: 100px; /* Fixed width */
  height: 100px; /* Fixed height */
  display: flex;
  flex-direction: column; /* Stack icon and text vertically */
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
  text-align: center;
  margin: 0 auto; /* Center the card in the grid */
}

/* Tablet and desktop styles */
@media (min-width: 768px) {
  .offers-grid {
    grid-template-columns: repeat(
      auto-fit,
      minmax(100px, 1fr)
    ); 
  }
}

.offer-icon {
  font-size: 1.5rem; /* icon size */
  margin-bottom: 0.5rem;
  color: #f7ebe9; /* Light pink text and icons */
}

.offer-text {
  font-size: 0.875rem; /* text size */
  color: #f7ebe9; /* Light pink text */
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
