import React from 'react';

interface SuccessMessageProps {
  amount: number;
  paymentId?: string;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ amount, paymentId, onClose }) => {
  return (
    <div className="success-message">
      <div className="success-content">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2>Payment Successful!</h2>
        <div className="success-details">
          <p className="amount">Amount paid: <span>${amount.toFixed(2)}</span></p>
          {paymentId && <p className="payment-id">Payment ID: <span>{paymentId}</span></p>}
          <p className="message">
            Thank you for your payment. We have sent a confirmation email with the transaction details.
          </p>
          <div className="what-next">
            <h3>What's Next?</h3>
            <ul>
              <li>You will receive a confirmation email shortly</li>
              <li>Your payment will be processed within 24 hours</li>
              <li>You can view your transaction history in your account</li>
            </ul>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage; 