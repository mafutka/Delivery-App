export type Shop = {
  _id: string
  name: string
  rating: number
  image?: string;
}

export type ShopCardProps = {
  shop: Shop
  active: boolean
  onClick: () => void
}

export type ShopsListProps = {
  shops: Shop[];
  activeShop: string | null;
  setActiveShop: (id: string) => void;
};