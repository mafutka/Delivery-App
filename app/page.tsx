import Shops from "@/components/Shops/Shops"
import css from "./page.module.css"
import ProductsList from "@/components/Products/ProductList"

export default function Home() {
  return (
    <main className={css.main}>
      <Shops />
    </main>
  )
}
