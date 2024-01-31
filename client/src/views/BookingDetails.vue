<template>
  <div class="flex justify-center items-center min-h-screen bg-[#f7ebe9] p-4">
    <div class="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-[#4F6259] mb-6">Booking Confirmation</h1>
      <p v-if="error" class="text-red-600 bg-red-200 p-4 rounded-md">{{ error }}</p>
      <div v-if="bookingDetails" class="space-y-4">
        <p><strong>Guest Name:</strong> {{ bookingDetails.guestName }}</p>
        <p><strong>Email:</strong> {{ bookingDetails.guestEmail }}</p>
        <p><strong>Contact Number:</strong> {{ bookingDetails.guestContactNumber }}</p>
        <p><strong>Check-In Date:</strong> {{ bookingDetails.checkInDate.toLocaleDateString() }}</p>
        <p><strong>Check-Out Date:</strong> {{ bookingDetails.checkOutDate.toLocaleDateString() }}</p>
        <p><strong>Number of Guests:</strong> {{ bookingDetails.numberOfGuests }}</p>
        <p v-if="bookingDetails.specialRequests"><strong>Special Requests:</strong> {{ bookingDetails.specialRequests }}</p>
        <p><strong>Total Price:</strong> {{ bookingDetails.totalPrice }}€</p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { trpc } from '@/trpc'

interface BookingDetail {
  guestName: string
  guestEmail: string
  guestContactNumber: string
  checkInDate: Date
  checkOutDate: Date
  numberOfGuests: number
  specialRequests?: string
  totalPrice: number
}

const bookingDetails = ref<BookingDetail | null>(null)
const route = useRoute()
const hashedBookingId = route.params.bookingId as string
const error = ref<null | string>(null)

onMounted(async () => {
  if (!Number.isNaN(hashedBookingId)) {
    try {
      const data = await trpc.bookings.getBookingDetails.query({ hashedBookingId })
      bookingDetails.value = {
        ...data,
        checkInDate: new Date(data.checkInDate),
        checkOutDate: new Date(data.checkOutDate),
        guestName: data.guestName ?? '',
        guestEmail: data.guestEmail ?? '',
        guestContactNumber: data.guestContactNumber ?? '',
        specialRequests: data.specialRequests ?? '',
        totalPrice: data.totalPrice,
      }
    } catch (e) {
      if (e instanceof Error) {
        error.value = e.message
      } else {
        error.value = 'An unexpected error occurred'
      }
    }
  } else {
    error.value = 'Invalid booking ID'
  }
})
</script>
