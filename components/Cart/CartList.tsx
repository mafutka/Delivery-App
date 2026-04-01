"use client";

import { useEffect, useState } from "react";
import { CartItem } from "@/types/order";
import OrderForm from "./OrderForm";

import css from "./Cart.module.css"

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
    <div className={css.listContainer}>
      <div className={css.orderform}>
       <OrderForm
        items={cart.map((c) => ({ productId: c.product._id, quantity: c.quantity }))}
        onSubmitSuccess={handleOrderSuccess}
      />
      </div>
      <div className={css.cartContainer}>
        <h2>Shopping Cart</h2>
        {cart.length === 0 && <p>Your cart is empty</p>}
        {cart.map((item) => (
          <div key={item.product._id}>
            <p>
              {item.product.name} - {item.product.price} $
            </p>
            <div className={css.addItemsBtns}>
              <div className={css.quantityItems}>
            <button onClick={() => updateQuantity(item.product._id, -1)}>
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.product._id, 1)}>
              +
            </button>
            </div>
            <button onClick={() => removeItem(item.product._id)}>Remove</button>
            </div>
          </div>
        ))}
        <h3 className={css.total}>Total: {total} $</h3>
      </div>
    </div>
  );
}