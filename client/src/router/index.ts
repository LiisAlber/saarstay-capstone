import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminLoginView from '../views/AdminLoginView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AdminBookingView from '../views/AdminBookingView.vue'
import AdminFeedbackView from '../views/AdminFeedbackView.vue'
import BookingForm from '../views/BookingForm.vue'
import BookingDetails from '../views/BookingDetails.vue'
import StripePayment from '../views/StripePayment.vue'
//import FeedbackView from '../views/FeedbackView.vue';
// import { getStoredAccessToken } from '@/utils/auth'
import { isLoggedIn } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLoginView,
    },

    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true },
    },

    {
      path: '/admin/bookings',
      name: 'AdminBookingView',
      component: AdminBookingView,
      meta: { requiresAuth: true },
    },

    {
      path: '/admin/feedback',
      name: 'AdminFeedbackView',
      component: AdminFeedbackView,
      meta: { requiresAuth: true },
    },

    {
      path: '/booking/form',
      name: 'BookingForm',
      component: BookingForm,
    },

    {
      path: '/booking/payment/:bookingId/:clientSecret',
      name: 'StripePayment',
      component: StripePayment,
      props: true,
    },

    {
      path: '/booking/details/:bookingId',
      name: 'BookingDetails',
      component: BookingDetails,
    },

    /* {
      path: '/feedback',
      name: 'Feedback',
      component: FeedbackView,
      meta: { requiresAuth: true }
    }, */

    // Redirect to home if no other route is matched
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to, from, next) => {
  // Check the token's presence and log for debugging
  console.log('Token in localStorage:', localStorage.getItem('adminToken'))
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isLoggedIn.value) {
    next('/admin/login')
  } else {
    next()
  }
})

export default router
