export type Shop = {
  _id: string
  name: string
  rating: number
}

export type ShopCardProps = {
  shop: Shop
  active: boolean
  onClick: () => void
}
