export type PaymentMethod = 'cash' | 'card';

export interface CreateOrderPayload {
  address: string;
  note?: string;
  payment_method: PaymentMethod;
}

export interface Order {
  id: number;
  total: string;
  status: string;
  created_at: string;
}
