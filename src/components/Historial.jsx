export default function Historial({ pedidos }) {
  return (
    <div>
      <h2>Historial de pedidos ({pedidos.length})</h2>
      {pedidos.length === 0 && <p>Aún no has hecho pedidos.</p>}
      {pedidos.map((pedido) => (
        <div key={pedido.id} className="card">
          <h3>Pedido #{pedido.id}</h3>
          <p>Fecha: {pedido.fecha}</p>
          <p>Productos: {pedido.productos.map((p) => p.nombre).join(", ")}</p>
          <p>Entrega: {pedido.direccion}</p>
          <p>Pago: {pedido.pago}</p>
          <p>
            <strong>Total: ${pedido.total}</strong>
          </p>
        </div>
      ))}
    </div>
  );
}
