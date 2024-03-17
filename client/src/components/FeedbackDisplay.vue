<template>
  <div class="bg-pink-background">
    <div v-if="error" class="text-4f6259">{{ error }}</div>
    <Carousel
      v-else-if="feedbackList.length"
      :wrap-around="true"
      :autoplay="3000"
      :navigationEnabled="true"
      :breakpoints="breakpoints"
    >
      <Slide v-for="feedback in feedbackList" :key="feedback.id">
        <div class="bg-card-background rounded-lg p-4 shadow-lg">
          <p class="text-4f6259 font-semibold">{{ feedback.comment }}</p>
          <div class="mt-2 flex">
            <StarIcon
              v-for="index in 5"
              :key="index"
              :class="getStarClass(feedback.rating, index)"
            />
          </div>
        </div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
    <div v-else>{{ t('feedback.noFeedback') }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { trpc } from '@/trpc'
import type { Feedback } from '@mono/server/src/shared/entities'
import StarIcon from '@/components/StarIcon.vue'

const { t } = useI18n()

const feedbackList = ref<Feedback[]>([])
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const data = await trpc.feedback.view.query()
    feedbackList.value = data
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to fetch feedback'
  }
})

const getStarClass = (rating: number, index: number) => {
  return {
    'h-5 w-5 fill-current': true,
    'text-dark-green': index <= rating,
    'text-light-green': index > rating,
  }
}

const breakpoints = {
  640: { itemsToShow: 1 },
  768: { itemsToShow: 2 },
  1024: { itemsToShow: 3 },
}
</script>

<style scoped>
.bg-pink-background {
  background-color: #f7ebe9; /* light pink background */
}

.bg-card-background {
  background-color: #eacdc7; /* card background color */
}

.text-4f6259 {
  color: #4f6259;
}

.text-dark-green {
  color: #4f6259; /* Dark green color */
}

.text-light-green {
  color: #a9c0a6; /* Light green color */
}
</style>
