"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/products";
import { Shop } from "@/types/shop";
import { CartItem } from "@/types/order";

import ShopsList from "@/components/Shops/ShopList";
import Products from "@/components/Products/Products";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeShop, setActiveShop] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("");

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const shops: Shop[] = [
    ...new Map(products.map((p) => [p.shopId._id, p.shopId])).values(),
  ];

  const categories = [...new Set(products.map((p) => p.category))];

  let filteredProducts = activeShop
    ? products.filter((p) => p.shopId._id === activeShop)
    : products;

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      selectedCategories.includes(p.category)
    );
  }

  if (sortOption === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sortOption === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  if (sortOption === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  return (
    <main>
      <ShopsList
        shops={shops}
        activeShop={activeShop}
        setActiveShop={setActiveShop}
      />

      <button onClick={() => setActiveShop(null)}>
        Show All Products
      </button>

      <div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setSelectedCategories((prev) =>
                prev.includes(cat)
                  ? prev.filter((c) => c !== cat)
                  : [...prev, cat]
              )
            }
          >
            {cat}
          </button>
        ))}
      </div>

      <select onChange={(e) => setSortOption(e.target.value)}>
        <option value="">Default</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="name">A-Z</option>
      </select>

      <Products 
        products={filteredProducts}
        addToCart={addToCart}
      />
    </main>
  );
}