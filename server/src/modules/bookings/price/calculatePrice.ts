import { z } from 'zod'
import { publicProcedure } from '@server/trpc'
import { pricingService } from '../services/pricingService'

// input validation schema for price calculation
const calculatePriceInput = z.object({
  checkInDate: z.date(),
  checkOutDate: z.date(),
})

export const calculatePrice = publicProcedure
  .input(calculatePriceInput)
  .query(async ({ input }) => {
    const { checkInDate, checkOutDate } = input

    // Calculate the price using pricing service
    const price = pricingService.calculateBookingCost(checkInDate, checkOutDate)

    return { price }
  })
