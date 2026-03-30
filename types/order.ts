import { Product } from "./products";

export type OrderItem = {
  product: Product;
  productId: string;
  quantity: number;
};

export type CreateOrder = {
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
};