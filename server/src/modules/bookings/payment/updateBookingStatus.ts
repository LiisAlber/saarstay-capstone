import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Booking } from '@server/entities'

const updateBookingStatusSchema = z.object({
  bookingId: z.string(),
  paymentIntentId: z.string(),
})

export const updateBookingStatus = publicProcedure
  .input(updateBookingStatusSchema)
  .mutation(async ({ input, ctx: { db } }) => {
    const { bookingId, paymentIntentId } = input

    // Fetch the booking from the database
    const booking = await db.getRepository(Booking).findOne({ where: { hashedId: bookingId } })
    if (!booking) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Booking not found' })
    }

    // Update the booking details
    booking.paymentStatus = 'succeeded'
    booking.stripePaymentIntentId = paymentIntentId
    booking.status = 'confirmed'

    // Save the updated booking
    await db.getRepository(Booking).save(booking)

    return { message: 'Booking updated successfully' }
  })
