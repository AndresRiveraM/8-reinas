document.addEventListener("DOMContentLoaded", () => {
  const tablero = document.getElementById("tablero");
  let contadorReinas = 0;
  const casillas = [];

  // Crear tablero
  for (let fila = 0; fila < 8; fila++) {
    for (let col = 0; col < 8; col++) {
      const casilla = document.createElement("div");
      casilla.classList.add("casilla");
      casilla.dataset.fila = fila;
      casilla.dataset.col = col;

      if ((fila + col) % 2 === 0) {
        casilla.classList.add("blanca");
      } else {
        casilla.classList.add("negra");
      }

      casilla.addEventListener("click", () => {
        const tieneReina = casilla.querySelector("img");

        if (tieneReina) {
          casilla.removeChild(tieneReina);
          contadorReinas--;
          limpiarAtaques();
          marcarTodosAtaques();
        } else {
          if (contadorReinas < 8) {
            const reina = document.createElement("img");
            reina.src = "reina.png";
            reina.alt = "Reina";
            casilla.appendChild(reina);
            contadorReinas++;
            marcarTodosAtaques();
          } else {
            alert("Solo puedes colocar un máximo de 8 reinas.");
          }
        }
      });

      tablero.appendChild(casilla);
      casillas.push(casilla);
    }
  }

  function limpiarAtaques() {
    casillas.forEach(c => c.classList.remove("ataque"));
  }

  function marcarTodosAtaques() {
    limpiarAtaques();
    casillas.forEach(c => {
      if (c.querySelector("img")) {
        const f = parseInt(c.dataset.fila);
        const col = parseInt(c.dataset.col);
        marcarAtaquesDesde(f, col);
      }
    });
  }

  function marcarAtaquesDesde(fila, col) {
    for (let i = 0; i < 8; i++) {
      marcarCasilla(fila, i);         // Horizontal
      marcarCasilla(i, col);          // Vertical
      marcarCasilla(fila + i, col + i); // Diagonal ↘
      marcarCasilla(fila - i, col - i); // Diagonal ↖
      marcarCasilla(fila + i, col - i); // Diagonal ↙
      marcarCasilla(fila - i, col + i); // Diagonal ↗
    }
  }

  function marcarCasilla(f, c) {
    if (f >= 0 && f < 8 && c >= 0 && c < 8) {
      const index = f * 8 + c;
      if (!casillas[index].querySelector("img")) {
        casillas[index].classList.add("ataque");
      }
    }
  }
});
