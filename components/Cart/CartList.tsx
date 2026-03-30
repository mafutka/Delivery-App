"use client";

import { useEffect, useState } from "react";
import { CartItem } from "@/types/order";
import OrderForm from "./OrderForm";

export default function CartList() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id: string, amount: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product._id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleOrderSuccess = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div>
        <h1>Cart</h1>
        {cart.length === 0 && <p>Your cart is empty</p>}
        {cart.map((item) => (
          <div key={item.product._id}>
            <p>
              {item.product.name} - {item.product.price} $
            </p>
            <button onClick={() => updateQuantity(item.product._id, -1)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.product._id, 1)}>
              +
            </button>
            <button onClick={() => removeItem(item.product._id)}>Remove</button>
          </div>
        ))}
        <h2>Total: {total} $</h2>
      </div>

      <OrderForm
        items={cart.map((c) => ({ productId: c.product._id, quantity: c.quantity }))}
        onSubmitSuccess={handleOrderSuccess}
      />
    </div>
  );
}