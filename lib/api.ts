import { Product } from "@/types/products";
import { Shop } from "@/types/shop";
import { CreateOrder } from "@/types/order";

const BASE_URL = "http://localhost:3000"; 

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};
export const getShops = async (): Promise<Shop[]> => {
  const res = await fetch(`${BASE_URL}/shops`, {
    cache: "no-store",
  });

  return res.json();
};

export const createOrder = async (orderData: CreateOrder) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  return res.json();
};