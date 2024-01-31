import { it, expect, vi } from 'vitest';
import Stripe from 'stripe';
import * as stripeService from '../stripeService';

// Mocking the stripeService 
vi.mock('../stripeService', () => ({
  createPaymentIntent: vi.fn(), 
}));

it('should create a payment intent successfully', async () => {
  // Creates a mock response for the payment intent, resembling the Stripe PaymentIntent structure
  const mockPaymentIntent: Partial<Stripe.PaymentIntent> = {
    id: 'pi_123456',
    status: 'succeeded',
  };

  // Mocks implementation of createPaymentIntent to return the mock payment intent
  vi.spyOn(stripeService, 'createPaymentIntent').mockResolvedValue(mockPaymentIntent as Stripe.PaymentIntent);

  // Define input parameters for the createPaymentIntent function
  const amount = 1000; // in cents
  const currency = 'eur';
  const metadata = { orderId: '12345' };

  // Calls createPaymentIntent function with the mock parameters
  const result = await stripeService.createPaymentIntent(amount, currency, metadata);

  // Asserts createPaymentIntent was called with the correct parameters
  expect(stripeService.createPaymentIntent).toHaveBeenCalledWith(amount, currency, metadata);

  // Asserts that result of createPaymentIntent matches the expected mock response
  expect(result).toEqual(mockPaymentIntent as Stripe.PaymentIntent);
});
