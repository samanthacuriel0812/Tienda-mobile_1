import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Checkout from "./components/Checkout";
import Historial from "./components/Historial";
import "./App.css";

const productos = [
  { id: 1, nombre: "Playera", precio: 250, categoria: "Ropa" },
  { id: 2, nombre: "Gorra", precio: 180, categoria: "Accesorios" },
  { id: 3, nombre: "Tenis", precio: 900, categoria: "Calzado" },
  { id: 4, nombre: "Sudadera", precio: 450, categoria: "Ropa" },
  { id: 5, nombre: "Mochila", precio: 600, categoria: "Accesorios" },
];

const categorias = ["Todas", "Ropa", "Accesorios", "Calzado"];

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [categoria, setCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [pedidos, setPedidos] = useState([]);

  const agregar = (p) => setCarrito([...carrito, p]);
  const quitar = (indice) => setCarrito(carrito.filter((_, i) => i !== indice));
  const total = carrito.reduce((suma, p) => suma + p.precio, 0);

  const confirmarPedido = (datos) => {
    const nuevoPedido = {
      id: pedidos.length + 1,
      fecha: new Date().toLocaleString(),
      productos: carrito,
      total,
      direccion: datos.direccion,
      pago: datos.pago,
    };
    setPedidos([nuevoPedido, ...pedidos]);
    setMensaje(
      `¡Gracias, ${datos.nombre}! Tu pedido de $${total} se enviará a ${datos.direccion} (pago: ${datos.pago}).`
    );
    setCarrito([]);
  };

  const visibles = productos.filter(
    (p) =>
      (categoria === "Todas" || p.categoria === categoria) &&
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h1>TIENDA MOBILE</h1>

      <h2>Catálogo</h2>
      <input
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <div>
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => setCategoria(c)}
            style={{ fontWeight: c === categoria ? "bold" : "normal" }}
          >
            {c}
          </button>
        ))}
      </div>

      {visibles.map((p) => (
        <ProductCard key={p.id} producto={p} onAgregar={agregar} />
      ))}
      {visibles.length === 0 && <p>No hay productos con ese filtro.</p>}

      <h2>Carrito ({carrito.length})</h2>
      {carrito.map((p, i) => (
        <p key={i}>
          {p.nombre} - ${p.precio}{" "}
          <button onClick={() => quitar(i)}>Quitar</button>
        </p>
      ))}
      <h3>Total: ${total}</h3>

      {carrito.length > 0 && (
        <Checkout total={total} onConfirmar={confirmarPedido} />
      )}
      {mensaje && <p>{mensaje}</p>}

      <Historial pedidos={pedidos} />
    </div>
  );
}
