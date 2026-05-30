export type PaymentCurrency = 'EUR' | 'USD' | 'GBP';

export type CreatePaymentPayload = {
  expected_output_amount: number;
  fiat: PaymentCurrency;
  notes: string;
};

export type OrderResponse = {
  identifier: string;
  reference?: string;
  payment_uri?: string;
  web_url: string;
  address?: string;
  tag_memo?: string;
  fiat: string;
  notes?: string;
};

export type CurrencyOption = {
  label: string;
  value: PaymentCurrency;
  symbol: string;
};
