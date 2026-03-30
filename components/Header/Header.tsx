import css from "./Header.module.css"
import Link from "next/link";

export default function Header() {
    return (
          <div className={css.container}>
        <nav className={css.navigation}>
            <Link href="/cart">Cart</Link>
        </nav>
        </div>
    )
}