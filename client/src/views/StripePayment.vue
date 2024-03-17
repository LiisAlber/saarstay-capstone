<template>
  <div class="mx-auto my-8 max-w-md rounded-lg bg-[#f7ebe9] p-8 shadow-md">
    <h2 class="mb-6 text-2xl font-bold text-[#4F6259]">Complete Your Payment</h2>
    <form @submit.prevent="handlePayment">
      <div id="card-element" v-if="stripeReady" class="mb-4 rounded-lg border border-[#4F6259] p-3">
        <!-- Stripe.js injects the Card Element here -->
      </div>
      <div class="mt-4 flex justify-between">
        <button
          class="rounded-lg border border-[#4F6259] bg-[#EACDC7] px-4 py-2 text-sm font-medium text-[#4F6259] transition-colors hover:bg-[#4F6259] hover:text-white"
          @click="handleCancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="!stripeReady"
          class="rounded-lg border border-[#4F6259] bg-[#4F6259] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#EACDC7] hover:text-[#4F6259] disabled:opacity-50"
        >
          Pay
        </button>
      </div>
    </form>
    <p v-if="!stripeReady" class="text-center text-[#4F6259]">Loading payment information...</p>
    <p v-if="stripeError" class="mt-4 rounded-lg border border-red-400 bg-red-200 p-3 text-red-600">
      {{ stripeError }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadStripe, type StripeCardElement } from '@stripe/stripe-js'
import { trpc } from '@/trpc'
import log from 'loglevel'

const route = useRoute()
const router = useRouter()
const clientSecret = (route.params.clientSecret as string) || ''
const bookingId = (route.params.bookingId as string) || ''
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string

if (!stripePublishableKey) {
  log.error('Stripe publishable key is not defined in environment variables.')
}

const stripePromise = loadStripe(stripePublishableKey)
const stripeReady = ref(false)
const stripeError = ref('')

let cardElement: StripeCardElement | null = null

onMounted(async () => {
  log.info('Route Params:', route.params)

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
    log.error('Client secret or booking ID is missing')
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

  log.info('Payment Confirmation Result:', result)

  if (result.error) {
    stripeError.value = result.error.message || 'An unknown error occurred during payment.'
  } else {
    if (result.paymentIntent.status === 'succeeded') {
      try {
        await trpc.bookings.updateBookingStatus.mutate({
          bookingId,
          paymentIntentId: result.paymentIntent.id,
        })
        log.info('Booking status update successful')
        router.push({ name: 'BookingDetails', params: { bookingId: bookingId } })
      } catch (error) {
        stripeError.value = 'Failed to update booking status. Please contact support.'
        log.error('Error updating booking status:', error)
      }
    } else {
      log.info('Payment Intent Status:', result.paymentIntent.status)
    }
  }
}

const handleCancel = () => {
  // Directs the user to the booking form page
  router.push({ name: 'BookingForm' })
}
</script>
