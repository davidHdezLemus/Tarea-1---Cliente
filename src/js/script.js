const timeElement = document.getElementById("time"); // Elemento HTML donde se mostrará el tiempo restante
let inputElement = document.createElement("input"); // Crear un elemento de tipo input

timeElement.appendChild(inputElement); // Añadir el elemento tipo input como hijo del elemento time
inputElement.setAttribute("type", "date"); // Le añadimos el tipo de input que deseamos

let fechaActual = new Date(); // Fecha actual

// Añadir el evento change para detectar cuando el usuario elige una fecha
inputElement.addEventListener("change", () => {
  let fechaElegida = new Date(inputElement.value); // convertir la fecha elegida por el usuario a un objeto de tipo fecha

  // Verificar si la fecha es válida y no es anterior a la fecha actual
  if (isNaN(fechaElegida.getTime())) {
    alert("El formato de la fecha no es válido. Inténtalo de nuevo.");
  } else if (fechaElegida < fechaActual) {
    alert("La fecha elegida no puede ser anterior a la actual.");
  } else {
    // Calcular diferencia en milisegundos
    let dateActual = fechaActual.getTime();
    let dateElegida = fechaElegida.getTime();
    let diferencia = dateElegida - dateActual; // Diferencia entre fecha elegida por el usuario y la fecha actual en milisegundos

    let salir = false; // Variable para detener el contador

    // Función que calcula el tiempo restante
    function calcularTiempoRestante() {
      let diferenciaSegundos = Math.floor(diferencia / 1000); // Convertir la diferencia actualizada en segundos

      // Calcular los segundos, minutos, horas, días, meses y años restantes
      let segundos = Math.floor(diferenciaSegundos % 60);
      let minutos = Math.floor((diferenciaSegundos / 60) % 60);
      let horas = Math.floor((diferenciaSegundos / 3600) % 24);
      let dias = Math.floor((diferenciaSegundos / 86400) % 30);
      let meses = Math.floor((diferenciaSegundos / 2592000) % 12);
      let años = Math.floor(diferenciaSegundos / 31536000);

      let textoTiempoRestante = ""; // Inicializamos una cadena vacía

      // Si hay años, meses, días, horas, minutos o segundos, añadirlos a la cadena
      if (años > 0) { textoTiempoRestante += años + " año(s), "; }
      if (meses > 0) { textoTiempoRestante += meses + " mes(es), "; }
      if (dias > 0) { textoTiempoRestante += dias + " día(s), "; }
      if (horas > 0) { textoTiempoRestante += horas + " hora(s), "; }
      if (minutos > 0) { textoTiempoRestante += minutos + " minuto(s), "; }
      if (segundos > 0) { textoTiempoRestante += segundos + " segundo(s)"; }

      // Añadimos una clase para cambiar el color del texto según el tiempo restante
      if (meses > 1) {
        timeElement.classList.remove("orangeColor");
        timeElement.classList.remove("redColor");
        timeElement.classList.add("greenColor");
      } else if (meses < 1 && dias >= 7) {
        timeElement.classList.remove("greenColor");
        timeElement.classList.remove("redColor");
        timeElement.classList.add("orangeColor");
      } else if (dias < 7) {
        timeElement.classList.remove("greenColor");
        timeElement.classList.remove("orangeColor");
        timeElement.classList.add("redColor");
      }

      timeElement.innerText = textoTiempoRestante; // Mostrar el tiempo restante en el elemento HTML

      // Si la diferencia llega a 0, eliminar las clases de colores del texto y mostrar mensaje
      if (diferencia <= 0) {
        timeElement.classList.remove("greenColor");
        timeElement.classList.remove("orangeColor");
        timeElement.classList.remove("redColor");
        timeElement.innerText = "🎉🎈 ¡Felíz Cumpleaños!!!!! 🎉🎈";
        salir = true; // Detener el contador
        return;
      }

      diferencia -= 1000; // Restar 1 segundo (1000 ms) a la diferencia
    }

    if (!salir) {
      let intervalo = setInterval(calcularTiempoRestante, 1000); // Llamar a la función cada segundo
    }

    calcularTiempoRestante(); // Llamar a la función
  }
});

/*
// Calcular diferencia en milisegundos
let dateActual = fechaActual.getTime();
let dateElegida = fechaElegida.getTime();
let diferencia = dateElegida - dateActual; // Diferencia entre fecha elegida por el usuario y la fecha actual en milisegundos

let salir = false; // Variable para detener el contador

// Función que calcula el tiempo restante
function calcularTiempoRestante() {
  let diferenciaSegundos = Math.floor(diferencia / 1000); // Convertir la diferencia actualizada en segundos

  // Calcular los segundos, minutos, horas, días, meses y años restantes
  let segundos = Math.floor(diferenciaSegundos % 60);
  let minutos = Math.floor((diferenciaSegundos / 60) % 60);
  let horas = Math.floor((diferenciaSegundos / 3600) % 24);
  let dias = Math.floor((diferenciaSegundos / 86400) % 30);
  let meses = Math.floor((diferenciaSegundos / 2592000) % 12);
  let años = Math.floor(diferenciaSegundos / 31536000);

  let textoTiempoRestante = ""; // Inicializamos una cadena vacía

  // Si hay años, meses, días, horas, minutos o segundos, añadirlos a la cadena
  if (años > 0) { textoTiempoRestante += años + " año(s), "; }
  if (meses > 0) { textoTiempoRestante += meses + " mes(es), "; }
  if (dias > 0) { textoTiempoRestante += dias + " día(s), "; }
  if (horas > 0) { textoTiempoRestante += horas + " hora(s), "; }
  if (minutos > 0) { textoTiempoRestante += minutos + " minuto(s), "; }
  if (segundos > 0) { textoTiempoRestante += segundos + " segundo(s)"; }

  // Añadimos una clase para cambiar el color del texto según el tiempo restante
  if (meses > 1) {
    timeElement.classList.remove("orangeColor");
    timeElement.classList.remove("redColor");
    timeElement.classList.add("greenColor");
  } else if (meses < 1 && dias >= 7) {
    timeElement.classList.remove("greenColor");
    timeElement.classList.remove("redColor");
    timeElement.classList.add("orangeColor");
  } else if (dias < 7) {
    timeElement.classList.remove("greenColor");
    timeElement.classList.remove("orangeColor");
    timeElement.classList.add("redColor");
  }

  timeElement.innerText = textoTiempoRestante; // Mostrar el tiempo restante en el elemento HTML

  // Si la diferencia llega a 0, eliminar las clases de colores del texto y mostrar mensaje
  if (diferencia <= 0) {
    timeElement.classList.remove("greenColor");
    timeElement.classList.remove("orangeColor");
    timeElement.classList.remove("redColor");
    timeElement.innerText = "🎉🎈 ¡Felíz Cumpleaños!!!!! 🎉🎈";
    salir = true; // Detener el contador
    return;
  }

  diferencia -= 1000; // Restar 1 segundo (1000 ms) a la diferencia
}

if (!salir) {
  let intervalo = setInterval(calcularTiempoRestante, 1000); // Llamar a la función cada segundo
}

calcularTiempoRestante(); // Llamar a la función
*/
/*
**usar clearinterval**
let counter = setInterval((){
number-...
if (...) {
clearInterval(counter)
}
}, 1000);

**usar el input date**
const datePickerElement = document.getElementById("datePicker");
datePickerElement.addEventListener("change", () => {
  console.log(datePickerElement.value)
  )})

**ejemplo de añadir el input en js con atributos**
let input = document.createElement("");
image.setAttribute("src", "url...");
image.alt = "ejemplo imagen";
*/
