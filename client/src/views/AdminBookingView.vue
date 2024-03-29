<template>
  <div class="bg-[#F7EBE9] p-4">
    <button
      @click="goToAdminDashboard"
      class="mb-4 rounded-lg bg-[#EACDC7] px-4 py-2 text-sm font-medium text-[#4F6259] transition-colors hover:bg-[#4F6259] hover:text-white"
    >
      {{ t('admin.backToDashboard') }}
    </button>
    <h1 class="font-sans text-2xl font-bold text-[#4F6259]">{{ t('admin.bookingManagement') }}</h1>
    <div v-if="error" class="font-semibold text-red-500">{{ t('admin.errorOccurred') }}</div>
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
import log from 'loglevel'
import { useI18n } from 'vue-i18n'

const bookingList = ref<Booking[] | null>(null)
const error = ref('')
const router = useRouter()
const loading = ref(false)
const selectedBooking = ref<Booking | null>(null)
const { t } = useI18n()

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
    log.error('An error occurred while fetching bookings:', e)
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
  checkAdminAuth() // Check authentication first
  fetchBookings() // Then fetch bookings
})

const goToAdminDashboard = () => {
  router.push('/admin/dashboard')
}
</script>
