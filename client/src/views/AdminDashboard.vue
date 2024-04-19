<template>
  <AdminHeader />
  <div class="">
    <div class="nav-bar flex space-x-4 bg-[#f2e1dd] shadow">
      <router-link to="/admin/dashboard" class="nav-link">{{ t('admin.dashboard') }}</router-link>
      <router-link to="/admin/bookings" class="nav-link">{{
        t('admin.manageBookings')
      }}</router-link>
      <router-link to="/admin/feedback" class="nav-link">{{
        t('admin.manageFeedback')
      }}</router-link>
    </div>
  </div>

  <div
    class="container grid max-w-full grid-cols-1 gap-8 bg-[#F7EBE9] pb-40 pl-40 pt-20 md:grid-cols-3"
  >
    <div class="booking-calendar overflow-hidden rounded-lg shadow-lg md:col-span-2">
      <BookingCalendar />
    </div>

    <div class="logo flex items-center justify-center md:col-span-2">
      <img
        src="https://stghbucket.s3.eu-north-1.amazonaws.com/logo/SAAR.jpg"
        alt="Company Logo"
        class="h-auto max-w-full"
      />
    </div>

    <div class="upcoming-bookings overflow-hidden rounded-lg shadow-lg">
      <UpcomingBookings />
    </div>

    <div class="pending-feedback overflow-hidden rounded-lg shadow-lg md:col-span-1 md:row-span-2">
      <PendingFeedback />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isLoggedIn } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import AdminHeader from '@/components/AdminHeader.vue'
import UpcomingBookings from '@/components/UpcomingBookings.vue'
import PendingFeedback from '@/components/PendingFeedback.vue'
import BookingCalendar from '@/components/BookingCalendar.vue'

const router = useRouter()
const { t } = useI18n()

// const buttonLabel = computed(() => (locale.value === 'en' ? 'ET' : 'EN'))

// const toggleLanguage = () => {
//  locale.value = locale.value === 'en' ? 'et' : 'en'
// }

onMounted(() => {
  if (!isLoggedIn.value) {
    router.push('/admin/login')
  }
})
</script>

<style scoped>
.container {
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr; /* Single column for small screens */
  grid-template-rows: auto; /* Height based on content */
  gap: 2rem;
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

.nav-bar {
  background-color: #f2e1dd; /* Different shade of pink */
  padding: 0.5em 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 60px;
  padding-left: 150px;
}

.nav-link {
  color: #4f6259;
  padding: 0.5em 1em;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:not(:last-of-type) {
  border-right: 1px solid #ddd;
}

.nav-link:hover {
  background-color: #eed7d2; /* Lighter pink for hover */
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: 2fr 1fr; /* 2/3 and 1/3 layout for medium screens */
    grid-template-areas:
      'calendar bookings'
      'feedback logo';
  }

  .booking-calendar {
    grid-area: calendar;
  }

  .upcoming-bookings {
    grid-area: bookings;
  }

  .pending-feedback {
    grid-area: feedback;
  }

  .logo {
    grid-area: logo;
    align-self: end;
  }
}

@media (min-width: 1024px) {
  .container {
    grid-template-columns: 2fr 1fr 1fr;
  }

  .logo {
    grid-column: 2 / span 1;
  }
}

.logo img {
  max-width: 50%;
  height: auto;
}
</style>
