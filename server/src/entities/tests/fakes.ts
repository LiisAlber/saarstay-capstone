import { User } from '@server/entities/user'
import { Booking } from '@server/entities/bookings'
import { Feedback } from '@server/entities'
import { random } from '../../tests/utils/random'

const randomId = () => random.integer({ min: 1, max: 2147483647 })

const randomBoolean = () => random.bool()

/**
 * Generates a fake user with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeUser = <T extends Partial<User>>(overrides: T = {} as T) => ({
  id: randomId(),
  email: random.email(),
  password: random.string({ length: 10 }),
  contactInfo: random.phone(),
  isAdmin: randomBoolean(),
  ...overrides,
})

/**
 * Generates a fake admin user with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeAdminUser = <T extends Partial<User>>(overrides: T = {} as T) => ({
  ...fakeUser({ isAdmin: true, ...overrides }),
})

/**
 * Generates a fake booking with some default test data.
 */
export const fakeBooking = <T extends Partial<Booking>>(overrides: T = {} as T): Booking => {
  const defaultCheckInDate = new Date()
  const defaultCheckOutDate = new Date(defaultCheckInDate.getTime() + 86400000) // One day after check-in

  return {
    id: randomId(),
    guestName: `${random.first()} ${random.last()}`,
    guestEmail: random.email(),
    guestContactNumber: random.phone(),
    checkInDate: defaultCheckInDate,
    checkOutDate: defaultCheckOutDate,
    numberOfGuests: random.integer({ min: 1, max: 8 }),
    specialRequests: random.sentence(),
    status: 'pending', // Default status
    stripePaymentIntentId: random.string({ length: 36 }), // Simulate random UUID
    paymentStatus: 'pending', // Default payment status
    totalPrice: random.floating({ min: 10, max: 500, fixed: 2 }), // Random total price
    ...overrides,
  }
}

/**
 * Generates a fake feedback with some default test data.
 * @param overrides Any properties that should be different from default fake data.
 */
export const fakeFeedback = <T extends Partial<Feedback>>(overrides: T = {} as T) => ({
  id: randomId(),
  comment: overrides.comment || random.paragraph(),
  rating: overrides.rating || random.integer({ min: 1, max: 5 }),
  dateSubmitted: overrides.dateSubmitted || new Date(),
  status: overrides.status || 'pending',
  ...overrides,
})
