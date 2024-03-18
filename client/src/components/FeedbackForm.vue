<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    @click.self="closeForm"
  >
    <div class="feedback-form-container relative rounded-lg bg-white p-10">
      <!-- Close button -->
      <button class="absolute right-2 top-2 text-black" @click="closeForm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 class="mb-4 text-lg font-bold">{{ t('feedback.leaveYourFeedback') }}</h2>
      <form @submit.prevent="submitFeedback">
        <!-- Rating system -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium">{{ t('feedback.yourRating') }}</label>
          <div class="flex space-x-2">
            <label v-for="number in 5" :key="number" class="rating-label">
              <input
                type="radio"
                name="rating"
                :value="number"
                v-model="feedbackRating"
                class="hidden"
                @change="setRating(number)"
              />
              <span class="rating-number" :class="{ selected: feedbackRating === number }">{{
                number
              }}</span>
            </label>
          </div>
        </div>
        <!-- Feedback comment input -->
        <div class="mb-4">
          <label for="feedback" class="mb-1 block text-sm font-medium">{{ t('feedback.yourFeedback') }}</label>
          <textarea
            id="feedback"
            v-model="feedbackText"
            rows="4"
            class="w-full rounded border p-2"
            :placeholder="t('feedback.placeholder')"
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            {{ t('feedback.submit') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { trpc } from '@/trpc'
import log from 'loglevel'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()


const feedbackText = ref('')
const feedbackRating = ref(5) // Default to the highest rating
const emit = defineEmits(['close'])

const setRating = (rating: number) => {
  feedbackRating.value = rating
}

const submitFeedback = async () => {
  try {
    await trpc.feedback.submit.mutate({
      comment: feedbackText.value,
      rating: feedbackRating.value,
    })

    // If the mutation is successful, TRPC will not throw
    feedbackText.value = ''
    feedbackRating.value = 1 // Reset to default rating
    alert('Feedback submitted successfully.')
    emit('close') // Close the modal
  } catch (error) {
    // If there's an error, TRPC will throw and handle it here.
    log.error('Failed to submit feedback', error)
    alert('Failed to submit feedback.')
  }
}

const closeForm = () => {
  emit('close')
}
</script>

<style scoped>
.feedback-form-container {
  max-width: 400px;
  margin: auto;
  padding: 16px;
  background: #f7ebe9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.rating-label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

/* Styles for radio buttons */
input[type='radio']:checked + span {
  font-weight: bold;
  color: #4f6259;
}

input[type='radio'] + span {
  color: #a9c0a6;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
}

/* Styles for the close button */
.close-button svg {
  fill: #4f6259;
}

/* Styles for the clickable rating numbers */
.rating-number {
  cursor: pointer;
}

.rating-number.selected {
  font-weight: bold;
  color: #4f6259;
}
</style>
