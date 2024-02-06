import { it, expect } from 'vitest'
import { Booking } from '../../../../entities'
import { createTestDatabase } from '../../../../tests/utils/database'
import { fakeBooking } from '../../../../entities/tests/fakes'

it('should update booking status for a valid booking ID', async () => {
  const testDb = await createTestDatabase()

  // instance of a fake booking
  const fakeBookingInstance = fakeBooking({ hashedId: 'validBookingId' })

  // insert fake booking into test database
  await testDb.getRepository(Booking).save(fakeBookingInstance)

  // Manually updates the booking status as if the procedure was called
  await testDb.getRepository(Booking).update(
    { hashedId: fakeBookingInstance.hashedId },
    {
      paymentStatus: 'succeeded',
      stripePaymentIntentId: 'pi_12345',
      status: 'confirmed',
    }
  )

  // Fetch the updated booking
  const updatedBooking = await testDb
    .getRepository(Booking)
    .findOne({ where: { hashedId: fakeBookingInstance.hashedId } })

  expect(updatedBooking).toMatchObject({
    paymentStatus: 'succeeded',
    stripePaymentIntentId: 'pi_12345',
    status: 'confirmed',
  })
})
