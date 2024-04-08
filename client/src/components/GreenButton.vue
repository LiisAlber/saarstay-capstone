<template>
    <div class="booking-navigation">
      <button
        class="custom-button"
        @click="navigateToBookingForm"
        type="submit"
      >
        {{ t('buttons.bookNow') }}
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n()
  const router = useRouter()
  
  const navigateToBookingForm = () => {
    router.push({ name: 'BookingForm' })
  }
  </script>
  
  <style scoped>
  .custom-button {
    background-color: #4F6259; /* Green background */
    color: #EACDC7; /* Pink text */
    font-weight: bold;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem; /* 6px */
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
  }
  
  .custom-button:hover {
    background-color: #3e504b; /* Darker green background on hover */
    color: #f2c5bc; /* Lighter pink text on hover */
  }
  </style>
  