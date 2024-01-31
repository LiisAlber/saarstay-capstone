<template>
  <div class="container mx-auto bg-[#F7EBE9] px-4 py-4">
    <h1 class="mb-4 text-2xl font-bold text-[#4F6259]">Admin Dashboard</h1>
    <nav>
      <ul class="mb-4">
        <li class="mb-2">
          <router-link to="/admin/bookings" class="link-style">Manage Bookings</router-link>
        </li>
        <li class="mb-2">
          <router-link to="/admin/feedback" class="link-style">Manage Feedback</router-link>
        </li>
      </ul>
    </nav>
    <button @click="handleLogout" class="logout-button">Logout</button>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isLoggedIn, logout } from '@/stores/user'

const router = useRouter()

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
</style>
