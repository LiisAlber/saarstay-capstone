<template>
  <div class="mx-auto my-8 max-w-md rounded-lg bg-[#f7ebe9] p-8 shadow-md">
    <!-- Header -->
    <Header class="fixed top-0 z-10 w-full bg-[#4F6259] bg-opacity-60 shadow-md" />

    <section class="flex flex-grow flex-col items-center justify-center p-4 pb-8 pt-[100px]">
      <div class="mx-auto my-8 w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 class="mb-6 text-2xl font-bold text-[#4F6259]">{{ t('form.createBooking') }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="mb-2 block font-medium text-[#4F6259]">{{ t('form.guestName') }}</label>
            <input
              type="text"
              v-model="bookingForm.guestName"
              class="w-full rounded-lg border border-[#4F6259] p-3"
              :placeholder="t('form.placeholder.fullName')"
            />
          </div>
          <div class="mb-4">
            <label class="mb-2 block font-medium text-[#4F6259]">{{ t('form.guestEmail') }}</label>
            <input
              type="email"
              v-model="bookingForm.guestEmail"
              class="w-full rounded-lg border border-[#4F6259] p-3"
              :placeholder="t('form.placeholder.email')"
            />
          </div>
          <div class="mb-4">
            <label class="mb-2 block font-medium text-[#4F6259]">{{ t('form.contactNumber') }}</label>
            <input
              type="tel"
              v-model="bookingForm.guestContactNumber"
              class="w-full rounded-lg border border-[#4F6259] p-3"
              :placeholder="t('form.placeholder.phoneNumber')"
            />
          </div>
          <div class="mb-4">
            <label class="mb-2 block font-medium text-[#4F6259]">{{ t('form.checkInDate') }}</label>
            <input
              type="date"
              v-model="bookingForm.checkInDate"
              class="w-full rounded-lg border border-[#4F6259] p-3"
            />
          </div>
          <div class="mb-4">
            <label class="mb-2 block font-medium text-[#4F6259]">{{ t('form.checkOutDate') }}</label>
            <input
              type="date"
              v-model="bookingForm.checkOutDate"
              class="w-full rounded-lg border border-[#4F6259] p-3"
            />
          </div>
          <div class="mb-4">
            <label class="mb-2 block font-medium text-[#4F6259]">{{ t('form.numberOfGuests') }}</label>
            <input
              type="number"
              v-model="bookingForm.numberOfGuests"
              class="w-full rounded-lg border border-[#4F6259] p-3"
            />
          </div>
          <div class="mb-4">
            <label class="mb-2 block font-medium text-[#4F6259]">{{ t('form.specialRequests') }}</label>
            <textarea
              v-model="bookingForm.specialRequests"
              rows="4"
              class="w-full rounded-lg border border-[#4F6259] p-3"
              :placeholder="t('form.placeholder.specialRequests')"
            ></textarea>
          </div>
          <div v-if="calculatedPrice" class="mb-4">
            <label class="mb-2 block font-medium text-[#4F6259]">{{ t('form.totalPrice') }}</label>
            <p class="font-bold text-[#4F6259]">{{ calculatedPrice }}€</p>
          </div>
          <div class="mt-6 flex items-center justify-between">
            <div class="mt-6 flex w-full items-center justify-between">
              <button
                type="button"
                class="rounded-lg border border-[#4F6259] bg-[#EACDC7] px-5 py-2 text-sm font-medium text-[#4F6259] transition-colors hover:bg-[#4F6259] hover:text-white"
                @click="handleCancel"
              >
                {{ t('form.cancel') }}
              </button>

              <button
                type="submit"
                class="ml-auto rounded-lg border border-[#4F6259] bg-[#4F6259] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#EACDC7] hover:text-[#4F6259]"
              >
                {{ t('form.submit') }}
              </button>
            </div>
          </div>
        </form>
        <div v-if="bookingErrorMessage" class="error-message">
  {{ bookingErrorMessage }}
</div>
      </div>
    </section>
  </div>
  <!-- Footer -->
  <Footer />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { trpc } from '@/trpc';
import { TRPCClientError } from '@trpc/client';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import log from 'loglevel';

const { t } = useI18n();
const router = useRouter();

// Define component props
const props = defineProps({
  initialCheckInDate: String,
  initialCheckOutDate: String,
});

const bookingForm = ref({
  guestName: '',
  guestEmail: '',
  guestContactNumber: '',
  checkInDate: props.initialCheckInDate || '',
  checkOutDate: props.initialCheckOutDate || '',
  numberOfGuests: '2',
  specialRequests: '',
});

const bookingErrorMessage = ref('');
const calculatedPrice = ref<number | null>(null);

const fetchCalculatedPrice = async () => {
  if (bookingForm.value.checkInDate && bookingForm.value.checkOutDate) {
    try {
      const response = await trpc.bookings.calculatePrice.query({
        checkInDate: new Date(bookingForm.value.checkInDate),
        checkOutDate: new Date(bookingForm.value.checkOutDate),
      })
      calculatedPrice.value = response.price
    } catch (error) {
      log.error('Error calculating price:', error)
    }
  }
}

// Set up watchers to call fetchCalculatedPrice whenever dates change
watch(() => bookingForm.value.checkInDate, fetchCalculatedPrice)
watch(() => bookingForm.value.checkOutDate, fetchCalculatedPrice)


const handleSubmit = async () => {
  bookingErrorMessage.value = ''; 
  try {
    const formattedData = {
      guestName: bookingForm.value.guestName,
      guestEmail: bookingForm.value.guestEmail,
      guestContactNumber: bookingForm.value.guestContactNumber,
      checkInDate: new Date(bookingForm.value.checkInDate),
      checkOutDate: new Date(bookingForm.value.checkOutDate),
      numberOfGuests: parseInt(bookingForm.value.numberOfGuests, 10),
      specialRequests: bookingForm.value.specialRequests,
    };

    const response = await trpc.bookings.submit.mutate(formattedData);
    log.info('Submit response:', response);
    calculatedPrice.value = response.totalPrice;

    router.push({
      name: 'StripePayment',
      params: {
        bookingId: response.bookingId,
        clientSecret: response.clientSecret,
      },
    });
  } catch (error) {
  if (error instanceof TRPCClientError && typeof error.message === 'string') {
  try {
    const errorDetails = JSON.parse(error.message);
    if (Array.isArray(errorDetails)) {
      bookingErrorMessage.value = errorDetails
        .map((err) => translateErrorMessage(err.message)) 
        .join('; ');
    } else {
      bookingErrorMessage.value = translateErrorMessage('error.unexpectedError');
    }
  } catch (parseError) {
   
    bookingErrorMessage.value = translateErrorMessage('error.unexpectedError'); 
  }
} else {
  bookingErrorMessage.value = translateErrorMessage('error.unexpectedError'); 
}
}
};

const translateErrorMessage = (errorKey: string) => {
  const keyMappings: Record<string, string> = {
    "Expected date, received null": "error.dateExpected",
  };
  const translationKey = keyMappings[errorKey] || errorKey;
  const translatedMessage = t(translationKey);
  return translatedMessage;
};


const handleCancel = () => {
  router.push('/');
};

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
  font-size: 1rem;
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
