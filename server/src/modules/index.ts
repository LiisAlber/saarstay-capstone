import { router } from '../trpc'
import user from './user'
import bookings from './bookings'
import feedback from './feedback'

// Combine routers from all modules to form the appRouter
export const appRouter = router({
  user,
  bookings,
  feedback,
})

// Type for appRouter, which will be useful for type safety and autocompletion
export type AppRouter = typeof appRouter
