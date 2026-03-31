"use client";

import { useState } from "react";
import { CreateOrder } from "@/types/order";
import { createOrder } from "@/lib/api";
import { orderSchema } from "@/lib/validation/orderSchema";
import { ValidationError } from "yup";
import css from "./Cart.module.css";

type Props = {
  items: { productId: string; quantity: number }[];
  onSubmitSuccess: () => void;
};

export default function OrderForm({ items, onSubmitSuccess }: Props) {
  const [form, setForm] = useState<CreateOrder>({
    name: "",
    email: "",
    phone: "",
    address: "",
    items: [],
  });

const handleSubmit = async () => {
  console.log("CLICKED");

  try {
    await orderSchema.validate(form, { abortEarly: false });
    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderData: CreateOrder = {
      ...form,
      items,
    };

    console.log("SENDING:", orderData);

    const data = await createOrder(orderData);

    console.log("RESPONSE:", data);

    alert("Order created!");

    onSubmitSuccess();

    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      items: [],
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      const messages = err.inner.map((e) => e.message).join("\n");
      alert(messages);
    } else if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("Unknown error");
    }
  }
};

  return (
    <div className={css.form}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, email: e.target.value }))
        }
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, phone: e.target.value }))
        }
      />

      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, address: e.target.value }))
        }
      />

      <button className={css.orderBtn} onClick={handleSubmit}>
        Submit Order
      </button>
    </div>
  );
}