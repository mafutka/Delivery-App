import CartList from "@/components/Cart/CartList";
import css from "./page.module.css";

export default function CartPage() {
  return (
    <div className={css.container}>
      <h1>ShopCart</h1>
      <CartList />
    </div>
  );
}