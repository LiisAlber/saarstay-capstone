<template>
  <div class="mx-auto my-8 max-w-md rounded-lg bg-[#f7ebe9] p-8 shadow-md">
    <h2 class="mb-6 text-2xl font-bold text-[#4F6259]">Create Booking</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="mb-2 block font-medium text-[#4F6259]">Guest Name</label>
        <input
          type="text"
          v-model="bookingForm.guestName"
          class="w-full rounded-lg border border-[#4F6259] p-3"
          placeholder="Full Name"
        />
      </div>
      <div class="mb-4">
        <label class="mb-2 block font-medium text-[#4F6259]">Guest Email</label>
        <input
          type="email"
          v-model="bookingForm.guestEmail"
          class="w-full rounded-lg border border-[#4F6259] p-3"
          placeholder="Email"
        />
      </div>
      <div class="mb-4">
        <label class="mb-2 block font-medium text-[#4F6259]">Contact Number</label>
        <input
          type="tel"
          v-model="bookingForm.guestContactNumber"
          class="w-full rounded-lg border border-[#4F6259] p-3"
          placeholder="Phone Number"
        />
      </div>
      <div class="mb-4">
        <label class="mb-2 block font-medium text-[#4F6259]">Check-In Date</label>
        <input
          type="date"
          v-model="bookingForm.checkInDate"
          class="w-full rounded-lg border border-[#4F6259] p-3"
        />
      </div>
      <div class="mb-4">
        <label class="mb-2 block font-medium text-[#4F6259]">Check-Out Date</label>
        <input
          type="date"
          v-model="bookingForm.checkOutDate"
          class="w-full rounded-lg border border-[#4F6259] p-3"
        />
      </div>
      <div class="mb-4">
        <label class="mb-2 block font-medium text-[#4F6259]">Number of Guests</label>
        <input
          type="number"
          v-model="bookingForm.numberOfGuests"
          class="w-full rounded-lg border border-[#4F6259] p-3"
        />
      </div>
      <div class="mb-4">
        <label class="mb-2 block font-medium text-[#4F6259]">Special Requests</label>
        <textarea
          v-model="bookingForm.specialRequests"
          rows="4"
          class="w-full rounded-lg border border-[#4F6259] p-3"
          placeholder="Any special requests?"
        ></textarea>
      </div>
      <div v-if="calculatedPrice" class="mb-4">
        <label class="mb-2 block font-medium text-[#4F6259]">Total Price</label>
        <p class="font-bold text-[#4F6259]">{{ calculatedPrice }}€</p>
      </div>
      <button
        type="submit"
        class="w-full rounded bg-[#4F6259] py-3 font-medium text-white transition-colors hover:bg-[#5a7765]"
      >
        Create Booking
      </button>
    </form>
    <div v-if="bookingErrorMessage" class="error-message" v-html="bookingErrorMessage"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { trpc } from '@/trpc'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  initialCheckInDate: String,
  initialCheckOutDate: String,
})

const bookingForm = ref({
  guestName: '',
  guestEmail: '',
  guestContactNumber: '',
  checkInDate: props.initialCheckInDate || '',
  checkOutDate: props.initialCheckOutDate || '',
  numberOfGuests: '2',
  specialRequests: '',
})

const bookingErrorMessage = ref('')
const calculatedPrice = ref<number | null>(null)

// Add the fetchCalculatedPrice function here
const fetchCalculatedPrice = async () => {
  if (bookingForm.value.checkInDate && bookingForm.value.checkOutDate) {
    try {
      const response = await trpc.bookings.calculatePrice.query({
        checkInDate: new Date(bookingForm.value.checkInDate),
        checkOutDate: new Date(bookingForm.value.checkOutDate),
      })
      calculatedPrice.value = response.price
    } catch (error) {
      console.error('Error calculating price:', error)
    }
  }
}

// Set up watchers to call fetchCalculatedPrice whenever dates change
watch(() => bookingForm.value.checkInDate, fetchCalculatedPrice)
watch(() => bookingForm.value.checkOutDate, fetchCalculatedPrice)

const handleSubmit = async () => {
  try {
    const formattedData = {
      guestName: bookingForm.value.guestName,
      guestEmail: bookingForm.value.guestEmail,
      guestContactNumber: bookingForm.value.guestContactNumber,
      checkInDate: new Date(bookingForm.value.checkInDate),
      checkOutDate: new Date(bookingForm.value.checkOutDate),
      numberOfGuests: parseInt(bookingForm.value.numberOfGuests, 10),
      specialRequests: bookingForm.value.specialRequests,
    }

    const response = await trpc.bookings.submit.mutate(formattedData)
    console.log('Submit response:', response)
    calculatedPrice.value = response.totalPrice

    router.push({
      name: 'StripePayment',
      params: {
        bookingId: response.bookingId,
        clientSecret: response.clientSecret,
      },
    })
  } catch (error) {
    if (error instanceof Error && 'message' in error) {
      try {
        const parsedErrors = JSON.parse(error.message)
        if (Array.isArray(parsedErrors)) {
          // Extract only the message from each error and join with line breaks
          bookingErrorMessage.value = parsedErrors.map((err) => err.message).join('<br>')
        } else {
          bookingErrorMessage.value = error.message
        }
      } catch (jsonError) {
        bookingErrorMessage.value = error.message
      }
    } else {
      bookingErrorMessage.value = 'An unknown error occurred'
    }
  }
}
</script>

<style scoped>
.booking-form-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f7ebe9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem; /* Space between form groups */
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4f6259; /* Dark green color */
  font-weight: 600; /* Slightly bolder labels */
}

.form-group p {
  color: #4f6259; /* Dark green color for the price */
  font-size: 1rem; /* Adjust the font size as needed */
  font-weight: bold; /* Bold font for price */
}

/* Style for the error message */
.error-message {
  margin-top: 1rem;
  color: #d9534f; /* Error color */
  background-color: #f2dede; /* Light red background for the error message */
  border-color: #ebccd1;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
}
</style>
