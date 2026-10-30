export default function ProductCard({ producto, onAgregar }) {
  return (
    <div className="card">
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      <button onClick={() => onAgregar(producto)}>Agregar al carrito</button>
    </div>
  );
}
