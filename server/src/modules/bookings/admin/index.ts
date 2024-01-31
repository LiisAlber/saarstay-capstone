import { router } from '@server/trpc'
import bookingView from './bookingView'
import { confirmBooking, cancelBooking, updateBooking } from './confirmation'
import { createLocation, updateLocation } from './locationData'

const admin = router({
  bookingView,
  confirmBooking,
  cancelBooking,
  updateBooking,
  createLocation,
  updateLocation,
})
export default admin
