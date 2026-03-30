import { Product } from "@/types/products";
import css from "./ProductList.module.css"

type Props = {
  product: Product;
  addToCart: (product: Product) => void;
};

export default function ProductCard({ product, addToCart }: Props) {
  return (
    <div className={css.productCard}>
      <img className={css.image} src={product.image} alt={product.image} />
      <h3>{product.name}</h3>
      <p>Price: {product.price} $</p>
      <button onClick={() => addToCart(product)}>
        Add to cart
      </button>
    </div>
  );
}