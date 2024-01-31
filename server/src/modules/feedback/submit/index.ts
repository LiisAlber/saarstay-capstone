import { publicProcedure } from '@server/trpc'
import { Feedback } from '@server/entities'
import { feedbackSchema } from '@server/entities/feedback'
import { TRPCError } from '@trpc/server'

export default publicProcedure.input(feedbackSchema).mutation(async ({ input, ctx: { db } }) => {
  try {
    const feedback = await db.getRepository(Feedback).save({
      ...input,
      status: 'pending', // initial status is 'pending'
    })

    return feedback
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error submitting feedback',
    })
  }
})
