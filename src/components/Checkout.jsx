import { useState } from "react";

export default function Checkout({ total, onConfirmar }) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [pago, setPago] = useState("");
  const [errores, setErrores] = useState({});

  const validar = () => {
    const e = {};
    if (nombre.trim().length < 3) e.nombre = "Escribe tu nombre completo.";
    if (direccion.trim().length < 10) e.direccion = "Escribe tu dirección completa.";
    if (!pago) e.pago = "Elige un método de pago.";
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const enviar = () => {
    if (!validar()) return; // si hay errores, no confirma el pedido
    onConfirmar({ nombre: nombre.trim(), direccion: direccion.trim(), pago });
    setNombre("");
    setDireccion("");
    setPago("");
  };

  return (
    <div>
      <h2>Finalizar compra</h2>
      <p>Total a pagar: ${total}</p>

      <input
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      {errores.nombre && <small style={{ color: "red" }}>{errores.nombre}</small>}

      <input
        placeholder="Dirección de entrega"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
      />
      {errores.direccion && <small style={{ color: "red" }}>{errores.direccion}</small>}

      <select value={pago} onChange={(e) => setPago(e.target.value)}>
        <option value="">Método de pago</option>
        <option value="Tarjeta">Tarjeta</option>
        <option value="Efectivo">Efectivo</option>
        <option value="Transferencia">Transferencia</option>
      </select>
      {errores.pago && <small style={{ color: "red" }}>{errores.pago}</small>}

      <button onClick={enviar}>Confirmar pedido</button>
    </div>
  );
}
