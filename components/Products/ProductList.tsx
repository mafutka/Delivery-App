export default function ProductsList({ products }) {
  return (
    <div className="products">
      {products.map(p => (
        <div key={p._id} className="card">
          <h3>{p.name}</h3>
          <p>{p.price} $</p>
        </div>
      ))}
    </div>
  );
}