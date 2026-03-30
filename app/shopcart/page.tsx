import CartList from "@/components/Cart/CartList"
import css from "./page.module.css"

export default function CartPage() {
    return (
        <div className={css.container}>
            <p>ShopCart</p>
            <CartList/>
        </div>
    )
}