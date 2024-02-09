import { router } from '@server/trpc'
import bookingView from './bookingView'
import { confirmBooking, cancelBooking, updateBooking } from './confirmation'

const admin = router({
  bookingView,
  confirmBooking,
  cancelBooking,
  updateBooking,
})
export default admin
