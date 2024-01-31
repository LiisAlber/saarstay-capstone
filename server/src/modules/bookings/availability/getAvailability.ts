import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { checkRoomAvailability } from '../services/roomAvailabilityService'

// Define a schema for the availability check
export const availabilityCheckSchema = z.object({
  checkInDate: z.string(),
  checkOutDate: z.string(),
})

export default publicProcedure
  .input(availabilityCheckSchema)
  .query(async ({ input, ctx: { db } }) => {
    // Convert string dates to Date objects
    const checkInDate = new Date(input.checkInDate)
    const checkOutDate = new Date(input.checkOutDate)

    // Validate that checkOutDate is after checkInDate
    if (checkOutDate <= checkInDate) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Check-out date must be after check-in date.',
      })
    }

    // Check room availability using the shared service
    const isAvailable = await checkRoomAvailability(checkInDate, checkOutDate, db)

    if (!isAvailable) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'No available rooms for the selected dates.',
      })
    }

    // If available, return true
    return {
      message: 'Rooms are available for the selected dates.',
      isAvailable,
    }
  })
