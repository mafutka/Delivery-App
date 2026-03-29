export type OrderItem = {
  productId: string;
  quantity: number;
};

export type CreateOrder = {
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
};