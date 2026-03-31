"use client";

import { useState } from "react";
import { CreateOrder } from "@/types/order";
import css from "./Cart.module.css"

type Props = {
  items: { productId: string; quantity: number }[];
  onSubmitSuccess: () => void;
};

export default function OrderForm({ items, onSubmitSuccess }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const validateForm = () => {
    if (!form.email.includes("@")) return "Invalid email";
    if (form.phone.length < 5) return "Phone too short";
    if (!form.address) return "Address required";
    if (items.length === 0) return "Cart is empty";
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) return alert(error);

    const orderData: CreateOrder = {
      ...form,
      items,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      alert("Order created!");
      onSubmitSuccess();
      setForm({name: "", email: "", phone: "", address: "" });
    } else {
      const data = await res.json();
      alert("Error: " + data.error);
    }
  };

  return (
    <div className={css.form}>
        <input
        placeholder="Name"
        value={form.email}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <button className={css.orderBtn} onClick={handleSubmit}>Submit Order</button>
    </div>
  );
}