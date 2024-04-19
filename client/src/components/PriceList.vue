<template>
  <div class="flex items-center justify-center bg-[#4F6259] p-4 sm:p-12">
    <div class="mx-auto flex w-full max-w-6xl flex-col items-center justify-between sm:flex-row">
      <!-- Pricing Card -->
      <div
        class="flex w-full flex-col justify-between rounded-lg bg-[#E8D3D0] p-6 shadow-lg sm:w-1/2"
        style="height: 600px"
      >
        <h2 class="mb-6 text-center text-3xl font-semibold text-[#4F6259]">
          {{ t('prices.title') }}
        </h2>
        <!-- Seasonal Rates -->
        <div>
          <div
            class="mb-3 flex justify-between"
            v-for="(rate, index) in seasonalRates"
            :key="index"
          >
            <span class="text-xl text-[#4F6259]">{{ seasonPeriod(rate.start, rate.end) }}</span>
            <span class="text-xl font-bold text-[#4F6259]"
              >{{ rate.rate }} {{ t('prices.nightlyRate') }}</span
            >
          </div>
          <!-- Default Rate -->
          <div class="mt-4 border-t border-[#4F6259] pt-4">
            <div class="flex justify-between">
              <span class="text-xl text-[#4F6259]">{{ t('prices.defaultRate') }}</span>
              <!-- Larger text -->
              <span class="text-xl font-bold text-[#4F6259]"
                >{{ defaultRate }} {{ t('prices.nightlyRate') }}</span
              >
            </div>
          </div>
        </div>
        <!-- Additional Information -->
        <p class="mb-8 mt-2 text-lg text-[#4F6259]">
          {{ t('prices.priceIncludes') }}<br />{{ t('prices.specialOffer') }}
        </p>
      </div>

      <!-- Gap between cards -->
      <div style="width: 8rem"></div>

      <!-- Image Card -->
      <div
        class="hidden w-full rounded-lg bg-[#E8D3D0] shadow-lg sm:block sm:w-1/2"
        style="height: 600px"
      >
        <img
          src="https://stghbucket.s3.eu-north-1.amazonaws.com/interior/johnny-mcclung-YOQOCzP2aNQ-unsplash.jpg"
          alt="Interior"
          class="h-full w-full rounded-lg object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const defaultRate = ref(150)
const seasonalRates = ref([
  { start: '2024-06-01', end: '2024-08-31', rate: 200 },
  { start: '2024-12-20', end: '2025-01-05', rate: 180 },
])

const seasonPeriod = (start: string, end: string) => {
  const startDate = new Date(start)
  const endDate = new Date(end)

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'UTC', // Using UTC to avoid timezone-related discrepancies
  }

  // Manually constructing the date string in 'day-month-year' format
  const startFormatted = new Intl.DateTimeFormat('en-GB', options).format(startDate)
  const endFormatted = new Intl.DateTimeFormat('en-GB', options).format(endDate)

  return `${startFormatted} - ${endFormatted}`
}
</script>
