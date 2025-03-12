import React from 'react';
import { PaymentSuccessData } from '../types/stripe';

interface SuccessMessageProps {
  paymentData: PaymentSuccessData;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ paymentData, onClose }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

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
          <div className="payment-info">
            <p className="amount">
              Amount paid: <span>{formatCurrency(paymentData.amount, paymentData.currency)}</span>
            </p>
            <p className="payment-id">
              Payment ID: <span>{paymentData.paymentId}</span>
            </p>
            <p className="payment-date">
              Date: <span>{formatDate(paymentData.created)}</span>
            </p>
            <p className="payment-method">
              Payment Method: <span>{paymentData.paymentMethod}</span>
            </p>
            <p className="payment-status">
              Status: <span className="status-badge success">{paymentData.status}</span>
            </p>
          </div>
          <div className="what-next">
            <h3>What's Next?</h3>
            <ul>
              <li>A confirmation email will be sent to your email address</li>
              <li>Your payment will be processed within 24 hours</li>
              <li>You can view your transaction history in your account</li>
            </ul>
          </div>
          <div className="receipt-info">
            <p>Need a receipt? You can download it from your email or account dashboard.</p>
          </div>
        </div>
        <div className="success-actions">
          <button className="download-button">
            Download Receipt
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage; 