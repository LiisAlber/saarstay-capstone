import Stripe from 'stripe';
import config from '../../../config';

const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: '2023-10-16',
});

export const createPaymentIntent = (
  amount: number,
  currency: string = 'eur',
  metadata?: Record<string, string>
): Promise<Stripe.PaymentIntent> => 
  stripe.paymentIntents.create({
    amount,
    currency,
    metadata,
  });
