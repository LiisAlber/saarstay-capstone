<template>
  <div class="bg-[#f7ebe9] p-24">
    <div v-if="error" class="text-[#4f6259]">{{ error }}</div>
    <Carousel
      v-else-if="feedbackList.length"
      :wrap-around="true"
      :autoplay="3000"
      :navigationEnabled="true"
      :breakpoints="breakpoints"
    >
      <Slide v-for="feedback in feedbackList" :key="feedback.id">
        <div
          class="flex min-h-[250px] flex-col items-center rounded-lg bg-[#E8D3D0] p-8 text-center shadow-lg"
        >
          <div class="mb-4 mt-2 flex justify-center gap-x-1">
            <div class="star-rating mb-4 mt-2">
              <StarIcon
                v-for="index in 5"
                :key="index"
                :class="getStarClass(feedback.rating, index)"
                class="star"
              />
            </div>
          </div>
          <p class="text-xl text-[#4f6259]">{{ feedback.comment }}</p>
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
/* Star icon size and color */
.h-5.w-5.fill-current {
  height: 1.25rem; /* 20px */
  width: 1.25rem; /* 20px */
}

.text-dark-green {
  color: #3a5a40;
}

.text-light-green {
  color: #a2b29f;
}

.star-container {
  margin-bottom: 1rem; /* Space between stars and text */
}

.star-rating .star {
  width: 24px;
  height: 24px;
  margin: 0 2px; /* Adds spacing between stars */
}

.star-rating {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
