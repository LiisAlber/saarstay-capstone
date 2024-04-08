<template>
  <section class="offers-section bg-[#F7EBE9]">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-8">
      <!-- Text Section -->
      <div class="lg:col-span-3 text-left">
        <h2 class="text-4xl mb-12" style="color: #4F6259;">
          {{ t('offers.title') }}
        </h2>
        <p class="mb-12 text-xl" style="color: #4F6259;">
          {{ t('offers.description') }}
        </p>
        <GreenButton />
      </div>
      <!-- Spacer Column -->
      <div class="hidden lg:block lg:col-span-1"></div>
      <!-- Icons Section -->
      <div class="lg:col-span-8">
        <div class="grid grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-4 md:gap-x-12 md:gap-y-6">
          <div class="offer-item flex flex-col md:flex-row items-center justify-center md:justify-start p-6 space-y-4 md:space-y-0 md:space-x-8" 
               v-for="offer in offers" :key="offer.key" 
               style="background-color: #4F6259; color: #E8D3D0; border-radius: 0.5rem; width: auto;">
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
  background-color: #D8E2DC;
  padding: 1rem;
  width: 100%;
  text-align: center;
}

.offer-icon {
  transition: color 0.2s ease-in-out;
}


</style>
