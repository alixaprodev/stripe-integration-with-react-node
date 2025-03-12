export interface PaymentIntentResponse {
  id: string;
  object: string;
  amount: number;
  amount_details: {
    tip: Record<string, unknown>;
  };
  automatic_payment_methods: {
    allow_redirects: string;
    enabled: boolean;
  };
  currency: string;
  created: number;
  payment_method: string;
  payment_method_types: string[];
  status: string;
  clientSecret: string;
}

export interface PaymentSuccessData {
  amount: number;
  paymentId: string;
  created: number;
  paymentMethod: string;
  currency: string;
  status: string;
}

export interface CardElementOptions {
  style: {
    base: {
      color: string;
      fontFamily: string;
      fontSize: string;
      textAlign: string;
      '::placeholder': {
        color: string;
      };
    };
    invalid: {
      color: string;
      iconColor: string;
    };
  };
}

export interface FormState {
  amount: number;
  loading: boolean;
  error: string | null;
  paymentData: PaymentSuccessData | null;
}

export interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
  onClose: () => void;
}

export interface SuccessMessageProps {
  paymentData: PaymentSuccessData;
  onClose: () => void;
} 