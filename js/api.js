// api.js

async function obtenerProductos() {
  try {
    // Primero revisar si ya están en localStorage (caché)
    const cached = localStorage.getItem("catalogo");
    if (cached) {
      const datos = JSON.parse(cached);
      if (datos.length > 0) {
        return datos;
      }
    }

    const respuesta = await fetch("data/productos.json");
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    // Guardar en localStorage para futuras visitas
    localStorage.setItem("catalogo", JSON.stringify(datos));
    return datos;
  } catch (error) {
    console.error("Error al obtener productos:", error);

    // Si falla, intentar usar caché aunque esté obsoleto
    const cached = localStorage.getItem("catalogo");
    if (cached) {
      const datos = JSON.parse(cached);
      if (datos.length > 0) {
        console.warn("Usando datos en caché (pueden estar desactualizados)");
        return datos;
      }
    }

    return [];
  } finally {
    console.log("Solicitud de productos finalizada.");
  }
}

export { obtenerProductos };