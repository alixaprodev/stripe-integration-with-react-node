import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { FormState, PaymentIntentResponse, PaymentSuccessData } from '../types/stripe';
import { PAYMENT_FORM_INITIAL_STATE, API_ENDPOINTS, ERROR_MESSAGES } from '../constants/stripe';

export const usePayment = () => {
  const [state, setState] = useState<FormState>(PAYMENT_FORM_INITIAL_STATE);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (amount: number): Promise<void> => {
    if (!stripe || !elements) {
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null, paymentData: null }));

    try {
      // Create PaymentIntent
      const { data } = await axios.post<PaymentIntentResponse>(
        API_ENDPOINTS.CREATE_PAYMENT_INTENT,
        { amount }
      );

      if (!data.clientSecret) {
        throw new Error(ERROR_MESSAGES.NO_CLIENT_SECRET);
      }

      // Get card element
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error(ERROR_MESSAGES.CARD_ELEMENT_NOT_FOUND);

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {},
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        const paymentData: PaymentSuccessData = {
          amount: paymentIntent.amount,
          paymentId: paymentIntent.id,
          created: paymentIntent.created,
          paymentMethod: paymentIntent.payment_method as string,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
        };
        
        setState(prev => ({ ...prev, paymentData, amount: 0 }));
        cardElement.clear();
      } else {
        throw new Error(ERROR_MESSAGES.PAYMENT_FAILED);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC_ERROR
      }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const resetError = () => setState(prev => ({ ...prev, error: null }));
  const resetPayment = () => setState(PAYMENT_FORM_INITIAL_STATE);

  return {
    state,
    handlePayment,
    resetError,
    resetPayment,
  };
}; 