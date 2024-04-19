<template>
  <tr
    class="mb-4 rounded-lg bg-[#FBF5F4] shadow transition duration-300 ease-in-out hover:bg-opacity-90"
  >
    <td class="px-4 py-2">
      <!-- Display star rating -->
      <div class="flex">
        <span v-for="star in 5" :key="star" class="text-[#4F6259]">
          <i v-if="star <= feedback.rating" class="fas fa-star"></i>
          <i v-else class="far fa-star"></i>
        </span>
      </div>
    </td>
    <td class="px-4 py-2 text-[#4F6259]">{{ feedback.comment }}</td>
    <td class="px-4 py-2 text-[#4F6259]">{{ t(`adminFeedback.${feedback.status}`) }}</td>
    <td class="px-4 py-2">
      <button
        @click="$emit('edit', feedback)"
        class="mr-2 rounded bg-[#4F6259] px-4 py-2 text-[#EACDC7] hover:bg-opacity-90"
      >
        Edit
      </button>
      <button
        @click="$emit('delete', feedback.id)"
        class="rounded bg-[#EACDC7] px-4 py-2 text-[#4F6259] hover:bg-opacity-90"
      >
        Delete
      </button>
    </td>
  </tr>
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
