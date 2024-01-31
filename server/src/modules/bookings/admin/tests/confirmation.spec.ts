import { it, expect } from 'vitest'
// eslint-disable-next-line import/no-useless-path-segments
import { appRouter } from '../../../../modules/index';
import { Booking, User } from '../../../../entities';
import { fakeAdminUser, fakeBooking } from '../../../../entities/tests/fakes';
import { authContext } from '../../../../tests/utils/context';
import { createTestDatabase } from '../../../../tests/utils/database'

it('should update booking status to confirmed', async () => {
  // Arrange
  const db = await createTestDatabase()
  const adminUser = await db.getRepository(User).save(fakeAdminUser())
  const booking = await db.getRepository(Booking).save(fakeBooking())

  // Create a caller for the procedure
  const { bookings } = appRouter.createCaller(authContext({ db }, adminUser))
  const { confirmBooking } = bookings.admin

  // Act
  await confirmBooking({ bookingId: booking.id })

  // Assert
  const updatedBooking = await db.getRepository(Booking).findOneBy({ id: booking.id })
  expect(updatedBooking).toBeDefined()
  expect(updatedBooking?.status).toBe('confirmed')
})

it('should update booking status to canceled', async () => {
  // Arrange
  const db = await createTestDatabase();
  const adminUser = await db.getRepository(User).save(fakeAdminUser());
  const booking = await db.getRepository(Booking).save(fakeBooking());

  // Create a caller for the procedure
  const { bookings } = appRouter.createCaller(authContext({ db }, adminUser));
  const { cancelBooking } = bookings.admin;

  // Act
  await cancelBooking({ bookingId: booking.id });

  // Assert
  const updatedBooking = await db.getRepository(Booking).findOneBy({ id: booking.id });
  expect(updatedBooking).toBeDefined();
  expect(updatedBooking?.status).toBe('canceled');
});

it('should update booking details', async () => {
  // Arrange
  const db = await createTestDatabase();
  const adminUser = await db.getRepository(User).save(fakeAdminUser());
  const booking = await db.getRepository(Booking).save(fakeBooking());

  // The details to update
  const updateDetails = {
    guestName: 'Updated Name',
    guestEmail: 'updated@example.com',
  };

  // Create a caller for the procedure
  const { bookings } = appRouter.createCaller(authContext({ db }, adminUser));
  const { updateBooking } = bookings.admin;

  // Act
  await updateBooking({ bookingId: booking.id, ...updateDetails });

  // Assert
  const updatedBooking = await db.getRepository(Booking).findOneBy({ id: booking.id });
  expect(updatedBooking).toBeDefined();
  expect(updatedBooking?.guestName).toBe(updateDetails.guestName);
  expect(updatedBooking?.guestEmail).toBe(updateDetails.guestEmail);
});