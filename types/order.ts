import { Product } from "./products";


export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderItem = {
  productId: string;
  quantity: number;
};

export type CreateOrder = {
  name: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
};