<template>
  <Card class="flex flex-row items-center justify-between" data-testid="booking">
    <div>
      <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ t('booking.details') }}
      </h5>
      <p>
        <strong>{{ t('booking.guestName') }}:</strong> {{ booking.guestName }}
      </p>
      <p>
        <strong>{{ t('booking.email') }}:</strong> {{ booking.guestEmail }}
      </p>
      <p>
        <strong>{{ t('booking.contactNumber') }}:</strong> {{ booking.guestContactNumber }}
      </p>
      <p>
        <strong>{{ t('booking.checkInDate') }}:</strong> {{ booking.checkInDate }}
      </p>
      <p>
        <strong>{{ t('booking.checkOutDate') }}:</strong> {{ booking.checkOutDate }}
      </p>
      <p>
        <strong>{{ t('booking.numberOfGuests') }}:</strong> {{ booking.numberOfGuests }}
      </p>
      <p>
        <strong>{{ t('booking.specialRequests') }}:</strong> {{ booking.specialRequests }}
      </p>
      <p>
        <strong>{{ t('booking.status') }}:</strong> {{ t(`booking.status.${booking.status}`) }}
      </p>
    </div>

    <FwbButton
      component="RouterLink"
      tag="router-link"
      :href="{ name: 'EditBooking', params: { id: booking.id } } as any"
      class="pr-3"
    >
      {{ t('booking.editBooking') }}
      <ArrowRightIcon aria-hidden="true" class="inline h-4 w-4" />
    </FwbButton>
  </Card>
</template>

<script lang="ts" setup>
import type { Booking } from '@mono/server/src/shared/entities'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { FwbButton } from 'flowbite-vue'
import Card from './Card.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  booking: Booking
}>()
</script>
