import { router } from '@server/trpc'
import submit from './submit'
import admin from './admin'
import availability from './availability/getAvailability'
import { getBookingDetails } from './view/getBookingDetails'
import { calculatePrice } from './price/calculatePrice'
import { payment } from './payment/payment'
import { updateBookingStatus } from './payment/updateBookingStatus'

const adminBooking = router({
  submit,
  admin,
  availability,
  getBookingDetails,
  calculatePrice,
  payment,
  updateBookingStatus,
})

export default adminBooking
