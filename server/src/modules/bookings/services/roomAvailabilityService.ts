import { DataSource, LessThan, MoreThan, Not } from 'typeorm'
import { Booking } from '@server/entities'

export async function checkRoomAvailability(
  checkInDate: Date,
  checkOutDate: Date,
  db: DataSource
): Promise<boolean> {
  const conflictingBookings = await db.getRepository(Booking).count({
    where: {
      checkInDate: LessThan(checkOutDate),
      checkOutDate: MoreThan(checkInDate),
      status: Not('canceled'),
    },
  })

  return conflictingBookings === 0
}
