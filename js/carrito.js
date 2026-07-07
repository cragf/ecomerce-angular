// carrito.js

import { formatearPrecio, generarNumeroOrden } from "./utilidades.js";

class Carrito {
  constructor() {
    const guardado = localStorage.getItem("carrito");
    this.items = guardado ? JSON.parse(guardado) : [];
  }

  agregar(producto) {
    const existente = this.items.find((item) => item.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      this.items.push({ ...producto, cantidad: 1 });
    }
    this.guardar();
  }

  eliminar(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.guardar();
  }

  vaciar() {
    this.items = [];
    this.guardar();
  }

  calcularTotal() {
    return this.items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  }

  contarItems() {
    return this.items.reduce((suma, item) => suma + item.cantidad, 0);
  }

  guardar() {
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }
}

const carrito = new Carrito();

function agregarAlCarrito(producto) {
  carrito.agregar(producto);
  actualizarContadorHeader();
  parpadearContador();
  mostrarToast(`✅ ${producto.nombre} agregado al carrito`);
}

function actualizarContadorHeader() {
  const enlaceCarrito = document.querySelector('a[href="carrito.html"] span');
  if (enlaceCarrito) {
    enlaceCarrito.textContent = carrito.contarItems();
  }
}

function parpadearContador() {
  const enlaceCarrito = document.querySelector('a[href="carrito.html"]');
  if (!enlaceCarrito) return;
  enlaceCarrito.classList.add("parpadeo");
  setTimeout(() => enlaceCarrito.classList.remove("parpadeo"), 1000);
}

function mostrarToast(mensaje) {
  // Crear toast temporal
  const toast = document.createElement("div");
  toast.textContent = mensaje;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--color-secundario, #066847);
    color: #fff;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    z-index: 9999;
    font-weight: 600;
    animation: fade-in-pagina 0.3s ease;
    max-width: 350px;
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
    setTimeout(() => toast.remove(), 500);
  }, 2500);
}

function renderizarCarrito() {
  const tbody = document.querySelector("table tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (carrito.items.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");
    celda.setAttribute("colspan", "6");
    celda.textContent = "Tu carrito está vacío.";
    celda.style.textAlign = "center";
    celda.style.padding = "40px 20px";
    celda.style.color = "var(--color-texto-suave)";
    fila.appendChild(celda);
    tbody.appendChild(fila);

    // Ocultar el pie de tabla cuando está vacío
    const tfoot = document.querySelector("tfoot");
    if (tfoot) tfoot.style.display = "none";
    return;
  }

  // Mostrar tfoot
  const tfoot = document.querySelector("tfoot");
  if (tfoot) tfoot.style.display = "";

  carrito.items.forEach((item) => {
    const fila = document.createElement("tr");

    // Crear celdas con textContent para seguridad
    const tdNombre = document.createElement("td");
    tdNombre.textContent = item.nombre;

    const tdPrecio = document.createElement("td");
    tdPrecio.textContent = formatearPrecio(item.precio);

    const tdCantidad = document.createElement("td");
    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.value = item.cantidad;
    inputCantidad.min = 1;
    inputCantidad.max = 99;
    inputCantidad.style.width = "60px";
    inputCantidad.style.padding = "4px 8px";
    inputCantidad.style.borderRadius = "4px";
    inputCantidad.style.border = "1px solid var(--color-borde)";
    inputCantidad.style.background = "var(--color-fondo)";
    inputCantidad.style.color = "var(--color-texto)";
    inputCantidad.addEventListener("change", () => {
      const nuevaCantidad = parseInt(inputCantidad.value) || 1;
      if (nuevaCantidad > 0) {
        item.cantidad = nuevaCantidad;
        carrito.guardar();
        renderizarCarrito();
        actualizarContadorHeader();
      } else {
        inputCantidad.value = item.cantidad;
      }
    });
    tdCantidad.appendChild(inputCantidad);

    const tdDescuento = document.createElement("td");
    tdDescuento.textContent = "—";

    const tdSubtotal = document.createElement("td");
    tdSubtotal.textContent = formatearPrecio(item.precio * item.cantidad);

    const tdAcciones = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    btnEliminar.dataset.eliminar = item.id;
    btnEliminar.textContent = "🗑 Eliminar";
    btnEliminar.style.fontSize = "0.8rem";
    btnEliminar.style.padding = "4px 12px";
    tdAcciones.appendChild(btnEliminar);

    fila.appendChild(tdNombre);
    fila.appendChild(tdPrecio);
    fila.appendChild(tdCantidad);
    fila.appendChild(tdDescuento);
    fila.appendChild(tdSubtotal);
    fila.appendChild(tdAcciones);

    tbody.appendChild(fila);
  });

  // Actualiza el total en el tfoot
  const totalCeldas = document.querySelectorAll("tfoot tr td strong");
  if (totalCeldas.length > 0) {
    totalCeldas[0].textContent = formatearPrecio(carrito.calcularTotal());
  }

  // Conecta botones eliminar
  tbody.querySelectorAll("button[data-eliminar]").forEach((btn) => {
    btn.addEventListener("click", () => {
      carrito.eliminar(Number(btn.dataset.eliminar));
      renderizarCarrito();
      actualizarContadorHeader();
      mostrarToast("🗑 Producto eliminado del carrito");
    });
  });
}

function inicializarCarrito() {
  actualizarContadorHeader();

  // Solo en carrito.html
  if (document.querySelector("table tbody")) {
    renderizarCarrito();

    // Botón vaciar
    const btnVaciar = document.querySelector('button[aria-label="Vaciar carrito completo"]');
    if (btnVaciar) {
      btnVaciar.addEventListener("click", () => {
        if (carrito.items.length === 0) {
          mostrarToast("El carrito ya está vacío", true);
          return;
        }
        if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
          carrito.vaciar();
          renderizarCarrito();
          actualizarContadorHeader();
          mostrarToast("🗑 Carrito vaciado");
        }
      });
    }

    // Botón proceder al pago
    const btnPagar = document.querySelector('a[aria-label="Proceder al pago"]');
    if (btnPagar) {
      btnPagar.addEventListener("click", (e) => {
        e.preventDefault();
        if (carrito.items.length === 0) {
          mostrarToast("❌ Tu carrito está vacío", true);
          return;
        }
        const orden = generarNumeroOrden();
        const total = formatearPrecio(carrito.calcularTotal());
        alert(
          `✅ ¡Compra realizada exitosamente!\n\n` +
          `📦 Número de orden: ${orden}\n` +
          `💰 Total pagado: ${total}\n\n` +
          `📧 Te enviaremos un correo con los detalles de tu pedido.`
        );
        carrito.vaciar();
        renderizarCarrito();
        actualizarContadorHeader();
        mostrarToast("🎉 ¡Gracias por tu compra!");
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", inicializarCarrito);

export { Carrito, carrito, agregarAlCarrito, actualizarContadorHeader };