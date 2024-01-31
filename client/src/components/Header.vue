<template>
  <header class="fixed top-0 left-0 z-50 w-full bg-[rgba(79,98,89,0.62)] shadow">
    <div class="container mx-auto flex items-center justify-between p-2">
      <!-- Logo -->
      <img src="https://stghbucket.s3.eu-north-1.amazonaws.com/logo/SAARstay+logo.png" alt="SAARstay Guesthouse Logo" class="logo-size" /> 

      <!-- Navigation Links for desktop -->
      <nav class="hidden sm:flex items-center space-x-4">
        <router-link to="/" class="text-white hover:text-gray-300">Home</router-link>
        <!-- Button to open feedback form modal -->
        <button @click="isFeedbackFormOpen = true" class="text-white hover:text-gray-300">Leave Feedback</button>
     
      </nav>

       <!-- Burger Menu Icon for mobile -->
       <button @click="isMenuOpen = !isMenuOpen" class="sm:hidden ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="color: #EACDC7;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

    <!-- Mobile Menu Dropdown -->
  <div v-if="isMenuOpen" class="sm:hidden absolute top-full left-0 w-full shadow-md" style="background-color: #f7ebe9;">
    <router-link to="/" class="block px-4 py-2" style="color: #4F6259;">Home</router-link>
    <button @click="toggleFeedbackForm" class="block w-full text-left px-4 py-2" style="color: #4F6259;">
      Leave Feedback
    </button>
    
    </div>

    <!-- Feedback Form -->
    <FeedbackForm v-if="isFeedbackFormOpen" @close="isFeedbackFormOpen = false" />
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import FeedbackForm from '@/components/FeedbackForm.vue';

const isMenuOpen = ref(false);
const isFeedbackFormOpen = ref(false);

const toggleFeedbackForm = () => {
  isMenuOpen.value = false; // Close the mobile menu
  isFeedbackFormOpen.value = true; // Open the feedback form
};
</script>

<style>
.logo-size {
  width: 150px; /* Logo width */
  height: auto; /* Maintain aspect ratio */
}
</style>
