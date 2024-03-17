<template>
  <div class="mb-4 rounded-lg bg-[#EACDC7] p-4 font-sans shadow-md">
    <h3 class="text-lg font-semibold text-[#4F6259]">{{ booking.guestName }}</h3>
    <div class="text-sm text-[#4F6259]">
      <p>
        <strong>{{ t('booking.email') }}:</strong> {{ booking.guestEmail }}
      </p>
      <p>
        <strong>{{ t('booking.contactNumber') }}:</strong> {{ booking.guestContactNumber }}
      </p>
      <p>
        <strong>{{ t('booking.checkInDate') }}:</strong>
        {{ new Date(booking.checkInDate).toLocaleDateString() }}
      </p>
      <p>
        <strong>{{ t('booking.checkOutDate') }}:</strong>
        {{ new Date(booking.checkOutDate).toLocaleDateString() }}
      </p>
      <p>
        <strong>{{ t('booking.numberOfGuests') }}:</strong> {{ booking.numberOfGuests }}
      </p>
      <p>
        <strong>{{ t('booking.totalPrice') }}:</strong> {{ booking.totalPrice }}€
      </p>
      <p>
        <strong>{{ t('booking.status') }}:</strong> {{ t(`booking.${booking.status}`) }}
      </p>
    </div>
    <!-- Displays error message if it exists -->
    <p class="text-sm text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
    <div class="mt-4 flex justify-end space-x-2">
      <button
        class="rounded bg-[#A0B9BF] px-4 py-2 font-bold text-white hover:bg-[#8DA6AC]"
        @click="$emit('confirm', booking.id)"
      >
        {{ t('booking.confirm') }}
      </button>
      <button
        class="rounded bg-[#C5AEB4] px-4 py-2 font-bold text-white hover:bg-[#B4999D]"
        @click="$emit('cancel', booking.id)"
      >
        {{ t('booking.cancel') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Booking } from '@mono/server/src/shared/entities'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  booking: Booking
  errorMessage: String | null
}>()
</script>
