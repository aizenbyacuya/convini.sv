const supermercadosInfo = {
  "Super Selectos": "Blvd. Los Próceres #123, San Salvador",
  "Despensa de Don Juan": "Calle Arce #456, Santa Tecla",
  "Despensa Familiar": "Av. Juan Pablo II #789, Mejicanos",
  "Walmart": "Final Blvd. Constitución #101, Antiguo Cuscatlán",
};

const productos = [
  // Rutas de imagen corregidas a assets/imag/
  { nombre: "Rinso", categoria: "Limpieza", imagen: "assets/imag/rinso.png", precios: { "Super Selectos": 1.00, "Despensa de Don Juan": 1.15, "Despensa Familiar": 1.10, "Walmart": 1.20, }, },
  { nombre: "jabon", categoria: "Limpieza", imagen: "assets/imag/jabon.png", precios: { "Super Selectos": 1.8, "Despensa de Don Juan": 1.50, "Despensa Familiar": 1.7, "Walmart": 1.9, }, },
  { nombre: "Leche", categoria: "Lácteos", imagen: "assets/imag/leche.jpg", precios: { "Super Selectos": 1.2, "Despensa de Don Juan": 1.18, "Despensa Familiar": 1.21, "Walmart": 1.25, }, },
  { nombre: "Queso", categoria: "Lacteos", imagen: "assets/imag/queso.jpg", precios: { "Super Selectos": 1.5, "Despensa de Don Juan": 1.45, "Despensa Familiar": 1.4, "Walmart": 1.55, }, },
  { nombre: "Lib.carne", categoria: "Carnes", imagen: "assets/imag/carne.jpg", precios: { "Super Selectos": 2.30, "Despensa de Don Juan": 2.4, "Despensa Familiar": 2.35, "Walmart": 2.55, }, },
  { nombre: "Lib.pollo", categoria: "Carnes", imagen: "assets/imag/pollo.jpg", precios: { "Super Selectos": 1.8, "Despensa de Don Juan": 1.65, "Despensa Familiar": 1.7, "Walmart": 1.9, }, },
  { nombre: "Chorizos", categoria: "Embutidos", imagen: "assets/imag/chorizo.jpg", precios: { "Super Selectos": 1.2, "Despensa de Don Juan": 1.18, "Despensa Familiar": 1.15, "Walmart": 1.25, }, },
  { nombre: "Salchicha", categoria: "Embutidos", imagen: "assets/imag/salchicha.jpg", precios: { "Super Selectos": 1.5, "Despensa de Don Juan": 1.35, "Despensa Familiar": 1.4, "Walmart": 1.55, }, },
  { nombre: "Lib.frijoles", categoria: "Grano Basico", imagen: "assets/imag/frijol.jpg", precios: { "Super Selectos": 1.2, "Despensa de Don Juan": 1.18, "Despensa Familiar": 1.15, "Walmart": 1.25, }, },
  { nombre: "Lib.arroz", categoria: "Grano basico", imagen: "assets/imag/arroz.jpg", precios: { "Super Selectos": 1.5, "Despensa de Don Juan": 1.45, "Despensa Familiar": 1.4, "Walmart": 1.55, }, },
  { nombre: "Lib.papas", categoria: "Vejetales", imagen: "assets/imag/papas.jpg", precios: { "Super Selectos": 1.2, "Despensa de Don Juan": 1.18, "Despensa Familiar": 1.15, "Walmart": 1.25, }, },
  { nombre: "Lib.tomates ", categoria: "Vejetales", imagen: "assets/imag/tomates.jpg", precios: { "Super Selectos": 1.30, "Despensa de Don Juan": 1.32, "Despensa Familiar": 1.15, "Walmart": 1.25, }, },
  { nombre: "Lib.Manzana ", categoria: "Fruta", imagen: "assets/imag/manzana.jpg", precios: { "Super Selectos": 1.25, "Despensa de Don Juan": 1.30, "Despensa Familiar": 1.10, "Walmart": 1.40, }, },
  { nombre: "Lib.Uva", categoria: "Fruta", imagen: "assets/imag/uva.jpg", precios: { "Super Selectos": 1.25, "Despensa de Don Juan": 1.30, "Despensa Familiar": 1.10, "Walmart": 1.40, }, },
  { nombre: "Kit para bebe", categoria: "Ropa", imagen: "assets/imag/bebe.jpg", precios: { "Super Selectos": 7.25, "Despensa de Don Juan": 7.30, "Despensa Familiar": 7.10, "Walmart": 6.40, }, },
  { nombre: "Camisa Polo", categoria: "Ropa", imagen: "assets/imag/polo.jpg", precios: { "Super Selectos": 6.25, "Despensa de Don Juan": 6.30, "Despensa Familiar": 6.10, "Walmart": 5.40, }, },

];

let carrito = [];
let puntosAcumulados = 0;

const USUARIO_VALIDO = "usuario@covini.com";
const CONTRASENA_VALIDA = "12345";

function login() {
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;
  const loginSection = document.getElementById("login");
  const busquedaSection = document.getElementById("busqueda");

  if (emailInput === USUARIO_VALIDO && passwordInput === CONTRASENA_VALIDA) {
    loginSection.style.display = "none";
    busquedaSection.style.display = "block";
    filtrarProductos();
  } else {
    showNotification("Correo o contraseña incorrectos. Intenta de nuevo.", 'error');
  }
}

function filtrarProductos() {
  const query = document.getElementById("buscar").value.toLowerCase();
  const resultados = document.getElementById("resultados");
  const noResultados = document.getElementById("no-resultados");
  resultados.innerHTML = "";

  const productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(query));

  if (productosFiltrados.length === 0) {
    noResultados.style.display = "block";
  } else {
    noResultados.style.display = "none";
    productosFiltrados.forEach(p => {
      const div = document.createElement("div");
      div.className = "producto";

      let precioMasBajo = Infinity;
      let supermercadoMasBarato = "";

      for (const [supermercado, precio] of Object.entries(p.precios)) {
        if (precio < precioMasBajo) {
          precioMasBajo = precio;
          supermercadoMasBarato = supermercado;
        }
      }

      const direccionSupermercado = supermercadosInfo[supermercadoMasBarato] || "Dirección no disponible";

      div.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}" />
        <h3>${p.nombre}</h3>
        <p>Categoría: ${p.categoria}</p>
        <p>Precio más bajo: $${precioMasBajo.toFixed(2)} en ${supermercadoMasBarato}</p>
        <p>Dirección: ${direccionSupermercado}</p>
        <button onclick='agregarAlCarrito("${p.nombre}")'>Agregar al carrito</button>
      `;
      resultados.appendChild(div);
    });
  }
}

// Función para mostrar una notificación (Toast)
function showNotification(message, type = 'success') {
  const notificationDiv = document.createElement('div');
  notificationDiv.classList.add('notification');
  notificationDiv.classList.add(type);
  notificationDiv.textContent = message;

  const notificationContainer = document.getElementById('notification-container');
  if (notificationContainer) {
    notificationContainer.appendChild(notificationDiv);
  } else {
    document.body.appendChild(notificationDiv);
  }

  notificationDiv.offsetHeight;

  notificationDiv.classList.add('show');

  setTimeout(() => {
    notificationDiv.classList.remove('show');
    notificationDiv.classList.add('hide');
    notificationDiv.addEventListener('transitionend', () => notificationDiv.remove());
  }, 2500);
}

function agregarAlCarrito(nombre) {
  const producto = productos.find(p => p.nombre === nombre);
  if (producto) {
    carrito.push(producto);
    showNotification("Producto agregado al carrito ✔️", 'success');
  }
}

function mostrarCarrito() {
  document.getElementById("busqueda").style.display = "none";
  document.getElementById("carrito").style.display = "block";

  const lista = document.getElementById("carrito-lista");
  const carritoVacio = document.getElementById("carrito-vacio");
  const totalDisplay = document.getElementById("total");
  const pagarBtn = document.getElementById("pagar-btn");

  lista.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    carritoVacio.style.display = "block";
    totalDisplay.style.display = "none";
    pagarBtn.style.display = "none";
  } else {
    carritoVacio.style.display = "none";
    totalDisplay.style.display = "block";
    pagarBtn.style.display = "block";

    carrito.forEach(p => {
      const minPrecio = Math.min(...Object.values(p.precios));
      total += minPrecio;
      const li = document.createElement("li");
      li.textContent = `${p.nombre} - Mejor precio: $${minPrecio.toFixed(2)}`;
      lista.appendChild(li);
    });
  }

  totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

function procesarPago() {
  if (carrito.length === 0) {
    showNotification("El carrito está vacío. Agrega productos antes de pagar.", 'error');
    return;
  }

  const totalCompra = parseFloat(document.getElementById("total").textContent.replace("Total: $", ""));

  const puntosGanados = Math.floor(totalCompra);
  puntosAcumulados += puntosGanados;

  showNotification(`¡Pago exitoso! Ganaste ${puntosGanados} puntos. Puntos totales: ${puntosAcumulados}.`, 'success');

  carrito = [];
  mostrarCarrito();
}

function volverABuscar() {
  document.getElementById("carrito").style.display = "none";
  document.getElementById("busqueda").style.display = "block";
}