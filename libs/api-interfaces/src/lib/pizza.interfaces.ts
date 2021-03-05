import { PaymentType } from './payment-type.enum';

export interface Pizza {
  id: number;
  name: string;
  price: number;
  imageUrl: string; // for example: '/api/pizza/images/1.jpg'
  description: string;
}

export interface Order {
  id: number;
  address: string;
  paymentType: PaymentType;
  pizzas: Pizza[];
}
