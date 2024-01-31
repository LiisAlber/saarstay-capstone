import { it, expect } from 'vitest'
// eslint-disable-next-line import/no-useless-path-segments
import { appRouter } from '../../../../modules/index';
import { Booking, User } from '../../../../entities';
import { fakeAdminUser, fakeBooking } from '../../../../entities/tests/fakes';
import { authContext } from '../../../../tests/utils/context';
import { createTestDatabase } from '../../../../tests/utils/database'

it('should return a list of bookings for an admin user', async () => {
  // Arrange
  const db = await createTestDatabase()
  await db.getRepository(User).save(fakeAdminUser())
  const bookingEntries = [fakeBooking(), fakeBooking()]
  await db.getRepository(Booking).save(bookingEntries)

  // Create a caller for the procedure
  const context = authContext({ db }, fakeAdminUser())
  const { bookings } = appRouter.createCaller(context) 

  // Act
  const bookingsList = await bookings.admin.bookingView()

  // Assert
  expect(bookingsList).toHaveLength(2) // Expect 2 bookings
  bookingsList.forEach((booking) => {
    expect(booking).toMatchObject({
      id: expect.any(Number),
    })
  })
})
