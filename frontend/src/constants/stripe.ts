import { CardElementOptions } from '../types/stripe';

export const STRIPE_CARD_ELEMENT_OPTIONS: CardElementOptions = {
  style: {
    base: {
      color: 'var(--text-primary)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '16px',
      textAlign: 'center',
      '::placeholder': {
        color: 'var(--text-secondary)',
      },
    },
    invalid: {
      color: 'var(--error-main)',
      iconColor: 'var(--error-main)',
    },
  },
};

export const PAYMENT_FORM_INITIAL_STATE = {
  amount: 0,
  loading: false,
  error: null,
  paymentData: null,
};

export const API_ENDPOINTS = {
  CREATE_PAYMENT_INTENT: `${import.meta.env.VITE_API_URL}/api/create-payment-intent`,
};

export const ERROR_MESSAGES = {
  NO_CLIENT_SECRET: 'Failed to get payment intent client secret',
  CARD_ELEMENT_NOT_FOUND: 'Card element not found',
  PAYMENT_FAILED: 'Payment failed',
  GENERIC_ERROR: 'An error occurred processing your payment',
}; 