import { Request } from 'express';
import Stripe from 'stripe';

export interface CreatePaymentIntentRequest extends Request {
  body: {
    amount: number;
  };
}

export interface StripeConfig {
  secretKey: string;
  publicKey: string;
  webhookSecret: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
}

export interface WebhookEvent {
  type: string;
  data: {
    object: Stripe.PaymentIntent;
  };
}

export interface AppError extends Error {
  statusCode?: number;
} 