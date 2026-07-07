// utilidades.js

function formatearPrecio(valor) {
  return "RD$" + valor.toLocaleString("es-DO");
}

function generarNumeroOrden() {
  const numero = Math.floor(Math.random() * 9000) + 1000;
  return `ORD-${numero}`;
}

export { formatearPrecio, generarNumeroOrden };