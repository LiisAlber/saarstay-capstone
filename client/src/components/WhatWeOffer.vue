<template>
  <section class="offers-section bg-[#F7EBE9]">
    <div class="grid grid-cols-1 gap-4 py-8 lg:grid-cols-12 lg:gap-8">
      <!-- Text Section -->
      <div class="text-left lg:col-span-3">
        <h2 class="mb-12 text-4xl" style="color: #4f6259">
          {{ t('offers.title') }}
        </h2>
        <p class="mb-12 text-xl" style="color: #4f6259">
          {{ t('offers.description') }}
        </p>
        <GreenButton />
      </div>
      <!-- Spacer Column -->
      <div class="hidden lg:col-span-1 lg:block"></div>
      <!-- Icons Section -->
      <div class="lg:col-span-8">
        <div class="grid grid-cols-3 gap-x-4 gap-y-4 md:gap-x-12 md:gap-y-6 lg:grid-cols-3">
          <div
            class="offer-item flex flex-col items-center justify-center space-y-4 p-6 md:flex-row md:justify-start md:space-x-8 md:space-y-0"
            v-for="offer in offers"
            :key="offer.key"
            style="background-color: #4f6259; color: #e8d3d0; border-radius: 0.5rem; width: auto"
          >
            <i :class="['offer-icon', offer.icon]" class="text-4xl md:text-5xl"></i>
            <span class="offer-text text-lg md:text-xl">{{ t(offer.key) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import GreenButton from '@/components/GreenButton.vue'
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
  background-color: #f7ebe9;
  padding: 2rem;
  text-align: center;
}

.offers-heading {
  color: #4f6259;
  margin-bottom: 1rem;
}

.offer-item {
  background-color: #d8e2dc;
  padding: 1rem;
  width: 100%;
  text-align: center;
}

.offer-icon {
  transition: color 0.2s ease-in-out;
}
</style>
