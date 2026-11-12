import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import Checkout from "./components/Checkout";
import Historial from "./components/Historial";
import Recomendaciones from "./components/Recomendaciones";
import Login from "./components/Login";
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
  const [usuario, setUsuario] = useState(null);
  // P1: el carrito y los pedidos se guardan en localStorage
  const [carrito, setCarrito] = useState(
    () => JSON.parse(localStorage.getItem("carrito")) || []
  );
  const [pedidos, setPedidos] = useState(
    () => JSON.parse(localStorage.getItem("pedidos")) || []
  );
  const [categoria, setCategoria] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }, [pedidos]);

  // P2: productos repetidos se agrupan con cantidad
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

  if (!usuario) {
    return (
      <div>
        <h1>TIENDA MOBILE</h1>
        <Login onEntrar={setUsuario} />
      </div>
    );
  }

  return (
    <div>
      <h1>TIENDA MOBILE</h1>
      <p>
        Hola, {usuario}{" "}
        <button onClick={() => setUsuario(null)}>Cerrar sesión</button>
      </p>

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

      <Recomendaciones
        productos={productos}
        carrito={carrito}
        pedidos={pedidos}
        onAgregar={agregar}
      />

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

      {carrito.length > 0 && (
        <Checkout total={total} onConfirmar={confirmarPedido} />
      )}
      {mensaje && <p>{mensaje}</p>}

      <Historial pedidos={pedidos} />
    </div>
  );
}
