<template>
  <div class="container mx-auto flex h-screen items-center justify-center bg-[#F7EBE9]">
    <div class="w-full max-w-xs">
      <h1 class="mb-6 text-2xl font-bold text-[#4F6259]">Admin Login</h1>
      <form @submit.prevent="handleLogin" class="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <div class="mb-4">
          <input
            class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            v-model="username"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <input
            class="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="password"
            v-model="password"
            placeholder="Password"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="focus:shadow-outline rounded bg-[#4F6259] px-4 py-2 font-bold text-white hover:bg-[#3A4D46] focus:outline-none"
            type="submit"
          >
            Login
          </button>
        </div>
        <p class="mt-4 text-center text-red-500" v-if="loginState.error">{{ loginState.error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { loginAdmin } from '@/stores/user'

const username = ref('')
const password = ref('')
const router = useRouter()

const loginState = reactive({
  error: null as string | null,
})

const handleLogin = async () => {
  try {
    await loginAdmin({ email: username.value, password: password.value })
    router.push('/admin/dashboard')
  } catch (error) {
    if (error instanceof Error) {
      loginState.error = error.message
    } else {
      loginState.error = 'An unexpected error occurred.'
    }
  }
}
</script>
