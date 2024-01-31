import { z } from 'zod'
import { publicProcedure } from '@server/trpc'
import { createPaymentIntent } from '../services/stripeService'

// Define the input schema
const createPaymentIntentSchema = z.object({
  amount: z.number(),
  currency: z.string().optional(),
  metadata: z.record(z.string()).optional(),
})

export const payment = publicProcedure
  .input(createPaymentIntentSchema)
  .mutation(async ({ input }) => {
    // input is validated against the schema
    const { amount, currency = 'eur', metadata } = input
    return createPaymentIntent(amount, currency, metadata)
  })
