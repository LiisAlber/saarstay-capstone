import { authenticatedProcedure } from '@server/trpc/authProcedure'
import { Feedback } from '@server/entities'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

const deleteFeedbackSchema = z.object({
  feedbackId: z.number().int().positive(),
})

const adminDelete = authenticatedProcedure
  .input(deleteFeedbackSchema)
  .mutation(async ({ input, ctx: { db, authUser } }) => {
    if (!authUser?.isAdmin) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You do not have permission to delete feedback.',
      })
    }

    const feedback = await db.getRepository(Feedback).findOneBy({ id: input.feedbackId })

    if (!feedback) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Feedback not found',
      })
    }

    await db.getRepository(Feedback).remove(feedback)

    return { message: 'Feedback deleted successfully' }
  })

export default adminDelete
