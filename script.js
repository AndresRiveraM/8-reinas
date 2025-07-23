document.addEventListener("DOMContentLoaded", () => {
  const tablero = document.getElementById("tablero");

  for (let fila = 0; fila < 8; fila++) {
    for (let col = 0; col < 8; col++) {
      const casilla = document.createElement("div");
      casilla.classList.add("casilla");
      if ((fila + col) % 2 === 0) {
        casilla.classList.add("blanca");
      } else {
        casilla.classList.add("negra");
      }

      casilla.addEventListener("click", () => {
        if (!casilla.querySelector("img")) {
          const reina = document.createElement("img");
          reina.src = "reina.png";
          reina.alt = "Reina";
          casilla.appendChild(reina);
        }
      });

      tablero.appendChild(casilla);
    }
  }
});
