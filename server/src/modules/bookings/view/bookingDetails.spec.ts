import { it, expect } from 'vitest';
import { createTestDatabase } from '../../../tests/utils/database'
import { Booking } from '../../../entities';
import { fakeBooking } from '../../../entities/tests/fakes';
import { getBookingDetails } from './getBookingDetails';

it('should return booking details for a valid hashed ID', async () => {
    const testDb = await createTestDatabase();
 
    // Creates instance of a fake booking and set a valid hashedId if not already set
    const fakeBookingInstance = fakeBooking();
    fakeBookingInstance.hashedId = fakeBookingInstance.hashedId || 'someValidHashedId';
 
    // Inserts the fake booking into the test database
    await testDb.getRepository(Booking).save(fakeBookingInstance);
 
    // Test the procedure with the hashed ID of the fake booking
    const result = await getBookingDetails({
      input: { hashedBookingId: fakeBookingInstance.hashedId },
      ctx: { db: testDb },
      rawInput: { hashedBookingId: fakeBookingInstance.hashedId },
      path: 'getBookingDetails',
      type: 'query',
    });
 
    expect(result).toEqual(fakeBookingInstance);
  });
