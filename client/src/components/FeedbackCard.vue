<template>
  <div class="mb-4 rounded-lg bg-[#EACDC7] p-4 shadow">
    <p class="text-[#4F6259]">Comment: {{ feedback.comment }}</p>
    <p class="text-[#4F6259]">Rating: {{ feedback.rating }}</p>
    <p class="text-[#4F6259]">Status: {{ feedback.status }}</p>
    <div class="mt-4 flex justify-end space-x-2">
      <button
        @click="$emit('edit', feedback)"
        class="rounded bg-[#4F6259] px-4 py-2 text-white hover:bg-[#3A4D46]"
      >
        Edit
      </button>
      <button
        @click="$emit('delete', feedback.id)"
        class="rounded bg-[#4F6259] px-4 py-2 text-white hover:bg-[#3A4D46]"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Feedback } from '@mono/server/src/shared/entities'

defineProps<{
  feedback: Feedback
}>()
</script>
