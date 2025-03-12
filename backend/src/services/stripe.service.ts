import Stripe from 'stripe';
import config from '../config';
import { PaymentIntentResponse, WebhookEvent } from '../types/stripe';

class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(config.stripe.secretKey, {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(amount: number): Promise<PaymentIntentResponse> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency: 'usd',
        payment_method_types: ['card'],
      });

      return {
        clientSecret: paymentIntent.client_secret as string,
      };
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  async handleWebhookEvent(event: WebhookEvent): Promise<void> {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(event.data.object);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    // Implement success logic (e.g., update database, send email)
    console.log('Payment succeeded:', paymentIntent.id);
  }

  private async handlePaymentFailure(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    // Implement failure logic (e.g., notify user, log error)
    console.error('Payment failed:', paymentIntent.id);
  }

  private handleStripeError(error: unknown): Error {
    if (error instanceof Stripe.errors.StripeError) {
      const appError = new Error(error.message);
      (appError as any).statusCode = error.statusCode || 500;
      return appError;
    }
    return error as Error;
  }
}

export default new StripeService(); 