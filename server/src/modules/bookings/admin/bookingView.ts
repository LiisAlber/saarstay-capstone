import { Booking } from '@server/entities'
import { authenticatedProcedure } from '@server/trpc/authProcedure'

export default authenticatedProcedure.query(async ({ ctx }) => {
  const { db } = ctx
  const bookings = await db.getRepository(Booking).find()
  return bookings
})
