import Shops from "@/components/Shops/Shops"
import css from "./page.module.css"

export default function Home() {
  return (
    <main className={css.main}>
      <Shops />
    </main>
  )
}
