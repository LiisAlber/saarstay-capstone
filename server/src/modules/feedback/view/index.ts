import { publicProcedure } from '@server/trpc'
import { Feedback } from '@server/entities'
import { TRPCError } from '@trpc/server'

export default publicProcedure.query(async ({ ctx: { db } }) => {
  try {
    // Retrieve feedback entries with status 'confirmed'
    const confirmedFeedbacks = await db.getRepository(Feedback).find({
      where: { status: 'confirmed' },
    })

    return confirmedFeedbacks
  } catch (error) {
  
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error retrieving confirmed feedback',
    })
  }
})
