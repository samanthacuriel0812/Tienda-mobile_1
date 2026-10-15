import { useState } from "react";

export default function Checkout({ total, onConfirmar }) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [pago, setPago] = useState("Tarjeta");

  const enviar = (e) => {
    e.preventDefault();
    onConfirmar({ nombre, direccion, pago });
    setNombre("");
    setDireccion("");
  };

  return (
    <form onSubmit={enviar}>
      <h2>Checkout</h2>
      <input
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        placeholder="Dirección de entrega"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        required
      />
      <select value={pago} onChange={(e) => setPago(e.target.value)}>
        <option>Tarjeta</option>
        <option>Efectivo contra entrega</option>
        <option>Transferencia</option>
      </select>
      <p>Total a pagar: ${total}</p>
      <button type="submit">Confirmar pedido</button>
    </form>
  );
}
