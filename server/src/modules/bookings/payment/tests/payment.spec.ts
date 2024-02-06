import { it, expect, vi } from 'vitest'
import { createPaymentIntent } from '../../services/stripeService'
import { payment } from '../payment'

// Mock Stripe service
vi.mock('../../services/stripeService', () => ({
  createPaymentIntent: vi.fn(),
}))

it('should correctly call createPaymentIntent with valid input', async () => {
  const mockInput = {
    amount: 1000, // in cents
    currency: 'eur',
    metadata: { orderId: '12345' },
  }

  // Call the procedure with mock input and additional mocked properties
  await payment({
    input: mockInput,
    ctx: {},
    rawInput: mockInput,
    path: 'payment',
    type: 'mutation',
  })

  // Verify that createPaymentIntent is called correctly
  expect(createPaymentIntent).toHaveBeenCalledWith(
    mockInput.amount,
    mockInput.currency,
    mockInput.metadata
  )
})
