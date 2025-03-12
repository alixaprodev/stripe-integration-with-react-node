import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { usePayment } from '../hooks/usePayment';
import { STRIPE_CARD_ELEMENT_OPTIONS } from '../constants/stripe';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm: React.FC = () => {
  const { state, handlePayment, resetError, resetPayment } = usePayment();
  const { amount, loading, error, paymentData } = state;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handlePayment(amount);
  };

  if (paymentData) {
    return <SuccessMessage paymentData={paymentData} onClose={resetPayment} />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={resetError} onClose={resetPayment} />;
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
            onChange={(e) => handlePayment(Number(e.target.value))}
            min="1"
            step="0.01"
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="form-row">
          <label>Card Details:</label>
          <div className="card-element">
            <CardElement options={STRIPE_CARD_ELEMENT_OPTIONS} />
          </div>
          <div className="card-element-info">
            <small>We accept all major credit cards</small>
          </div>
        </div>
        <button type="submit" disabled={loading}>
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
const PaymentForm: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentForm; 