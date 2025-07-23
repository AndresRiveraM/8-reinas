document.addEventListener("DOMContentLoaded", () => {
  const tablero = document.getElementById("tablero");
  let contadorReinas = 0;

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
        const reinaActual = casilla.querySelector("img");

        if (reinaActual) {
          casilla.removeChild(reinaActual);
          contadorReinas--;
        } else {
          if (contadorReinas < 8) {
            const reina = document.createElement("img");
            reina.src = "reina.png";
            reina.alt = "Reina";
            casilla.appendChild(reina);
            contadorReinas++;
          } else {
            alert("Solo puedes colocar 8 reinas.");
          }
        }
      });

      tablero.appendChild(casilla);
    }
  }
});
