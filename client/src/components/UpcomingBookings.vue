<template>
  <div class="upcoming-bookings">
    <h2>Upcoming Bookings</h2>
    <div v-if="upcomingBookings.length > 0">
      <div class="booking-card" v-for="booking in upcomingBookings" :key="booking.id">
        <div class="booking-card-header">
          {{ booking.guestName }}
        </div>
        <div class="booking-card-body">Check-in: {{ formatDate(booking.checkInDate) }}</div>
      </div>
    </div>
    <div v-else>No upcoming bookings to display.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { trpc } from '@/trpc'
import type { Booking } from '@mono/server/src/shared/entities'

const bookings = ref<Booking[]>([])

const formatDate = (dateInput: string | Date) => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(async () => {
  try {
    const response = await trpc.bookings.admin.bookingView.query()
    bookings.value = response
      .filter(
        (booking) => new Date(booking.checkInDate) > new Date() && booking.status === 'confirmed'
      )
      .sort((a, b) => new Date(a.checkInDate).getTime() - new Date(b.checkInDate).getTime())
  } catch (error) {
    console.error('Error fetching bookings:', error)
  }
})

const upcomingBookings = computed(() => bookings.value.slice(0, 3))
</script>

<style scoped>
.upcoming-bookings {
  background-color: #fbf5f4; /* Card background */
  border: 1px solid #ddd; /* Card border */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  border-radius: 8px; /* Rounded corners for the card */
  padding: 1em; /* Padding around the content */
  margin-bottom: 2em; /* Space below the card */
  max-width: 350px;
}

.upcoming-bookings h2 {
  color: #4f6259;
  margin-bottom: 0.5em; /* Space after the heading */
}

.booking-card {
  border-bottom: 1px solid #eee; /* Separator for individual bookings */
  padding: 0.5em 0; /* Padding for each booking */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center the content */
}

.booking-card:last-child {
  border-bottom: none; /* Remove bottom border for the last item */
}

.booking-card-header {
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 0.25em; /* Space between header and body */
}

.booking-card-body {
  font-size: 0.9em;
  color: #666;
}
</style>
