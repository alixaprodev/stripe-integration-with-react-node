import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, onClose }) => {
  // Common error messages and their user-friendly explanations
  const errorExplanations: { [key: string]: string } = {
    'card_declined': 'Your card was declined. Please check your card details or try a different card.',
    'insufficient_funds': 'Your card has insufficient funds. Please try a different card.',
    'expired_card': 'Your card has expired. Please use a different card.',
    'incorrect_cvc': 'The security code (CVC) is incorrect. Please check and try again.',
    'processing_error': 'There was an error processing your card. Please try again.',
    'invalid_card': 'Your card number is invalid. Please check and try again.',
  };

  // Get user-friendly message or use the original message
  const getUserFriendlyMessage = (errorMessage: string) => {
    const lowerMessage = errorMessage.toLowerCase();
    for (const [key, explanation] of Object.entries(errorExplanations)) {
      if (lowerMessage.includes(key)) {
        return explanation;
      }
    }
    return errorMessage;
  };

  return (
    <div className="error-message">
      <div className="error-content">
        <div className="error-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
          </svg>
        </div>
        <h2>Payment Failed</h2>
        <div className="error-details">
          <p className="error-text">{getUserFriendlyMessage(message)}</p>
          <div className="troubleshooting">
            <h3>Troubleshooting Steps:</h3>
            <ul>
              <li>Check if your card has sufficient funds</li>
              <li>Verify your card details are entered correctly</li>
              <li>Make sure your card is not expired</li>
              <li>Try a different payment method</li>
            </ul>
          </div>
          <div className="support">
            <p>Need help? Contact our support team at support@example.com</p>
          </div>
        </div>
        <div className="error-actions">
          <button className="retry-button" onClick={onRetry}>
            Try Again
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage; 