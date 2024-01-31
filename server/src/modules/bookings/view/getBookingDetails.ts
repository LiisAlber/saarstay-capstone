import { z } from 'zod'
import { publicProcedure } from '@server/trpc'
import { Booking } from '@server/entities'
import { TRPCError } from '@trpc/server'

// Define input validation schema
const getBookingDetailsInput = z.object({
  hashedBookingId: z.string(),
})

export const getBookingDetails = publicProcedure
  .input(getBookingDetailsInput)
  .query(async ({ input, ctx: { db } }) => {
    const { hashedBookingId } = input // using the hashed ID

    const booking = await db.getRepository(Booking).findOne({
      where: { hashedId: hashedBookingId },
    })

    if (!booking) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Booking not found',
      })
    }

    return booking
  })
