import { it, expect, vi } from 'vitest';
import bookingProcedure from '.';

// Mock dependencies
vi.mock('../services/roomAvailabilityService', () => ({
  checkRoomAvailability: vi.fn(),
}));
vi.mock('../services/bookingEmailService', () => ({
  sendBookingConfirmationEmail: vi.fn(),
}));
vi.mock('../services/pricingService', () => ({
  pricingService: { calculateBookingCost: vi.fn() },
}));
vi.mock('../services/stripeService', () => ({
  createPaymentIntent: vi.fn(),
}));

it('should validate input correctly', async () => {

  const invalidInput = {
    guestName: '', // Empty name
    guestEmail: 'invalid-email', // Invalid email format
  };

  const mockContext = {};

  // Attempt to call the procedure with invalid input
  await expect(
    bookingProcedure({
      input: invalidInput,
      ctx: mockContext,
    } as any)
  ).rejects.toThrowError();
});
