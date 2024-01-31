<template>
  <div class="bg-[#F7EBE9] p-4">
    <h1 class="font-sans text-2xl font-bold text-[#4F6259]">Admin Booking Management</h1>
    <div v-if="error" class="font-semibold text-red-500">{{ error }}</div>
    <div v-if="bookingList">
      <BookingCard
        v-for="booking in bookingList"
        :key="booking.id"
        :booking="booking"
        :errorMessage="bookingErrorMessages[booking.id]"
        @confirm="confirmBooking(booking.id)"
        @cancel="cancelBooking(booking.id)"
        class="font-sans"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { trpc } from '@/trpc'
import type { Booking } from '@mono/server/src/shared/entities'
import { isLoggedIn } from '@/stores/user'
import BookingCard from '@/components/BookingCard.vue'

const bookingList = ref<Booking[] | null>(null)
const error = ref('')
const router = useRouter()
const loading = ref(false)
const selectedBooking = ref<Booking | null>(null)

// Define a ref for booking error messages
const bookingErrorMessages = ref<{ [key: number]: string }>({})

// Redirects user if not authenticated as admin
const checkAdminAuth = () => {
  if (!isLoggedIn.value) {
    router.push('/admin/login')
  }
}

// Function to fetch all bookings
const fetchBookings = async () => {
  loading.value = true
  try {
    const data = await trpc.bookings.admin.bookingView.query()
    bookingList.value = data
  } catch (e) {
    if (selectedBooking.value) {
      // Store the error message in the object using the booking ID as the key
      const bookingId = selectedBooking.value.id
      bookingErrorMessages.value[bookingId] = e instanceof Error ? e.message : 'An error occurred'
    } else {
      error.value = 'An error occurred'
    }
  } finally {
    loading.value = false
  }
}

// Function to confirm a booking
const confirmBooking = async (bookingId: number) => {
  try {
    await trpc.bookings.admin.confirmBooking.mutate({ bookingId })
    await fetchBookings() // Refetch bookings
  } catch (e) {
    bookingErrorMessages.value[bookingId] =
      e instanceof Error ? e.message : 'Failed to confirm booking'
  }
}

// Function to cancel a booking
const cancelBooking = async (bookingId: number) => {
  try {
    await trpc.bookings.admin.cancelBooking.mutate({ bookingId })
    await fetchBookings() // Refetch bookings
  } catch (e) {
    bookingErrorMessages.value[bookingId] =
      e instanceof Error ? e.message : 'Failed to cancel booking'
  }
}

onMounted(() => {
  console.log('isAdminLoggedIn before auth check:', isLoggedIn.value)
  checkAdminAuth() // Check authentication first
  fetchBookings() // Then fetch bookings
})
</script>
