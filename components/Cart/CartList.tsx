"use client";

import { useEffect, useState } from "react";
import { createOrder } from "@/lib/api";
import { Product } from "@/types/products";

type CartItem = {
  product: Product;
  quantity: number;
};

export default function CartList() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id: string, amount: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + amount),
            }
          : item
      )
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmit = async () => {
    const items: { productId: string; quantity: number }[] = cart.map(
      (item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })
    );

    await createOrder({
      email: form.email,
      phone: form.phone,
      address: form.address,
      items,
    });

    alert("Order created!");
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div>
      <h1>Checkout</h1>

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
        </div>
      ))}

      <h2>Total: {total} $</h2>

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
      />

      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) =>
          setForm({ ...form, address: e.target.value })
        }
      />

      <button onClick={handleSubmit}>
        Submit order
      </button>
    </div>
  );
}