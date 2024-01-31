<template>
  <div class="mb-4 rounded-lg bg-[#EACDC7] p-4 font-sans shadow-md">
    <h3 class="text-lg font-semibold text-[#4F6259]">{{ booking.guestName }}</h3>
    <div class="text-sm text-[#4F6259]">
      <p><strong>Email:</strong> {{ booking.guestEmail }}</p>
      <p><strong>Contact Number:</strong> {{ booking.guestContactNumber }}</p>
      <p>
        <strong>Check-In Date:</strong> {{ new Date(booking.checkInDate).toLocaleDateString() }}
      </p>
      <p>
        <strong>Check-Out Date:</strong> {{ new Date(booking.checkOutDate).toLocaleDateString() }}
      </p>
      <p><strong>Number of Guests:</strong> {{ booking.numberOfGuests }}</p>
      <p><strong>Total Price:</strong> {{ booking.totalPrice }}€</p>
      <p><strong>Status:</strong> {{ booking.status }}</p>
    </div>
    <!-- Displays error message if it exists -->
    <p class="text-sm text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
    <div class="mt-4 flex justify-end space-x-2">
      <button
        class="rounded bg-[#A0B9BF] px-4 py-2 font-bold text-white hover:bg-[#8DA6AC]"
        @click="$emit('confirm', booking.id)"
      >
        Confirm
      </button>
      <button
        class="rounded bg-[#C5AEB4] px-4 py-2 font-bold text-white hover:bg-[#B4999D]"
        @click="$emit('cancel', booking.id)"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Booking } from '@mono/server/src/shared/entities'

defineProps<{
  booking: Booking
  errorMessage: String | null
}>()
</script>
