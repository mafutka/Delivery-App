import css from "./Header.module.css"
import Link from "next/link";

export default function Header() {
    return (
          <div className={css.container}>
        <nav>
            <Link href="/cart">Cart</Link>
        </nav>
        </div>
    )
}