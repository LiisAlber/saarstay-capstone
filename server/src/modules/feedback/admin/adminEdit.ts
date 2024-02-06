import { authenticatedProcedure } from '@server/trpc/authProcedure'
import { Feedback } from '@server/entities'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

const editFeedbackSchema = z.object({
  feedbackId: z.number().int().positive(),
  updatedComment: z.string(),
  updatedStatus: z.enum(['pending', 'confirmed', 'canceled']),
})

const adminEdit = authenticatedProcedure
  .input(editFeedbackSchema)
  .mutation(async ({ input, ctx: { db, authUser } }): Promise<Feedback> => {
    if (!authUser?.isAdmin) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You do not have permission to edit feedback.',
      })
    }

    const { feedbackId, updatedComment, updatedStatus } = input

    const feedback = await db.getRepository(Feedback).findOneBy({ id: feedbackId })

    if (!feedback) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Feedback not found',
      })
    }

    // Update the feedback's comment and status
    feedback.comment = updatedComment
    feedback.status = updatedStatus

    await db.getRepository(Feedback).save(feedback)

    return feedback
  })

export default adminEdit
