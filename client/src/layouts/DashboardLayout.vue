<script setup lang="ts">
import { FwbNavbarLink } from 'flowbite-vue'
import StackedLayout from './StackedLayout.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

const links = [{ label: t('menu.dashboard'), name: 'Dashboard' }]

function logoutUser() {
  router.push({ name: 'Login' })
}
</script>

<template>
  <StackedLayout :links="links">
    <template #menu>
      <FwbNavbarLink @click.prevent="logoutUser" link="#">{{ t('menu.logout') }}</FwbNavbarLink>
    </template>
  </StackedLayout>
</template>
