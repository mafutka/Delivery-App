import css from "./Header.module.css"
import Link from "next/link";

export default function Header() {
    return (
          <div className={css.container}>
        <nav className={css.navigation}>
            <Link href="/">Shop</Link>
            <Link href="/cart">Shopping Cart</Link>
        </nav>
        </div>
    )
}