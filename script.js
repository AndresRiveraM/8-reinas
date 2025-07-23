document.addEventListener("DOMContentLoaded", () => {
  const tablero = document.getElementById("tablero");
  const selectSoluciones = document.getElementById("soluciones");

  // Almacena todas las casillas para acceso rápido
  const casillas = [];
  let contadorReinas = 0;

  // Tres soluciones de ejemplo (posiciones de reinas en formato fila => columna)
  // Cada array de 8 elementos representa una solución con 8 reinas en columnas por fila
  const soluciones = [
    [0, 4, 7, 5, 2, 6, 1, 3], // Solución 1
    [0, 5, 7, 2, 6, 3, 1, 4], // Solución 2
    [1, 3, 5, 7, 2, 0, 6, 4], // Solución 3
  ];
  const btnReiniciar = document.getElementById("btnReiniciar");

  // Botón reiniciar: limpia tablero y resetea selector y contador
  btnReiniciar.addEventListener("click", () => {
    limpiarTablero();
    contadorReinas = 0;
    selectSoluciones.value = "";
  });


  // Crear tablero
  for (let fila = 0; fila < 8; fila++) {
    for (let col = 0; col < 8; col++) {
      const casilla = document.createElement("div");
      casilla.classList.add("casilla");
      casilla.dataset.fila = fila;
      casilla.dataset.col = col;
      casilla.setAttribute("role", "gridcell");
      casilla.tabIndex = 0;

      // Color alternado
      if ((fila + col) % 2 === 0) {
        casilla.classList.add("blanca");
      } else {
        casilla.classList.add("negra");
      }

      // Click para agregar/remover reina manualmente (si quieres mantener esta funcionalidad)
      casilla.addEventListener("click", () => {
        toggleReina(casilla);
      });

      // Soporte accesible para teclado (Enter o espacio)
      casilla.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleReina(casilla);
        }
      });

      tablero.appendChild(casilla);
      casillas.push(casilla);
    }
  }

  // Función para agregar/remover reina manualmente
  function toggleReina(casilla) {
    const tieneReina = casilla.querySelector("img");

    if (tieneReina) {
      casilla.removeChild(tieneReina);
      contadorReinas--;
      actualizarAtaques();
    } else {
      if (contadorReinas < 8) {
        const reina = crearReina();
        casilla.appendChild(reina);
        contadorReinas++;
        actualizarAtaques();
      } else {
        alert("Solo puedes colocar un máximo de 8 reinas.");
      }
    }
  }

  // Crear imagen reina con clases y atributos accesibles
  function crearReina() {
    const reina = document.createElement("img");
    reina.src = "reina.png";
    reina.alt = "Reina";
    reina.classList.add("queen-img");
    reina.setAttribute("aria-hidden", "true");
    return reina;
  }

  // Limpia las marcas de ataque
  function limpiarAtaques() {
    casillas.forEach(c => c.classList.remove("ataque"));
  }

  // Actualiza el marcado de ataques basado en reinas colocadas
  function actualizarAtaques() {
    limpiarAtaques();
    casillas.forEach(c => {
      if (c.querySelector("img")) {
        const fila = parseInt(c.dataset.fila);
        const col = parseInt(c.dataset.col);
        marcarAtaquesDesde(fila, col);
      }
    });
  }

  // Marca casillas atacadas por una reina en (fila, col)
  function marcarAtaquesDesde(fila, col) {
    for (let i = 0; i < 8; i++) {
      marcarCasilla(fila, i);             // Horizontal
      marcarCasilla(i, col);              // Vertical
      marcarCasilla(fila + i, col + i);  // Diagonal ↘
      marcarCasilla(fila - i, col - i);  // Diagonal ↖
      marcarCasilla(fila + i, col - i);  // Diagonal ↙
      marcarCasilla(fila - i, col + i);  // Diagonal ↗
    }
  }

  // Añade clase ataque si la casilla está vacía y dentro del tablero
  function marcarCasilla(f, c) {
    if (f >= 0 && f < 8 && c >= 0 && c < 8) {
      const index = f * 8 + c;
      if (!casillas[index].querySelector("img")) {
        casillas[index].classList.add("ataque");
      }
    }
  }

  // Limpia tablero (quitar todas las reinas y ataques)
  function limpiarTablero() {
    casillas.forEach(c => {
      const reina = c.querySelector("img");
      if (reina) c.removeChild(reina);
      c.classList.remove("ataque");
    });
    contadorReinas = 0;
  }

  // Cargar solución seleccionada en el tablero
  function cargarSolucion(indice) {
    limpiarTablero();
    if (indice === "") return;
    const solucion = soluciones[indice];
    solucion.forEach((col, fila) => {
      const index = fila * 8 + col;
      const casilla = casillas[index];
      const reina = crearReina();
      casilla.appendChild(reina);
    });
    contadorReinas = 8;
    actualizarAtaques();
  }

  // Evento cambio en selector para cargar la solución
  selectSoluciones.addEventListener("change", e => {
    cargarSolucion(e.target.value);
  });
});
