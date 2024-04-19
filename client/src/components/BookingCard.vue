<template>
  <tr class="bg-[#FBF5F4]">
    <td class="px-6 py-4 text-[#4F6259]">
      {{ new Date(booking.checkInDate).toLocaleDateString() }}
    </td>
    <td class="px-6 py-4 text-[#4F6259]">
      {{ new Date(booking.checkOutDate).toLocaleDateString() }}
    </td>
    <td class="px-6 py-4 text-[#4F6259]">{{ booking.guestName }}</td>
    <td class="px-6 py-4 text-[#4F6259]">{{ booking.guestContactNumber }}</td>
    <td class="px-6 py-4 text-[#4F6259]">{{ booking.numberOfGuests }}</td>
    <td class="px-6 py-4 text-[#4F6259]">{{ booking.totalPrice }}€</td>
    <td class="px-6 py-4">
      <span
        :class="statusClasses(booking.status)"
        class="inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5"
      >
        {{ `${booking.status}` }}
      </span>
    </td>
    <td class="flex justify-end space-x-2 px-6 py-4">
      <button
        class="rounded bg-[#4F6259] px-4 py-2 text-[#EACDC7] hover:bg-opacity-90"
        @click="$emit('confirm', booking.id)"
      >
        {{ t('booking.confirm') }}
      </button>
      <button
        class="rounded bg-[#EACDC7] px-4 py-2 text-[#4F6259] hover:bg-opacity-90"
        @click="$emit('cancel', booking.id)"
      >
        {{ t('booking.cancel') }}
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Booking } from '@mono/server/src/shared/entities'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  booking: Booking
  errorMessage: string | null
}>()

const statusClasses = (status: string) => ({
  'bg-green-100 text-green-800': status === 'confirmed',
  'bg-yellow-100 text-yellow-800': status === 'pending',
  'bg-red-100 text-red-800': status === 'canceled',
})
</script>
