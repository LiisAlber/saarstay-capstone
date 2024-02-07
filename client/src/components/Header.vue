<template>
  <header class="fixed left-0 top-0 z-50 w-full bg-[rgba(79,98,89,0.62)] shadow">
    <div class="container mx-auto flex items-center justify-between p-2">
      <!-- Logo -->
      <router-link to="/">
        <img
          src="https://stghbucket.s3.eu-north-1.amazonaws.com/logo/SAARstay+logo.png"
          alt="SAARstay Guesthouse Logo"
          class="logo-size"
        />
      </router-link>

      <!-- Navigation Links for desktop -->
      <nav class="hidden items-center space-x-4 sm:flex">
        <!-- Desktop Booking Button -->
        <button v-if="!isMenuOpen" @click="goToBookingForm" class="header-action">Book Now</button>

        <button @click="isFeedbackFormOpen = true" class="header-action">Leave Feedback</button>
      </nav>

      <!-- Burger Menu Icon for mobile -->
      <button @click="isMenuOpen = !isMenuOpen" class="ml-auto sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          style="color: #eacdc7"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div
      v-if="isMenuOpen"
      class="absolute left-0 top-full w-full shadow-md sm:hidden"
      style="background-color: #f7ebe9"
    >
      <router-link to="/booking/form" class="block px-4 py-2" style="color: #4f6259"
        >Book Now</router-link
      >
      <button
        @click="toggleFeedbackForm"
        class="block w-full px-4 py-2 text-left"
        style="color: #4f6259"
      >
        Leave Feedback
      </button>
    </div>

    <!-- Feedback Form -->
    <FeedbackForm v-if="isFeedbackFormOpen" @close="isFeedbackFormOpen = false" />
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FeedbackForm from '@/components/FeedbackForm.vue'

const isMenuOpen = ref(false)
const isFeedbackFormOpen = ref(false)
const router = useRouter()

const toggleFeedbackForm = () => {
  isMenuOpen.value = false // Close the mobile menu
  isFeedbackFormOpen.value = true // Open the feedback form
}

const goToBookingForm = () => {
  router.push({ name: 'BookingForm' })
}
</script>

<style>
.logo-size {
  width: 150px; /* Logo width */
  height: auto; /* Maintain aspect ratio */
}

.header-action {
  padding: 8px 16px;
  font-size: 1rem; /* Match font size with the rest of the header links */
  color: #eacdc7; /* Color that stands out against the header background */
  background-color: transparent; /* No background for a link-like appearance */
  border: none; /* No border */
  border-radius: 4px; /* Slightly rounded corners for a soft look */
  transition: color 0.3s; /* Smooth color transition on hover */
}

.header-action:hover {
  color: #d3b8ae; /* Darker shade on hover for visibility */
}
</style>
