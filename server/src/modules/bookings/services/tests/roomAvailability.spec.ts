import { it, expect } from 'vitest'
import { createTestDatabase } from '../../../../tests/utils/database'
import { fakeBooking } from '../../../../entities/tests/fakes'
import { Booking } from '../../../../entities/bookings'
import { checkRoomAvailability } from '../roomAvailabilityService'

it('should return true if no conflicting bookings', async () => {
  const db = await createTestDatabase()

  await db.getRepository(Booking).save(
    fakeBooking({
      checkInDate: new Date('2024-01-10'),
      checkOutDate: new Date('2024-01-15'),
      status: 'confirmed',
    })
  )

  const result = await checkRoomAvailability(new Date('2024-01-01'), new Date('2024-01-05'), db)
  expect(result).toBe(true)
})
