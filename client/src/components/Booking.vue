<template>
  <Card class="flex flex-row items-center justify-between" data-testid="booking">
    <div>
      <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Booking Details
      </h5>
      <p><strong>Guest Name:</strong> {{ booking.guestName }}</p>
      <p><strong>Email:</strong> {{ booking.guestEmail }}</p>
      <p><strong>Contact Number:</strong> {{ booking.guestContactNumber }}</p>
      <p><strong>Check-in Date:</strong> {{ booking.checkInDate }}</p>
      <p><strong>Check-out Date:</strong> {{ booking.checkOutDate }}</p>
      <p><strong>Number of Guests:</strong> {{ booking.numberOfGuests }}</p>
      <p><strong>Special Requests:</strong> {{ booking.specialRequests }}</p>
      <p><strong>Status:</strong> {{ booking.status }}</p>
    </div>

    <FwbButton
      component="RouterLink"
      tag="router-link"
      :href="{ name: 'EditBooking', params: { id: booking.id } } as any"
      class="pr-3"
    >
      Edit Booking
      <ArrowRightIcon aria-hidden="true" class="inline h-4 w-4" />
    </FwbButton>
  </Card>
</template>

<script lang="ts" setup>
import type { Booking } from '@mono/server/src/shared/entities'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { FwbButton } from 'flowbite-vue'
import Card from './Card.vue'

defineProps<{
  booking: Booking
}>()
</script>
