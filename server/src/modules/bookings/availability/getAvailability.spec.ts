import { it, expect } from 'vitest'
import { fakeBooking } from '../../../entities/tests/fakes'
import { Booking } from '../../../entities'
import { createTestDatabase } from '../../../tests/utils/database'
import { checkRoomAvailability } from '../services/roomAvailabilityService'

it('should return true if rooms are available', async () => {
  const db = await createTestDatabase()

  // Create new Booking instances from fake data
  const booking1Data = fakeBooking({
    checkInDate: new Date('2024-01-01'),
    checkOutDate: new Date('2024-01-03'),
  })
  const booking1 = db.getRepository(Booking).create(booking1Data)

  const booking2Data = fakeBooking({
    checkInDate: new Date('2024-01-04'),
    checkOutDate: new Date('2024-01-06'),
  })
  const booking2 = db.getRepository(Booking).create(booking2Data)

  // Seed booking instances
  await db.getRepository(Booking).save([booking1, booking2])

  const isAvailable = await checkRoomAvailability(
    new Date('2024-01-07'),
    new Date('2024-01-09'),
    db
  )
  expect(isAvailable).toBe(true)
})

it('should return false if rooms are not available', async () => {
  const db = await createTestDatabase()

  // Create new Booking instances from fake data
  const booking1Data = fakeBooking({
    checkInDate: new Date('2024-01-01'),
    checkOutDate: new Date('2024-01-03'),
  })
  const booking1 = db.getRepository(Booking).create(booking1Data)

  const booking2Data = fakeBooking({
    checkInDate: new Date('2024-01-04'),
    checkOutDate: new Date('2024-01-06'),
  })
  const booking2 = db.getRepository(Booking).create(booking2Data)

  // Seed booking instances
  await db.getRepository(Booking).save([booking1, booking2])

  const isAvailable = await checkRoomAvailability(
    new Date('2024-01-02'),
    new Date('2024-01-05'),
    db
  )
  expect(isAvailable).toBe(false)
})
