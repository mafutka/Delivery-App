import { Product } from "@/types/products";
import { Shop } from "@/types/shop";

const BASE_URL = "http://localhost:3000"; 

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products`, {
    cache: "no-store",
  });

  return res.json();
};

export const getShops = async (): Promise<Shop[]> => {
  const res = await fetch(`${BASE_URL}/shops`, {
    cache: "no-store",
  });

  return res.json();
};