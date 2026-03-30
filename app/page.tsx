"use client"

import { useEffect, useState } from "react"
import { getProducts } from "@/lib/api"
import { Product } from "@/types/products"
import { Shop } from "@/types/shop"
import { CartItem } from "@/types/order"
import Link from "next/link"
import toast from "react-hot-toast"
import css from "./page.module.css"

import ShopsList from "@/components/Shops/ShopList"
import Products from "@/components/Products/Products"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeShop, setActiveShop] = useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<string>("")

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return []
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const shops: Shop[] = [
    ...new Map(products.map((p) => [p.shopId._id, p.shopId])).values(),
  ]

  const categories = [...new Set(products.map((p) => p.category))]

  let filteredProducts = activeShop
    ? products.filter((p) => p.shopId._id === activeShop)
    : products

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      selectedCategories.includes(p.category),
    )
  }

  if (sortOption === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  }

  if (sortOption === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  }

  if (sortOption === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name),
    )
  }

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id)

      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...prev, { product, quantity: 1 }]
    })
    toast.success(`${product.name} added`, {
      duration: 2000,
    })
  }

  return (
    <main className={css.main}>
      <div className={css.filters}>
         <div className={css.checkboxCont}>
          <h3>Categories:</h3>
          <div className={css.checkbox}>
          {categories.map((cat) => (
            <label className={css.categoryLabel} key={cat}>
              <input className={css.categoryInput}
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() =>
                  setSelectedCategories((prev) =>
                    prev.includes(cat)
                      ? prev.filter((c) => c !== cat)
                      : [...prev, cat],
                  )
                }
              />
              {cat}
            </label>
          ))}
          </div>
        </div>
        <div className={css.rightWrapper}>
          <button className={css.allBtn} onClick={() => setActiveShop(null)}>Show All Products</button>
        <div className={css.selectWrapper}>
          
       <select className={css.select} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Default</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="name">A-Z</option>
        </select>
        </div>
         </div>
      </div>
      <div className={css.maincontent}>
        <ShopsList
          shops={shops}
          activeShop={activeShop}
          setActiveShop={setActiveShop}
        />
        <Products products={filteredProducts} addToCart={addToCart} />
      </div>
      <div >
        <Link href="/cart">
          <button className={css.goBtn}>Go to cart ({cart.length})</button>
        </Link>
      </div>
    </main>
  )
}
