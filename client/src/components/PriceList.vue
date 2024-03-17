<template>
  <div class="mx-auto max-w-md rounded-lg bg-[#F7EBE9] p-6 shadow-lg">
    <h2 class="mb-5 text-xl font-semibold text-[#4F6259]">{{ t('prices.title') }}</h2>

    <!-- Seasonal Rates -->
    <div class="space-y-3">
      <div
        v-for="(rate, index) in seasonalRates"
        :key="index"
        class="flex items-center justify-between"
      >
        <p class="text-[#4F6259]">{{ seasonPeriod(rate.start, rate.end) }}</p>
        <p class="font-bold text-[#4F6259]">{{ rate.rate }} {{ t('prices.nightlyRate') }}</p>
      </div>
    </div>

    <!-- Default Rate -->
    <div class="mt-4 flex items-center justify-between border-t border-[#EACDC7] pt-4">
      <p class="text-[#4F6259]">{{ t('prices.defaultRate') }}</p>
      <p class="font-bold text-[#4F6259]">{{ defaultRate }} {{ t('prices.nightlyRate') }}</p>
    </div>

    <!-- Additional Information -->
    <div class="mt-5 text-sm text-[#4F6259]">
      {{ t('prices.priceIncludes') }}<br />
      {{ t('prices.specialOffer') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const defaultRate = ref(150)
const seasonalRates = ref([
  { start: '2024-06-01', end: '2024-08-31', rate: 200 },
  { start: '2024-12-20', end: '2025-01-05', rate: 180 },
])

const seasonPeriod = (start: string, end: string) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit' }

  return `${startDate.toLocaleDateString(locale.value, options)} - ${endDate.toLocaleDateString(locale.value, options)}`
}
</script>
