import { ShopCardProps } from "../../types/shop"

export default function ShopCard({ shop, active, onClick }: ShopCardProps) {
  return (
    <div className={`shop ${active ? "active" : ""}`} onClick={onClick}>
         {shop.image && <img src={shop.image} alt={shop.name} />}
         <h3> {shop.name}</h3>
    </div>
  )
}
