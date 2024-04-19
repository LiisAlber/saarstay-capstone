<template>
  <header class="fixed left-0 top-0 z-50 w-full bg-[rgba(79,98,89,0.90)] shadow">
    <div class="container mx-auto flex h-16 items-center justify-between px-6 py-4">
      <!-- Logo -->
      <router-link to="/admin/dashboard" class="logo-size">
        <img
          src="https://stghbucket.s3.eu-north-1.amazonaws.com/logo/SAAR+(1).png"
          alt="SAARstay Admin Logo"
          class="logo-size"
        />
      </router-link>

      <!-- Admin Actions -->
      <div class="flex items-center">
        <!-- Language Toggle -->
        <button @click="toggleLanguage" class="header-action mr-4">
          {{ currentLanguage }}
        </button>

        <!-- Logout Button -->
        <button @click="handleLogout" class="header-action logout-button">
          {{ t('admin.logout') }}
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { logout } from '@/stores/user'

const router = useRouter()
const { t, locale } = useI18n()
const handleLogout = () => {
  logout()
  router.push('/admin/login')
}

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'et' : 'en'
}

const currentLanguage = computed(() => (locale.value === 'en' ? 'ET' : 'EN'))
</script>

<style>
.logo-size {
  width: auto; /* Maintain aspect ratio */
  height: 120px;
}

.logout-button {
  padding: 8px 16px;
  background-color: rgba(79, 98, 89, 0.9); /* Green background to match the header */
  color: #eacdc7; /* Pink text color */
  border: 1px solid #eacdc7; /* Pink border to separate it in the header */
  border-radius: 0.375rem; /* 6px */
  transition:
    background-color 0.3s,
    color 0.3s; /* Smooth transition for hover states */
}

.logout-button:hover {
  background-color: #3a4d46; /* Darker shade on hover for the background */
  color: #f7ebe9; /* Lighter pink color on hover for the text */
}
</style>
