import "./Recomendaciones.css";

// Props:
//   products -> catálogo completo: [{ id, name, price, category }]
//   cart     -> productos en el carrito: [{ id, quantity, ... }]
//   orders   -> pedidos confirmados (historial): [{ items: [{ id, ... }] }]
//   onAdd    -> función que agrega un producto al carrito (la misma de ProductCard)
export default function Recomendaciones({ products = [], cart = [], orders = [], onAdd }) {
  const categoriaDe = (id) => products.find((p) => p.id === id)?.category;

  // Puntos por categoría: lo que está en el carrito pesa más que lo ya comprado.
  const puntos = {};
  const sumar = (id, peso) => {
    const cat = categoriaDe(id);
    if (cat) puntos[cat] = (puntos[cat] || 0) + peso;
  };
  cart.forEach((item) => sumar(item.id, 2));
  orders.forEach((pedido) => (pedido.items || []).forEach((item) => sumar(item.id, 1)));

  const enCarrito = new Set(cart.map((item) => item.id));
  const hayHistorial = Object.keys(puntos).length > 0;

  const recomendados = products
    .filter((p) => !enCarrito.has(p.id))
    .sort((a, b) => (puntos[b.category] || 0) - (puntos[a.category] || 0))
    .slice(0, 4);

  if (recomendados.length === 0) return null;

  return (
    <section className="recomendaciones">
      <h2>{hayHistorial ? "Recomendados para ti" : "Para empezar"}</h2>
      <p className="recomendaciones-nota">
        {hayHistorial
          ? "Productos de las categorías que más has elegido."
          : "Agrega productos al carrito y te mostraremos recomendaciones según tus compras."}
      </p>
      <ul>
        {recomendados.map((p) => (
          <li key={p.id}>
            <div>
              <strong>{p.name}</strong>
              <span>${Number(p.price).toFixed(2)}</span>
            </div>
            <button type="button" onClick={() => onAdd(p)}>
              Agregar al carrito
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
