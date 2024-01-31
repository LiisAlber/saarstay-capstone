import { Chance } from 'chance'

// Chance is a lightweight fake data generator.
// Faker.js is another popular library, but it is relatively slow to import.
// Also, if we are running tests in CI server, we want to use the same seed
// every time to make the tests deterministic.
export const random = process.env.CI ? Chance(1) : Chance()

export const fakeBooking = () => {
  // Generate a random check-in date in the year 2030
  const checkInDate = new Date();
  checkInDate.setFullYear(2030);
  checkInDate.setMonth(random.integer({ min: 0, max: 11 })); // Month: 0-11
  checkInDate.setDate(random.integer({ min: 1, max: 28 })); // Day: 1-28 to avoid month-end complexities

  // Set the check-out date to 3 days after the check-in date
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkInDate.getDate() + 3);

  return {
    guestName: random.name(),
    guestEmail: random.email(),
    guestContactNumber: random.phone(),
    checkInDate: checkInDate.toISOString().split('T')[0],
    checkOutDate: checkOutDate.toISOString().split('T')[0],
    numberOfGuests: random.integer({ min: 1, max: 5 }).toString(),
    specialRequests: random.sentence(),
  };
};

/**
 * Creates a new user with a random email and password. We want a random email
 * as our E2E tests can run against a real database, and we don't want to
 * our tests to fail because of a duplicate email.
 */
export const fakeUser = () => ({
  email: random.email(),
  password: 'password.123',
})
