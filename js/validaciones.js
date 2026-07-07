// validaciones.js

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telefonoRegex = /^[\+]?[0-9\s\-]{8,15}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

function mostrarResultado(mensaje, esError) {
  const output = document.getElementById("resultado-formulario");
  if (!output) return;

  output.textContent = mensaje;
  output.style.color = esError ? "#EF4444" : "#10B981";
  output.style.padding = "12px";
  output.style.borderRadius = "8px";
  output.style.background = esError ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)";
  output.style.border = esError ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(16, 185, 129, 0.3)";

  // Auto-limpiar después de 5 segundos
  if (mensaje) {
    setTimeout(() => {
      output.textContent = "";
      output.style.padding = "0";
      output.style.background = "transparent";
      output.style.border = "none";
    }, 5000);
  }
}

function validarFormulario(evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const telefono = document.getElementById("telefono");
  const contrasena = document.getElementById("contrasena");
  const mensaje = document.getElementById("mensaje");
  const terminos = document.querySelector('input[name="terminos"]');

  const errores = [];

  // Validar nombre
  if (!nombre || nombre.value.trim().length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
    if (nombre) nombre.style.borderColor = "#EF4444";
  } else if (nombre) {
    nombre.style.borderColor = "";
  }

  // Validar email
  if (!email || !emailRegex.test(email.value)) {
    errores.push("El correo electrónico no es válido.");
    if (email) email.style.borderColor = "#EF4444";
  } else if (email) {
    email.style.borderColor = "";
  }

  // Validar teléfono
  if (!telefono || !telefonoRegex.test(telefono.value)) {
    errores.push("El teléfono no es válido. Formato: +809 000 0000");
    if (telefono) telefono.style.borderColor = "#EF4444";
  } else if (telefono) {
    telefono.style.borderColor = "";
  }

  // Validar contraseña (si se ingresó)
  if (contrasena && contrasena.value.length > 0) {
    if (!passwordRegex.test(contrasena.value)) {
      errores.push("La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.");
      contrasena.style.borderColor = "#EF4444";
    } else {
      contrasena.style.borderColor = "";
    }
  }

  // Validar mensaje
  if (!mensaje || mensaje.value.trim().length < 20) {
    errores.push("El mensaje debe tener al menos 20 caracteres.");
    if (mensaje) mensaje.style.borderColor = "#EF4444";
  } else if (mensaje) {
    mensaje.style.borderColor = "";
  }

  // Validar términos
  if (terminos && !terminos.checked) {
    errores.push("Debes aceptar los términos y condiciones.");
  }

  if (errores.length > 0) {
    mostrarResultado("❌ " + errores.join(" | "), true);
    // Scroll al primer error
    const firstError = document.querySelector(
      'input[style*="border-color: #EF4444"], textarea[style*="border-color: #EF4444"]'
    );
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      firstError.focus();
    }
    return;
  }

  mostrarResultado("✅ ¡Mensaje enviado correctamente! Te responderemos en menos de 24 horas.", false);
  evento.target.reset();

  // Limpiar estilos de error
  document.querySelectorAll("input, textarea, select").forEach((el) => {
    el.style.borderColor = "";
  });
}

function inicializarValidaciones() {
  const formulario = document.getElementById("form-contacto");
  if (!formulario) return;

  formulario.addEventListener("submit", validarFormulario);

  // Limpiar estilos de error al escribir
  document.querySelectorAll("input, textarea, select").forEach((el) => {
    el.addEventListener("input", () => {
      el.style.borderColor = "";
    });
    el.addEventListener("change", () => {
      el.style.borderColor = "";
    });
  });

  // Actualiza el output del slider de satisfacción en tiempo real
  const slider = document.getElementById("satisfaccion");
  const output = document.getElementById("satisfaccion-ayuda");
  if (slider && output) {
    slider.addEventListener("input", () => {
      output.textContent = slider.value;
    });
  }

  console.log("✅ Validaciones del formulario inicializadas");
}

document.addEventListener("DOMContentLoaded", inicializarValidaciones);

export { validarFormulario };