"use client"

import { useEffect, useState } from "react"
import { getProducts } from "@/lib/api"
import { Product } from "@/types/products"
import { Shop } from "@/types/shop"
import ShopsList from "./ShopList"
import ProductsList from "../Products/ProductList"
import css from "./Shops.module.css"

export default function Shops() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeShop, setActiveShop] = useState<string | null>(null)
  const [cart, setCart] = useState<Product[]>([])

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product])
  }

  useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts()
      setProducts(data)
    }

    fetchData()
  }, [])

  const shops: Shop[] = [
    ...new Map(products.map((p) => [p.shopId._id, p.shopId])).values(),
  ]

  const filteredProducts = activeShop
    ? products.filter((p) => p.shopId._id === activeShop)
    : products

  return (
    <div className={css.layout}>
      <ShopsList
        shops={shops}
        activeShop={activeShop}
        setActiveShop={setActiveShop}
      />

      <ProductsList 
      products={filteredProducts}
      addToCart={addToCart}  />
    </div>
  )
}
