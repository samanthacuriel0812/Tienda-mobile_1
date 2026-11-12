import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import "./App.css";

const productos = [
  { id: 1, nombre: "Playera", precio: 250 },
  { id: 2, nombre: "Gorra", precio: 180 },
  { id: 3, nombre: "Tenis", precio: 900 },
];

export default function App() {
  const [carrito, setCarrito] = useState(
    () => JSON.parse(localStorage.getItem("carrito")) || []
  );

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregar = (p) => {
    const existe = carrito.find((item) => item.id === p.id);
    setCarrito(
      existe
        ? carrito.map((item) =>
            item.id === p.id ? { ...item, cantidad: item.cantidad + 1 } : item
          )
        : [...carrito, { ...p, cantidad: 1 }]
    );
  };

  const cambiarCantidad = (id, cambio) =>
    setCarrito(
      carrito
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + cambio } : item
        )
        .filter((item) => item.cantidad > 0)
    );

  const quitar = (id) => setCarrito(carrito.filter((item) => item.id !== id));

  const total = carrito.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
  const totalArticulos = carrito.reduce((suma, p) => suma + p.cantidad, 0);

  return (
    <div>
      <h1>TIENDA MOBILE</h1>

      <h2>Catálogo</h2>
      {productos.map((p) => (
        <ProductCard key={p.id} producto={p} onAgregar={agregar} />
      ))}

      <h2>Carrito ({totalArticulos})</h2>
      {carrito.length === 0 && <p>Tu carrito está vacío.</p>}
      {carrito.map((p) => (
        <p key={p.id}>
          {p.nombre} - ${p.precio} x {p.cantidad}{" "}
          <button onClick={() => cambiarCantidad(p.id, -1)}>-</button>
          <button onClick={() => cambiarCantidad(p.id, 1)}>+</button>
          <button onClick={() => quitar(p.id)}>Quitar</button>
        </p>
      ))}
      <h3>Total: ${total}</h3>
    </div>
  );
}
