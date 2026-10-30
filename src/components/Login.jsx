import { useState } from "react";

export default function Login({ onEntrar }) {
  const [correo, setCorreo] = useState("");
  const [escaneando, setEscaneando] = useState(false);

  const verificar = (e) => {
    e.preventDefault();
    setEscaneando(true);
    setTimeout(() => {
      setEscaneando(false);
      onEntrar(correo);
    }, 1500);
  };

  return (
    <form onSubmit={verificar}>
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />
      <button type="submit" disabled={escaneando}>
        {escaneando ? "Verificando huella..." : "Entrar con huella digital"}
      </button>
      <p>Autenticación biométrica simulada.</p>
    </form>
  );
}
