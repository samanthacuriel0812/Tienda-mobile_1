import { useState } from "react";

export default function Login({ onEntrar }) {
  const [correo, setCorreo] = useState("");
  const [escaneando, setEscaneando] = useState(false);
  const [error, setError] = useState("");

  const verificar = (e) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(correo.trim())) {
      setError("Escribe un correo válido, por ejemplo nombre@correo.com.");
      return; // si hay error, no deja entrar
    }

    setError("");
    setEscaneando(true);
    setTimeout(() => {
      setEscaneando(false);
      onEntrar(correo.trim());
    }, 1500);
  };

  return (
    <form onSubmit={verificar} noValidate>
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      {error && <small style={{ color: "red" }}>{error}</small>}
      <button type="submit" disabled={escaneando}>
        {escaneando ? "Verificando huella..." : "Entrar con huella digital"}
      </button>
      <p>Autenticación biométrica simulada.</p>
    </form>
  );
}
