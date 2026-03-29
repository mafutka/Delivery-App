import { Product } from "@/types/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>{product.price} $</p>
    </div>
  );
}