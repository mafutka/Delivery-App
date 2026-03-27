import {ShopCardProps} from "../../types/shop"

export default function ShopCard({shop, active, onClick}: ShopCardProps) {
    return (
        <div 
        className={`shop ${active ? "active" : ""}`}
        onClick={onClick}>
            {shop.name}
        </div>
    )
}