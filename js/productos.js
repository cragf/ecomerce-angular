// productos.js

import { obtenerProductos } from "./api.js";
import { agregarAlCarrito } from "./carrito.js";

class Producto {
  constructor(id, nombre, precio, categoria, marca, stock, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.marca = marca;
    this.stock = stock || 0;
    this.imagen = imagen || "";
  }
}

let listaProductos = [];

// ============================================================
// FUNCIONES PARA INDEX Y PRODUCTOS.HTML
// ============================================================

function conectarBotones() {
  const botones = document.querySelectorAll("button[data-id]");
  botones.forEach((boton) => {
    boton.removeEventListener("click", manejarClick);
    boton.addEventListener("click", manejarClick);
  });
}

function manejarClick(evento) {
  const boton = evento.currentTarget;
  const id = Number(boton.dataset.id);
  const producto = listaProductos.find((p) => p.id === id);

  if (!producto) {
    console.warn(`Producto con ID ${id} no encontrado`);
    return;
  }

  if (producto.stock <= 0) {
    mostrarMensaje("❌ Producto agotado", true);
    return;
  }

  agregarAlCarrito(producto);
}

function mostrarMensaje(mensaje, esError) {
  const output = document.getElementById("resultado-formulario");
  if (output) {
    output.textContent = mensaje;
    output.style.color = esError ? "#EF4444" : "#10B981";
    setTimeout(() => {
      output.textContent = "";
    }, 3000);
  }
}

function inicializarBuscador() {
  const buscador = document.getElementById("buscar-producto");
  if (buscador) {
    buscador.addEventListener("input", (e) => {
      const termino = e.target.value.toLowerCase().trim();
      const articulos = document.querySelectorAll("section[aria-labelledby='titulo-listado'] article");

      articulos.forEach((articulo) => {
        const nombre = articulo.querySelector("h3")?.textContent?.toLowerCase() || "";
        const descripcion = articulo.querySelector("p")?.textContent?.toLowerCase() || "";
        const coincide = nombre.includes(termino) || descripcion.includes(termino);
        articulo.style.display = coincide || !termino ? "" : "none";
      });
    });
  }

  const buscadorHeader = document.querySelector('header input[type="search"]');
  if (buscadorHeader) {
    buscadorHeader.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const termino = buscadorHeader.value.trim();
        if (termino) {
          window.location.href = `productos.html?q=${encodeURIComponent(termino)}`;
        }
      }
    });
  }
}

// ============================================================
// FUNCIONES PARA PRODUCTO.HTML (DETALLE)
// ============================================================

function obtenerIdProducto() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

function renderizarProducto(producto) {
  if (!producto) {
    const article = document.querySelector("article");
    if (article) {
      article.innerHTML = `
        <h1>Producto no encontrado</h1>
        <p>Lo sentimos, el producto que buscas no existe.</p>
        <a href="productos.html">Volver al catálogo</a>
      `;
    }
    return;
  }

  // Solo ejecutar si estamos en producto.html (existen los elementos)
  if (!document.getElementById("nombre-producto")) return;

  document.title = `${producto.nombre} - Bucaneer`;
  const tituloPagina = document.getElementById("titulo-pagina");
  if (tituloPagina) tituloPagina.textContent = `${producto.nombre} - Bucaneer`;

  const breadcrumb = document.getElementById("breadcrumb-producto");
  if (breadcrumb) breadcrumb.textContent = producto.nombre;

  document.getElementById("nombre-producto").textContent = producto.nombre;
  document.getElementById("marca-producto").textContent = producto.marca || "Marca";
  document.getElementById("sku-producto").textContent = producto.sku || "SKU-0000";
  document.getElementById("sku-producto").value = producto.sku || "SKU-0000";
  document.getElementById("categoria-producto").textContent = producto.categoria || "Categoría";
  document.getElementById("categoria-producto").href = `productos.html?categoria=${encodeURIComponent(producto.categoria || "")}`;

  const estrellas = "⭐".repeat(Math.floor(producto.rating || 4)) + "☆".repeat(5 - Math.floor(producto.rating || 4));
  document.getElementById("rating-producto").innerHTML = `${estrellas} <a href="#resenas"><small>(${producto.resenas || 0} reseñas)</small></a>`;

  const imgPrincipal = document.getElementById("img-principal");
  if (imgPrincipal) {
    imgPrincipal.src = producto.imagen || "img/productos/default.jpg";
    imgPrincipal.alt = producto.nombre || "Producto";
  }
  document.getElementById("img-caption").textContent = producto.nombre || "Producto";

  const galeria = document.getElementById("galeria-miniaturas");
  if (galeria) {
    galeria.innerHTML = "";
    if (producto.miniaturas && producto.miniaturas.length > 0) {
      producto.miniaturas.forEach((mini) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = mini.src;
        img.alt = mini.alt || producto.nombre;
        img.width = 80;
        img.height = 60;
        img.loading = "lazy";
        figure.appendChild(img);
        figure.addEventListener("click", () => {
          if (imgPrincipal) {
            imgPrincipal.src = mini.src;
            imgPrincipal.alt = mini.alt || producto.nombre;
          }
          document.getElementById("img-caption").textContent = mini.alt || producto.nombre;
        });
        galeria.appendChild(figure);
      });
    }
  }

  document.getElementById("precio-producto").textContent = `RD$${producto.precio.toLocaleString("es-DO")}`;
  if (producto.precio_anterior) {
    document.getElementById("precio-anterior").textContent = `RD$${producto.precio_anterior.toLocaleString("es-DO")}`;
    document.getElementById("precio-anterior").style.display = "";
  } else {
    document.getElementById("precio-anterior").style.display = "none";
  }
  if (producto.oferta) {
    document.getElementById("oferta-producto").textContent = producto.oferta;
    document.getElementById("oferta-producto").style.display = "";
  } else {
    document.getElementById("oferta-producto").style.display = "none";
  }

  const stockEl = document.getElementById("stock-producto");
  if (producto.stock > 0) {
    stockEl.textContent = `✅ En stock (${producto.stock} unidades)`;
    stockEl.style.color = "var(--color-exito)";
    const btn = document.getElementById("btn-agregar-carrito");
    if (btn) btn.disabled = false;
  } else {
    stockEl.textContent = "❌ Agotado";
    stockEl.style.color = "var(--color-error)";
    const btn = document.getElementById("btn-agregar-carrito");
    if (btn) btn.disabled = true;
  }

  if (producto.beneficios) {
    producto.beneficios.forEach((beneficio, index) => {
      const el = document.getElementById(`beneficio${index + 1}`);
      if (el) el.textContent = beneficio;
    });
  }

  document.getElementById("descripcion-producto").innerHTML = producto.descripcion || "Descripción no disponible.";

  if (producto.blockquote) {
    document.getElementById("blockquote-texto").textContent = producto.blockquote.texto;
    document.getElementById("blockquote-cita").textContent = producto.blockquote.cita;
    document.getElementById("blockquote-producto").setAttribute("cite", producto.blockquote.cite || "");
    document.getElementById("blockquote-producto").style.display = "";
  } else {
    document.getElementById("blockquote-producto").style.display = "none";
  }

  const tbody = document.getElementById("tabla-body");
  if (tbody) {
    tbody.innerHTML = "";
    if (producto.especificaciones && producto.especificaciones.length > 0) {
      producto.especificaciones.forEach((spec) => {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.scope = "row";
        th.textContent = spec.caracteristica;
        const td = document.createElement("td");
        td.textContent = spec.valor;
        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
      });
    }
  }
  document.getElementById("tabla-caption").textContent = `Especificaciones técnicas — ${producto.nombre}`;

  document.getElementById("total-resenas").textContent = producto.resenas || 0;
  const contenedorResenas = document.getElementById("contenedor-resenas");
  if (contenedorResenas) {
    contenedorResenas.innerHTML = "";
    if (producto.resenas_lista && producto.resenas_lista.length > 0) {
      producto.resenas_lista.forEach((resena) => {
        const article = document.createElement("article");
        article.innerHTML = `
          <header>
            <h3>${resena.nombre}</h3>
            <p>${"⭐".repeat(resena.estrellas)}${"☆".repeat(5 - resena.estrellas)} — <time datetime="${resena.fecha}">${resena.fecha}</time></p>
          </header>
          <p>${resena.comentario}</p>
        `;
        contenedorResenas.appendChild(article);
      });
    }
  }

  const listaRelacionados = document.getElementById("lista-relacionados");
  if (listaRelacionados) {
    listaRelacionados.innerHTML = "";
    if (producto.relacionados && producto.relacionados.length > 0) {
      producto.relacionados.forEach((rel) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <article>
            <figure>
              <img src="${rel.imagen}" alt="${rel.nombre}" width="130" height="130" loading="lazy">
            </figure>
            <h3><a href="producto.html?id=${rel.id}">${rel.nombre}</a></h3>
            <p><strong>RD$${rel.precio.toLocaleString("es-DO")}</strong></p>
          </article>
        `;
        listaRelacionados.appendChild(li);
      });
    }
  }

  const btnAgregar = document.getElementById("btn-agregar-carrito");
  if (btnAgregar) {
    btnAgregar.addEventListener("click", () => {
      const cantidad = parseInt(document.getElementById("cantidad")?.value) || 1;
      const productoCarrito = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad,
        imagen: producto.imagen
      };
      agregarAlCarrito(productoCarrito);
    });
  }

  if (producto.video) {
    document.getElementById("video-mp4").src = producto.video.mp4 || "";
    document.getElementById("video-webm").src = producto.video.webm || "";
    document.getElementById("video-producto").poster = producto.video.poster || producto.imagen;
    document.getElementById("video-caption").textContent = producto.video.caption || "Video del producto";
    document.getElementById("video-descarga").href = producto.video.mp4 || "";
    document.getElementById("video-producto").style.display = "";
  } else {
    const videoEl = document.getElementById("video-producto");
    if (videoEl) videoEl.style.display = "none";
  }

  if (producto.audio) {
    document.getElementById("audio-mp3").src = producto.audio.mp3 || "";
    document.getElementById("audio-ogg").src = producto.audio.ogg || "";
    document.getElementById("audio-caption").textContent = producto.audio.caption || "Audio promocional";
    document.getElementById("audio-descarga").href = producto.audio.mp3 || "";
    document.getElementById("audio-producto").style.display = "";
  } else {
    const audioEl = document.getElementById("audio-producto");
    if (audioEl) audioEl.style.display = "none";
  }
}

// ============================================================
// INICIALIZACIÓN
// ============================================================

async function inicializarProductos() {
  listaProductos = await obtenerProductos();

  if (listaProductos.length === 0) {
    console.warn("⚠️ No se pudieron cargar productos");
    return;
  }

  console.log(`✅ ${listaProductos.length} productos cargados correctamente`);

  // Verificar si estamos en producto.html (detalle)
  const esDetalle = document.getElementById("nombre-producto") !== null;

  if (esDetalle) {
    // Modo detalle: mostrar un producto específico
    const id = obtenerIdProducto();
    if (!id) {
      const article = document.querySelector("article");
      if (article) {
        article.innerHTML = `
          <h1>Producto no especificado</h1>
          <p>Por favor, selecciona un producto del catálogo.</p>
          <a href="productos.html">Volver al catálogo</a>
        `;
      }
      return;
    }
    const producto = listaProductos.find((p) => p.id === id);
    renderizarProducto(producto);
  } else {
    // Modo catálogo: conectar botones y buscador
    conectarBotones();
    inicializarBuscador();

    // Si hay parámetro de búsqueda en la URL, aplicarlo
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      const buscador = document.getElementById("buscar-producto");
      if (buscador) {
        buscador.value = q;
        buscador.dispatchEvent(new Event("input"));
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", inicializarProductos);

export { Producto, listaProductos };