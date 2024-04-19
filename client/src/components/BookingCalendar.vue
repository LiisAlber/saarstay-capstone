<template>
  <div
    class="custom-calendar w-full rounded-lg bg-[#FBF5F4] shadow-md"
    :style="{
      'max-width': '100%',
      'font-family': 'Open Sans, sans-serif',
      'border-radius': '8px',
      overflow: 'hidden',
    }"
  >
    <VCalendar
      color="custom-color"
      :attributes="attrs"
      :style="{
        width: '100%',
        height: '100%',
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import 'v-calendar/dist/style.css'
import '../assets/theme.css'

const attrs = ref([
  {
    key: 'today',
    highlight: true,
    dates: new Date(),
  },
])
</script>
