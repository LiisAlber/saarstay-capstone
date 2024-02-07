<template>
  <div class="container mx-auto bg-[#F7EBE9] px-4 py-4">
    <button 
      @click="goToAdminDashboard" 
      class="mb-4 rounded-lg bg-[#EACDC7] py-2 px-4 text-sm font-medium text-[#4F6259] transition-colors hover:bg-[#4F6259] hover:text-white"
    >
      Back to Admin Dashboard
    </button>
    <h1 class="mb-4 text-2xl font-bold text-[#4F6259]">Admin Feedback Management</h1>
    <div v-if="error" class="mb-4 rounded border border-red-400 bg-red-100 p-4 text-red-700">
      {{ error }}
    </div>
    <div v-if="feedbackList">
      <FeedbackCard
        v-for="feedback in feedbackList"
        :key="feedback.id"
        :feedback="feedback"
        @edit="openEditModal"
        @delete="deleteFeedback"
      />
    </div>

    <!-- Modal -->
    <div v-if="selectedFeedback" class="modal">
      <h3 class="modal-header">Edit Feedback</h3>
      <form @submit.prevent="submitEdit(selectedFeedback.id)" class="modal-body">
        <textarea v-model="editComment" class="modal-textarea"></textarea>
        <select v-model="updatedStatus">
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
        </select>
        <div class="modal-actions">
          <button type="submit" class="modal-button-save">Update</button>
          <button @click="closeEditModal" class="modal-button-cancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { trpc } from '@/trpc'
import type { Feedback } from '@mono/server/src/shared/entities'
import { isLoggedIn } from '@/stores/user'
import FeedbackCard from '@/components/FeedbackCard.vue'
import { useRouter } from 'vue-router'

const feedbackList = ref<Feedback[] | null>(null)
const error = ref('')
const selectedFeedback = ref<Feedback | null>(null)
const editComment = ref('')
const updatedStatus = ref<'pending' | 'confirmed' | 'canceled'>('pending')
const router = useRouter()

const fetchFeedbacks = async () => {
  if (!isLoggedIn.value) {
    // Redirect to login page or handle unauthenticated state
    return
  }

  try {
    const data = await trpc.feedback.admin.adminView.query()
    feedbackList.value = data
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to fetch feedbacks'
  }
}

const openEditModal = (feedback: Feedback) => {
  selectedFeedback.value = feedback
  editComment.value = feedback.comment

  // Set updatedStatus based on current feedback status
  updatedStatus.value = feedback.status
}

const closeEditModal = () => {
  selectedFeedback.value = null
}

const submitEdit = async (feedbackId: number) => {
  try {
    await trpc.feedback.admin.adminEdit.mutate({
      feedbackId,
      updatedComment: editComment.value,
      updatedStatus: updatedStatus.value as 'pending' | 'confirmed',
    })
    closeEditModal()
    await fetchFeedbacks()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to edit feedback'
  }
}

const deleteFeedback = async (feedbackId: number) => {
  try {
    await trpc.feedback.admin.adminDelete.mutate({ feedbackId })
    await fetchFeedbacks() // Refetch feedbacks after deletion
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to delete feedback'
  }
}

onMounted(fetchFeedbacks)

const goToAdminDashboard = () => {
  router.push('/admin/dashboard') 
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: #f7ebe9; /* Background color */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-header {
  color: #4f6259; /* Header text color */
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
}

.modal-body {
  margin-top: 10px;
}

.modal-textarea {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-family: 'Open Sans', sans-serif;
}

.modal-actions {
  margin-top: 10px;
  text-align: right;
}

.modal-button-save,
.modal-button-cancel {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
}

.modal-button-save {
  background-color: #4f6259; /* Save button background */
  color: white;
}

.modal-button-cancel {
  background-color: #eacdc7; /* Cancel button background */
  color: #4f6259;
  margin-left: 10px;
}
</style>
