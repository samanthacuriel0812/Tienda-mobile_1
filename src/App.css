import { useState } from "react";
import ProductCard from "./components/ProductCard";
import "./App.css";

const productos = [
  { id: 1, nombre: "Playera", precio: 250 },
  { id: 2, nombre: "Gorra", precio: 180 },
  { id: 3, nombre: "Tenis", precio: 900 },
];

export default function App() {
  const [carrito, setCarrito] = useState([]);

  const agregar = (p) => setCarrito([...carrito, p]);
  const quitar = (indice) => setCarrito(carrito.filter((_, i) => i !== indice));
  const total = carrito.reduce((suma, p) => suma + p.precio, 0);

  return (
    <div>
      <h1>TIENDA MOBILE</h1>

      <h2>Catálogo</h2>
      {productos.map((p) => (
        <ProductCard key={p.id} producto={p} onAgregar={agregar} />
      ))}

      <h2>Carrito ({carrito.length})</h2>
      {carrito.map((p, i) => (
        <p key={i}>
          {p.nombre} - ${p.precio}{" "}
          <button onClick={() => quitar(i)}>Quitar</button>
        </p>
      ))}
      <h3>Total: ${total}</h3>
    </div>
  );
}
