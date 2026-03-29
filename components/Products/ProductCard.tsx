import { Product } from "@/types/products";

type Props = {
  product: Product;
  addToCart: (product: Product) => void;
};

export default function ProductCard({ product, addToCart }: Props) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>{product.price} $</p>
      <button onClick={() => addToCart(product)}>
        Add to cart
      </button>
    </div>
  );
}