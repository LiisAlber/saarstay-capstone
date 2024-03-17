<template>
  <div class="container mx-auto bg-[#F7EBE9] px-4 py-4">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold text-[#4F6259]">{{ t('admin.dashboard') }}</h1>
      <button @click="toggleLanguage" class="language-toggle-button">
        {{ buttonLabel }}
      </button>
    </div>
    <nav>
      <ul class="mb-4">
        <li class="mb-2">
          <router-link to="/admin/bookings" class="link-style">{{
            t('admin.manageBookings')
          }}</router-link>
        </li>
        <li class="mb-2">
          <router-link to="/admin/feedback" class="link-style">{{
            t('admin.manageFeedback')
          }}</router-link>
        </li>
      </ul>
    </nav>
    <button @click="handleLogout" class="logout-button">{{ t('admin.logout') }}</button>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isLoggedIn, logout } from '@/stores/user'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t, locale } = useI18n()

const buttonLabel = computed(() => (locale.value === 'en' ? 'ET' : 'EN'))

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'et' : 'en'
}

const handleLogout = () => {
  logout()
  router.push('/admin/login')
}

onMounted(() => {
  if (!isLoggedIn.value) {
    router.push('/admin/login')
  }
})
</script>

<style scoped>
.container {
  background-color: #f7ebe9;
  font-family: 'Open Sans', sans-serif;
}

h1 {
  color: #4f6259;
  font-weight: bold;
}

.link-style {
  color: #4f6259;
  font-weight: semi-bold;
  text-decoration: none;
}

.link-style:hover {
  text-decoration: underline;
}

.logout-button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #4f6259;
  color: white;
  font-family: 'Open Sans', sans-serif;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #3a4d46;
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
</style>
