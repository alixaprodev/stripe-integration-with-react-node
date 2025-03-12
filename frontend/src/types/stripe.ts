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