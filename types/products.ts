import { Shop } from "./shop";

export type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  shopId: Shop;
  image: string;
};