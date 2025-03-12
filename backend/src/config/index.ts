import dotenv from 'dotenv';
import { StripeConfig } from '../types/stripe';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  } as StripeConfig,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

export default config; 