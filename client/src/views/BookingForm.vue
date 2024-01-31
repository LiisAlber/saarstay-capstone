<template>
  <div class="max-w-md mx-auto my-8 p-8 bg-[#f7ebe9] rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-[#4F6259] mb-6">Create Booking</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block text-[#4F6259] font-medium mb-2">Guest Name</label>
        <input type="text" v-model="bookingForm.guestName" class="w-full p-3 border border-[#4F6259] rounded-lg" placeholder="Full Name" />
      </div>
      <div class="mb-4">
        <label class="block text-[#4F6259] font-medium mb-2">Guest Email</label>
        <input type="email" v-model="bookingForm.guestEmail" class="w-full p-3 border border-[#4F6259] rounded-lg" placeholder="Email" />
      </div>
      <div class="mb-4">
        <label class="block text-[#4F6259] font-medium mb-2">Contact Number</label>
        <input type="tel" v-model="bookingForm.guestContactNumber" class="w-full p-3 border border-[#4F6259] rounded-lg" placeholder="Phone Number" />
      </div>
      <div class="mb-4">
        <label class="block text-[#4F6259] font-medium mb-2">Check-In Date</label>
        <input type="date" v-model="bookingForm.checkInDate" class="w-full p-3 border border-[#4F6259] rounded-lg" />
      </div>
      <div class="mb-4">
        <label class="block text-[#4F6259] font-medium mb-2">Check-Out Date</label>
        <input type="date" v-model="bookingForm.checkOutDate" class="w-full p-3 border border-[#4F6259] rounded-lg" />
      </div>
      <div class="mb-4">
        <label class="block text-[#4F6259] font-medium mb-2">Number of Guests</label>
        <input type="number" v-model="bookingForm.numberOfGuests" class="w-full p-3 border border-[#4F6259] rounded-lg" />
      </div>
      <div class="mb-4">
        <label class="block text-[#4F6259] font-medium mb-2">Special Requests</label>
        <textarea v-model="bookingForm.specialRequests" rows="4" class="w-full p-3 border border-[#4F6259] rounded-lg" placeholder="Any special requests?"></textarea>
      </div>
      <div v-if="calculatedPrice" class="mb-4">
        <label class="block text-[#4F6259] font-medium mb-2">Total Price</label>
        <p class="text-[#4F6259] font-bold">{{ calculatedPrice }}€</p>
      </div>
      <button type="submit" class="w-full py-3 bg-[#4F6259] text-white font-medium rounded hover:bg-[#5a7765] transition-colors">Create Booking</button>
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
  color: #4F6259; /* Dark green color */
  font-weight: 600; /* Slightly bolder labels */
}

.form-group p {
  color: #4F6259; /* Dark green color for the price */
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
