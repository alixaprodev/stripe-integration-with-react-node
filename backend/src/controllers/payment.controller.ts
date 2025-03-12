import { Response, NextFunction } from 'express';
import { CreatePaymentIntentRequest, WebhookEvent } from '../types/stripe';
import stripeService from '../services/stripe.service';

export const createPaymentIntent = async (
  req: CreatePaymentIntentRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripeService.createPaymentIntent(amount);
    res.json(paymentIntent);
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (
  req: CreatePaymentIntentRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const event = req.body as WebhookEvent;
    await stripeService.handleWebhookEvent(event);
    res.json({ received: true });
  } catch (error) {
    next(error);
  }
}; 