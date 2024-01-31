<template>
  <div class="max-w-md mx-auto my-8 p-8 bg-[#f7ebe9] rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-[#4F6259] mb-6">Complete Your Payment</h2>
    <form @submit.prevent="handlePayment">
      <div id="card-element" v-if="stripeReady" class="p-3 border border-[#4F6259] rounded-lg mb-4">
        <!-- Stripe.js injects the Card Element here -->
      </div>
      <button type="submit" :disabled="!stripeReady" class="w-full py-3 bg-[#4F6259] text-white font-medium rounded-lg hover:bg-[#5a7765] transition-colors disabled:opacity-50">
        Pay
      </button>
    </form>
    <p v-if="!stripeReady" class="text-center text-[#4F6259]">Loading payment information...</p>
    <p v-if="stripeError" class="mt-4 p-3 bg-red-200 text-red-600 border border-red-400 rounded-lg">
      {{ stripeError }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadStripe, type StripeCardElement } from '@stripe/stripe-js'
import { trpc } from '@/trpc'

const route = useRoute()
const router = useRouter()
const clientSecret = (route.params.clientSecret as string) || ''
const bookingId = (route.params.bookingId as string) || ''
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string

if (!stripePublishableKey) {
  console.error('Stripe publishable key is not defined in environment variables.')
}

const stripePromise = loadStripe(stripePublishableKey)
const stripeReady = ref(false)
const stripeError = ref('')

let cardElement: StripeCardElement | null = null

onMounted(async () => {
  console.log('Route Params:', route.params)

  const stripe = await stripePromise
  if (stripe) {
    stripeReady.value = true
    nextTick(() => {
      cardElement = stripe.elements().create('card')
      cardElement.mount('#card-element')
    })
  } else {
    stripeError.value = 'Failed to load payment service. Please try again later.'
  }
})

const handlePayment = async () => {
  if (!clientSecret || !bookingId) {
    console.error('Client secret or booking ID is missing')
    return
  }

  const stripe = await stripePromise
  if (!stripe || !cardElement) {
    stripeError.value = 'Payment service is not ready. Please try again later.'
    return
  }

  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: { card: cardElement },
  })

  console.log('Payment Confirmation Result:', result)

  if (result.error) {
    stripeError.value = result.error.message || 'An unknown error occurred during payment.'
  } else {
    if (result.paymentIntent.status === 'succeeded') {
      try {
        await trpc.bookings.updateBookingStatus.mutate({
          bookingId,
          paymentIntentId: result.paymentIntent.id,
        })
        console.log('Booking status update successful')
        router.push({ name: 'BookingDetails', params: { bookingId: bookingId } })
      } catch (error) {
        stripeError.value = 'Failed to update booking status. Please contact support.'
        console.error('Error updating booking status:', error)
      }
    } else {
      console.log('Payment Intent Status:', result.paymentIntent.status)
    }
  }
}
</script>
