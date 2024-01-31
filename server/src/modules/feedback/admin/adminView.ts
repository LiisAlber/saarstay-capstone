import { authenticatedProcedure } from '@server/trpc/authProcedure'
import { Feedback } from '@server/entities'
import { TRPCError } from '@trpc/server'

const adminView = authenticatedProcedure.query(async ({ ctx: { db, authUser } }) => {
  // Ensures the user is an admin
  if (!authUser?.isAdmin) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have permission to view feedback.',
    })
  }

  try {
    // Retrieve all feedback entries
    const feedbacks = await db.getRepository(Feedback).find()
    return feedbacks
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error retrieving feedback',
    })
  }
})

export default adminView
