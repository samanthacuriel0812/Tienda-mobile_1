import "./Recomendaciones.css";

// Props:
//   productos -> catálogo completo: [{ id, nombre, precio, categoria }]
//   carrito   -> productos en el carrito (arreglo de productos)
//   pedidos   -> historial: [{ productos: [...] }]
//   onAgregar -> función que agrega un producto al carrito
export default function Recomendaciones({ productos = [], carrito = [], pedidos = [], onAgregar }) {
  // Puntos por categoría: lo del carrito pesa más que lo ya comprado.
  const puntos = {};
  const sumar = (p, peso) => {
    puntos[p.categoria] = (puntos[p.categoria] || 0) + peso;
  };
  carrito.forEach((p) => sumar(p, 2));
  pedidos.forEach((pedido) => pedido.productos.forEach((p) => sumar(p, 1)));

  const hayHistorial = Object.keys(puntos).length > 0;
  const enCarrito = new Set(carrito.map((p) => p.id));

  const recomendados = productos
    .filter((p) => !enCarrito.has(p.id))
    .sort((a, b) => (puntos[b.categoria] || 0) - (puntos[a.categoria] || 0))
    .slice(0, 3);

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
              <strong>{p.nombre}</strong>
              <span>${p.precio}</span>
            </div>
            <button type="button" onClick={() => onAgregar(p)}>
              Agregar al carrito
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
