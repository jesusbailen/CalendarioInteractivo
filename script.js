//Array con nombres de meses y días
const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const dias  = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

//Guardar fecha actual (x separado)
const ahora       = new Date();
const anioActual  = ahora.getFullYear();
const mesActual   = ahora.getMonth();      // 0-11
const diaActual   = ahora.getDate();

//Preguntar por prompt año y mes
const anio = parseInt(prompt("Introduce el año (por ejemplo, 2025):"));
const mes  = parseInt(prompt("Introduce el mes (1-12):"));

//Fechas base del mes solicitado
const primerDia  = new Date(anio, mes - 1, 1);
const ultimoDia  = new Date(anio, mes, 0);
const totalDias  = ultimoDia.getDate();

//Día de la semana en que empieza (ajustado L=0, ..., D=6)
const inicioCol = (primerDia.getDay() + 6) % 7;

//Dejamos en blanco los días del mes anterior
const rellenarMesAnterior = false;
let ultimoDiaMesAnterior = null;
if (rellenarMesAnterior) {
  const ultimoDelAnterior = new Date(anio, mes - 1, 0); // día 0 del mes actual = último del anterior
  ultimoDiaMesAnterior = ultimoDelAnterior.getDate();
}

//Generar la tabla: 1ª fila mes/año, 2ª fila días semana
let html = `<table>`;
html += `<tr><th colspan="7">${meses[mes - 1]} ${anio}</th></tr>`;
html += `<tr>${dias.map(d => `<th>${d}</th>`).join('')}</tr>`;

//Resto de filas generadas dinámicamente (1..N) ...Dejando huecos en blanco o completando con mes anterior
let dia = 1;
for (let fila = 0; dia <= totalDias; fila++) {
  html += `<tr>`;
  for (let col = 0; col < 7; col++) {
    if (fila === 0 && col < inicioCol) {
      if (rellenarMesAnterior) {
        //Días del mes anterior (al revés hasta completar)
        const numero = (ultimoDiaMesAnterior - (inicioCol - 1 - col));
        html += `<td class="prev">${numero}</td>`;
      } else {
        html += `<td></td>`;
      }
    } else if (dia > totalDias) {
      html += `<td></td>`;
    } else {
      //resaltar hoy si coincide con el mes/año mostrados
      const esHoy = (anio === anioActual) && ((mes - 1) === mesActual) && (dia === diaActual);
      html += `<td class="${esHoy ? 'hoy' : ''}">${dia}</td>`;
      dia++;
    }
  }
  html += `</tr>`;
}
html += `</table>`;

// Insertar calendario en el contenedor
document.getElementById("cal").innerHTML = html;

