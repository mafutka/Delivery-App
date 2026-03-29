import { Product } from "@/types/products";
import ProductCard from "./ProductCard";


type Props = {
  products: Product[];
  addToCart: (product: Product) => void;
};

export default function ProductsList({ products, addToCart }: Props) {
  return (
    <div className="products">
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