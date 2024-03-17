<template>
  <div class="mb-4 rounded-lg bg-[#EACDC7] p-4 shadow">
    <p class="text-[#4F6259]">{{ t('adminFeedback.comment') }}: {{ feedback.comment }}</p>
    <p class="text-[#4F6259]">{{ t('adminFeedback.rating') }}: {{ feedback.rating }}</p>
    <p class="text-[#4F6259]">
      {{ t('adminFeedback.status') }}: {{ t(`adminFeedback.${feedback.status}`) }}
    </p>
    <div class="mt-4 flex justify-end space-x-2">
      <button
        @click="$emit('edit', feedback)"
        class="rounded bg-[#4F6259] px-4 py-2 text-white hover:bg-[#3A4D46]"
      >
        {{ t('adminFeedback.edit') }}
      </button>
      <button
        @click="$emit('delete', feedback.id)"
        class="rounded bg-[#4F6259] px-4 py-2 text-white hover:bg-[#3A4D46]"
      >
        {{ t('adminFeedback.delete') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Feedback } from '@mono/server/src/shared/entities'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  feedback: Feedback
}>()
</script>
