<template>
  <AdminHeader />
  <div class="">
    <div class="nav-bar flex space-x-4 bg-[#f2e1dd] shadow">
      <router-link to="/admin/dashboard" class="nav-link">{{ t('admin.dashboard') }}</router-link>
      <router-link to="/admin/bookings" class="nav-link">{{
        t('admin.manageBookings')
      }}</router-link>
      <router-link to="/admin/feedback" class="nav-link">{{
        t('admin.manageFeedback')
      }}</router-link>
    </div>
  </div>
  <div class="rounded-lg bg-[#F7EBE9] p-4 shadow-lg">
    <!-- Filter Dropdown for Status -->
    <div class="mx-auto mt-4 max-w-4xl rounded-lg bg-[#F7EBE9] p-4 shadow">
      <div class="mb-4">
        <label for="statusFilter" class="text-sm font-medium text-[#4F6259]"
          >Filter by Status:</label
        >
        <select
          id="statusFilter"
          v-model="statusFilter"
          class="rounded-lg border border-gray-300 bg-[#F7EBE9] p-2 text-sm text-[#4F6259] shadow outline-none focus:border-[#4F6259] focus:ring-[#4F6259]"
        >
          <option value="">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <table class="mx-auto mb-4 w-full max-w-4xl divide-y overflow-hidden rounded-lg">
        <thead class="bg-[#FBF5F4]">
          <tr>
            <th scope="col" class="text-l px-3 py-2 text-left font-bold text-[#4F6259]">Rating</th>
            <th scope="col" class="text-l px-3 py-2 text-left font-bold text-[#4F6259]">Comment</th>
            <th scope="col" class="text-l px-3 py-2 text-left font-bold text-[#4F6259]">Status</th>
            <th scope="col" class="text-l px-3 py-2 text-left font-bold text-[#4F6259]">Actions</th>
          </tr>
        </thead>
        <tbody>
          <FeedbackCard
            v-for="feedback in filteredFeedback"
            :key="feedback.id"
            :feedback="feedback"
            @edit="openEditModal"
            @delete="deleteFeedback"
          />
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="selectedFeedback" class="modal">
      <h3 class="modal-header">{{ t('adminFeedback.editFeedback') }}</h3>
      <form @submit.prevent="submitEdit(selectedFeedback.id)" class="modal-body">
        <textarea v-model="editComment" class="modal-textarea"></textarea>
        <select v-model="updatedStatus">
          <option value="pending">{{ t('adminFeedback.pending') }}</option>
          <option value="confirmed">{{ t('adminFeedback.confirmed') }}</option>
        </select>
        <div class="modal-actions">
          <button type="submit" class="modal-button-save">{{ t('adminFeedback.update') }}</button>
          <button @click="closeEditModal" class="modal-button-cancel">
            {{ t('adminFeedback.cancel') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { trpc } from '@/trpc'
import type { Feedback } from '@mono/server/src/shared/entities'
import { isLoggedIn } from '@/stores/user'
import FeedbackCard from '@/components/FeedbackCard.vue'
import { useI18n } from 'vue-i18n'
import AdminHeader from '@/components/AdminHeader.vue'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const feedbackList = ref<Feedback[]>([])
const error = ref<string | null>(null)
const selectedFeedback = ref<Feedback | null>(null)
const editComment = ref<string>('')
const updatedStatus = ref<'confirmed' | 'pending' | 'canceled'>('pending');
const statusFilter = ref<string>('')
const router = useRouter();

const filteredFeedback = computed(() => {
  return statusFilter.value
    ? feedbackList.value.filter((feedback) => feedback.status === statusFilter.value)
    : feedbackList.value
})

async function fetchFeedbacks() {
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
      updatedStatus: updatedStatus.value,
    })
    closeEditModal()
    fetchFeedbacks()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to edit feedback'
  }
}

const deleteFeedback = async (feedbackId: number) => {
  try {
    await trpc.feedback.admin.adminDelete.mutate({ feedbackId })
    fetchFeedbacks()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to delete feedback'
  }
}

const checkAdminAuth = () => {
  if (!isLoggedIn.value) {
    router.push('/admin/login')
  }
}

onMounted(() => {
  fetchFeedbacks();
  checkAdminAuth();
});
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

.link-style {
  color: #4f6259;
  font-weight: semi-bold;
  text-decoration: none;
}

.link-style:hover {
  text-decoration: underline;
}

.language-toggle-button {
  padding: 5px 10px;
  background-color: #eacdc7;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.language-toggle-button:hover {
  background-color: #d3b8ae;
}

.nav-bar {
  background-color: #f2e1dd; /* Different shade of pink */
  padding: 0.5em 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 60px;
  padding-left: 150px;
}

.nav-link {
  color: #4f6259;
  padding: 0.5em 1em;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:not(:last-of-type) {
  border-right: 1px solid #ddd;
}

.nav-link:hover {
  background-color: #eed7d2; /* Lighter pink for hover */
}
</style>
