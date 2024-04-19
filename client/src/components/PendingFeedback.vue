<template>
  <div class="pending-feedback-notification">
    <h2 class="notification-title">{{ t('admin.pendingFeedbackNotificationTitle') }}</h2>
    <ul v-if="displayedFeedbacks.length">
      <li v-for="feedback in displayedFeedbacks" :key="feedback.id" class="feedback-card">
        <div class="feedback-card-body">
          {{ truncateFeedback(feedback.comment) }}
        </div>
      </li>
    </ul>
    <p v-else>
      {{ t('admin.noPendingFeedback') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { trpc } from '@/trpc'
import type { Feedback } from '@mono/server/src/shared/entities'

const { t } = useI18n()
const pendingFeedbackCount = ref(0)
const displayedFeedbacks: Ref<Feedback[]> = ref([])

const fetchPendingFeedbacks = async () => {
  try {
    const allFeedbacks = await trpc.feedback.admin.adminView.query()
    // Filter feedbacks by 'pending' status
    const pendingFeedbacks = allFeedbacks.filter((fb) => fb.status === 'pending')
    // Shuffle the array and take the first 3 elements
    pendingFeedbackCount.value = pendingFeedbacks.length // Count of all pending feedbacks
    const shuffled = pendingFeedbacks.sort(() => 0.5 - Math.random())
    displayedFeedbacks.value = shuffled.slice(0, 3) // Take 3 random feedbacks
  } catch (error) {
    console.error('Failed to fetch pending feedbacks:', error)
  }
}

const truncateFeedback = (comment: string, maxLength: number = 100) => {
  return comment.length > maxLength ? comment.substring(0, maxLength) + '...' : comment
}

onMounted(fetchPendingFeedbacks)
</script>

<style scoped>
.pending-feedback-notification {
  background-color: #fbf5f4; /* Card background color */
  border: 1px solid #ddd; /* Card border */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  border-radius: 8px; /* Rounded corners for the card */
  padding: 1em; /* Padding around the content */
  margin-bottom: 2em; /* Space below the card */
  max-width: 350px;
}

.notification-title {
  color: #4f6259;
  margin-bottom: 0.5em;
}

.feedback-card {
  border-bottom: 1px solid #eee; /* Separator for individual feedback */
  padding: 0.5em 0; /* Padding for each feedback */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center the content */
}

.feedback-card:last-child {
  border-bottom: none; /* Remove bottom border for the last item */
}

.feedback-card-header {
  font-size: 1em;
  font-weight: bold; /* Bold font weight for header */
  margin-bottom: 0.25em; /* Space between header and body */
}

.feedback-card-body {
  font-size: 0.9em;
  color: #666; /* Text color for body */
}
</style>
