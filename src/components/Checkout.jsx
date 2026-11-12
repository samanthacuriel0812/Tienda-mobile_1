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
  if (!validar()) return;        
  onConfirmar({ nombre, direccion, pago });
};
