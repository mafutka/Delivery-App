import { ShopCardProps } from "../../types/shop"
import css from "./Shops.module.css"

export default function ShopCard({ shop, active, onClick }: ShopCardProps) {
  return (
    <div className={`${css.cardContainer} shop ${active ? "active" : ""}`} onClick={onClick}>
      <h3> {shop.name}</h3>
      <div className={css.imgWrapper}>
         {shop.image && <img className={css.image} src={shop.image} alt={shop.name} />}
      </div>
    </div>
  )
}
