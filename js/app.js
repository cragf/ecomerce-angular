// app.js

import { actualizarContadorHeader } from "./carrito.js";

document.addEventListener("DOMContentLoaded", () => {
  // Actualiza el contador del carrito en el header al cargar cualquier página
  actualizarContadorHeader();

  // Abre el modal de bienvenida automáticamente en index.html
  const modal = document.getElementById("modal-bienvenida");
  if (modal) {
    setTimeout(() => modal.showModal(), 1500);
  }

  // Cierra el modal con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.open) {
      modal.close();
    }
  });

  console.log("🛒 TechStore RD — App inicializada correctamente");
});