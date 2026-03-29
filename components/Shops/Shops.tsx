"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import ShopsList from "./ShopsList";
import ProductsList from "./ProductsList";

export default function Shops() {
  const [products, setProducts] = useState([]);
  const [activeShop, setActiveShop] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  // 🔹 унікальні магазини
  const shops = [
    ...new Map(products.map(p => [p.shopId._id, p.shopId])).values(),
  ];

  // 🔹 фільтр
  const filteredProducts = activeShop
    ? products.filter(p => p.shopId._id === activeShop)
    : products;

  return (
    <div className="layout">
      <ShopsList
        shops={shops}
        activeShop={activeShop}
        setActiveShop={setActiveShop}
      />

      <ProductsList products={filteredProducts} />
    </div>
  );
}