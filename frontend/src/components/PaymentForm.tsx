import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';
import { PaymentIntentResponse, PaymentSuccessData } from '../types/stripe';

// Initialize Stripe with publishable key from environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Card element styles
const cardElementStyle = {
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

const CheckoutForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentSuccessData | null>(null);
  
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);
    setPaymentData(null);

    try {
      // Create PaymentIntent on the server
      const { data } = await axios.post<PaymentIntentResponse>(
        `${import.meta.env.VITE_API_URL}/api/create-payment-intent`,
        { amount }
      );

      if (!data.clientSecret) {
        throw new Error('Failed to get payment intent client secret');
      }

      // Get card element
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      // Confirm the payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              // You can add billing details here if needed
            },
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        setPaymentData({
          amount: paymentIntent.amount,
          paymentId: paymentIntent.id,
          created: paymentIntent.created,
          paymentMethod: paymentIntent.payment_method as string,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
        });
        
        // Reset form
        setAmount(0);
        cardElement.clear();
      } else {
        throw new Error('Payment failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred processing your payment');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(false);
  };

  const handleClose = () => {
    setError(null);
    setPaymentData(null);
  };

  if (paymentData) {
    return <SuccessMessage paymentData={paymentData} onClose={handleClose} />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} onClose={handleClose} />;
  }

  return (
    <div className="payment-form">
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="amount">Amount (USD):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="1"
            step="0.01"
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="form-row">
          <label>Card Details:</label>
          <div className="card-element">
            <CardElement options={cardElementStyle} />
          </div>
          <div className="card-element-info">
            <small>We accept all major credit cards</small>
          </div>
        </div>
        <button type="submit" disabled={!stripe || loading}>
          {loading ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </button>
      </form>
    </div>
  );
};

// Wrap the checkout form with Stripe Elements
const PaymentForm = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentForm; 