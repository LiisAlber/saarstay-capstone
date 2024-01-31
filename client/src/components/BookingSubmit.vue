<template>
  <div class="booking-navigation">
    <FwbButton @click="navigateToBookingForm" type="submit" class="custom-button">
      Book now
    </FwbButton>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToBookingForm = () => {
  router.push({ name: 'BookingForm' })
}
</script>

<style>
.custom-button {
  background-color: #eacdc7;
  color: #184b45;
  font-weight: bold; 
}

.custom-button:hover {
  background-color: #f2c5bc;
  color: #184b45;
}

</style>
