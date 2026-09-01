export type PaymentMethod = 'CARD' | 'CASH';

export interface CreateOrderPayload {
  address: string;
  phone: string;
  note?: string;
  paymentMethod: PaymentMethod;
}

export interface Order {
  id: number;
  total: string;
  status: string;
  created_at: string;
}

export interface OrderProductCategory {
  id: number;
  name: string;
  img_url: string;
  description: string;
  created_at: string;
}
 
export interface OrderProduct {
  id: number;
  title: string;
  img_url: string;
  description: string;
  price: string;
  type: string;
  created_at: string;
  category: OrderProductCategory;
}
 
export interface OrderItem {
  id: number;
  quantity: number;
  total_price: string;
  product: OrderProduct;
}
 
export interface OrderHistoryItem {
  id: number;
  orderNumber: string;
  total: string;
  deliveryFee: string;
  paymentMethod: string;
  status: string;
  note: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export type OrderDetail = OrderHistoryItem;
