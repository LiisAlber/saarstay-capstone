<template>
  <div class="flex justify-center items-center p-4 sm:p-12 bg-[#4F6259]"> 
    <div class="flex flex-col sm:flex-row justify-between items-center w-full max-w-6xl mx-auto">

      <!-- Pricing Card -->
      <div class="bg-[#E8D3D0] rounded-lg shadow-lg p-6 flex flex-col justify-between w-full sm:w-1/2" style="height: 600px;">
        <h2 class="text-3xl font-semibold text-[#4F6259] text-center mb-6">{{ t('prices.title') }}</h2>
        <!-- Seasonal Rates -->
        <div>
          <div class="flex justify-between mb-3" v-for="(rate, index) in seasonalRates" :key="index"> 
            <span class="text-[#4F6259] text-xl">{{ seasonPeriod(rate.start, rate.end) }}</span> 
            <span class="text-[#4F6259] font-bold text-xl">{{ rate.rate }} {{ t('prices.nightlyRate') }}</span> 
          </div>
          <!-- Default Rate -->
          <div class="border-t border-[#4F6259] pt-4 mt-4">
            <div class="flex justify-between">
              <span class="text-[#4F6259] text-xl">{{ t('prices.defaultRate') }}</span> <!-- Larger text -->
              <span class="text-[#4F6259] font-bold text-xl">{{ defaultRate }} {{ t('prices.nightlyRate') }}</span>
            </div>
          </div>
        </div>
        <!-- Additional Information -->
        <p class="text-[#4F6259] text-lg mb-8 mt-2">{{ t('prices.priceIncludes') }}<br>{{ t('prices.specialOffer') }}</p> 
      </div>

      <!-- Gap between cards -->
      <div style="width: 8rem;"></div>

      <!-- Image Card -->
      <div class="hidden sm:block bg-[#E8D3D0] rounded-lg shadow-lg w-full sm:w-1/2" style="height: 600px;">
  <img
    src="https://stghbucket.s3.eu-north-1.amazonaws.com/interior/johnny-mcclung-YOQOCzP2aNQ-unsplash.jpg"
    alt="Interior"
    class="object-cover w-full h-full rounded-lg"
  />
</div>
      </div>
    </div>

</template>


<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t} = useI18n()

const defaultRate = ref(150)
const seasonalRates = ref([
  { start: '2024-06-01', end: '2024-08-31', rate: 200 },
  { start: '2024-12-20', end: '2025-01-05', rate: 180 },
])

const seasonPeriod = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'UTC', // Using UTC to avoid timezone-related discrepancies
  };

  // Manually constructing the date string in 'day-month-year' format
  const startFormatted = new Intl.DateTimeFormat('en-GB', options).format(startDate);
  const endFormatted = new Intl.DateTimeFormat('en-GB', options).format(endDate);

  return `${startFormatted} - ${endFormatted}`;
}
</script>
