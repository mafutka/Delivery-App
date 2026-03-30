import { Product } from "@/types/products";
import ProductCard from "./ProductCard";

import css from "./Products.module.css"


type Props = {
  products: Product[];
  addToCart: (product: Product) => void;
};

export default function Products({ products, addToCart }: Props) {
  return (
    <div className={css.productList}>
      {products.map(p => (
      <ProductCard 
      key={p._id} 
      product={p}
      addToCart={addToCart}
       />
      ))}
    </div>
  );
}