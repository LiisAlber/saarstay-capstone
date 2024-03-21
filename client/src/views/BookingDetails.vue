<template>
  <div class="flex min-h-screen items-center justify-center bg-[#f7ebe9] p-4">
    <Header class="fixed top-0 z-10 w-full bg-[#4F6259] bg-opacity-60 shadow-md" />


    <div class="mx-auto mt-[100px] w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
      <h1 class="mb-6 text-3xl font-bold text-[#4F6259]">{{ t('bookingConfirmation.title') }}</h1>


      <p v-if="error" class="rounded-md bg-red-200 p-4 text-red-600">{{ error }}</p>


      <div v-if="bookingDetails" class="space-y-4">
        <p><strong>{{ t('bookingConfirmation.guestName') }}:</strong> {{ bookingDetails.guestName }}</p>
        <p><strong>{{ t('bookingConfirmation.email') }}:</strong> {{ bookingDetails.guestEmail }}</p>
        <p><strong>{{ t('bookingConfirmation.contactNumber') }}:</strong> {{ bookingDetails.guestContactNumber }}</p>
        <p><strong>{{ t('bookingConfirmation.checkInDate') }}:</strong> {{ bookingDetails.checkInDate.toLocaleDateString() }}</p>
        <p>
          <strong>{{ t('bookingConfirmation.checkOutDate') }}:</strong> {{ bookingDetails.checkOutDate.toLocaleDateString() }}
        </p>
        <p><strong>{{ t('bookingConfirmation.numberOfGuests') }}:</strong> {{ bookingDetails.numberOfGuests }}</p>
        <p v-if="bookingDetails.specialRequests">
          <strong>{{ t('bookingConfirmation.specialRequests') }}:</strong> {{ bookingDetails.specialRequests }}
        </p>
        <p><strong>{{ t('bookingConfirmation.totalPrice') }}:</strong> {{ bookingDetails.totalPrice }}€</p>


        <p class="mt-4 font-medium">
          {{ t('bookingConfirmation.confirmationEmailSent') }}
          <span class="font-bold">{{ bookingDetails.guestEmail }}</span> {{ t('bookingConfirmation.checkYourInbox') }}
        </p>


        <button
          class="mt-6 w-full rounded-lg bg-[#4F6259] py-3 font-medium text-white transition-colors hover:bg-[#EACDC7] hover:text-[#4F6259]"
          @click="redirectToHome"
        >
        {{ t('bookingConfirmation.returnToHomepage') }}
        </button>
      </div>
    </div>
  </div>
  <!-- Footer -->
  <Footer class="pt-4" />
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { trpc } from '@/trpc'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useI18n } from 'vue-i18n'


const { t } = useI18n()


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


const router = useRouter()


const redirectToHome = () => {
  router.push('/')
}
</script>
