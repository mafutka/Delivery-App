import ShopCard from "./ShopCard"
import { ShopsListProps } from "@/types/shop"
import css from "./Shops.module.css"

export default function Shops({ shops, activeShop, setActiveShop }: ShopsListProps) {
    return (
        <div className="shops">
      {shops.map(shop => (
        <ShopCard
          key={shop._id}
          shop={shop}
          active={activeShop === shop._id}
          onClick={() => setActiveShop(shop._id)}
        />
      ))}
    </div>
    )
}