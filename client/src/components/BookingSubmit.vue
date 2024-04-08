<template>
  <div class="booking-navigation">
    <FwbButton @click="navigateToBookingForm" type="submit" class="custom-button custom-button">
      {{ t('buttons.bookNow') }}
    </FwbButton>
  </div>
</template>


<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()

const navigateToBookingForm = () => {
  router.push({ name: 'BookingForm' })
}
</script>

<style>
.custom-button.custom-button {
  background-color: #eacdc7;
  color: #4F6259; 
  font-weight: bold;
}

.custom-button.custom-button:hover {
  background-color: #f2c5bc;
  color: #4F6259; 
}
</style>

