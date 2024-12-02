export function calcularDiasHabilesChile(year, month) {
  // Crear una fecha para el primer día del mes
  var startDate = new Date(year, month - 1, 1);

  // Crear una fecha para el último día del mes
  var endDate = new Date(year, month, 0);

  // Lista de feriados en Chile (puedes ajustarla según tus necesidades)
  var feriados = [
    new Date(year, 1 - 1, 1), // Año Nuevo
    new Date(year, 4 - 1, 14), // Viernes Santo
    new Date(year, 5 - 1, 1), // Día del Trabajo
    new Date(year, 9 - 1, 18), // Día de la Independencia
    new Date(year, 9 - 1, 19), // Día de las Glorias del Ejército
    new Date(year, 10 - 1, 12), // Encuentro de Dos Mundos
    new Date(year, 11 - 1, 1), // Día de Todos los Santos
    new Date(year, 12 - 1, 8), // Inmaculada Concepción
    new Date(year, 12 - 1, 25), // Navidad
  ];

  // Contador de días hábiles
  var diasHabiles = 0;

  // Iterar sobre cada día del mes
  for (
    var date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    // Verificar si el día actual no es fin de semana (sábado o domingo) ni feriado
    if (
      date.getDay() !== 0 &&
      date.getDay() !== 6 &&
      !esFeriado(date, feriados)
    ) {
      diasHabiles++;
    }
  }

  return diasHabiles;
}

// Función para verificar si una fecha es feriado
function esFeriado(date, feriados) {
  for (var i = 0; i < feriados.length; i++) {
    if (date.getTime() === feriados[i].getTime()) {
      return true;
    }
  }
  return false;
}

export function diasTranscurridos() {
  // Obtener la fecha actual
  var today = new Date();

  // Crear una fecha para el primer día del mes
  var startDate = new Date(today.getFullYear(), today.getMonth(), 1);

  // Contador de días hábiles
  var diasHabiles = 0;

  // Lista de feriados en Chile (puedes ajustarla según tus necesidades)
  var feriados = [
    new Date(today.getFullYear(), 0, 1), // Año Nuevo
    new Date(today.getFullYear(), 2, 29), // Viernes Santo
    new Date(today.getFullYear(), 2, 30), // Sábado Santo
    new Date(today.getFullYear(), 4, 1), // Día del Trabajo
    new Date(today.getFullYear(), 4, 21), // Día de las Glorias Navales
    new Date(today.getFullYear(), 5, 9), // Pentecostés
    new Date(today.getFullYear(), 5, 20), // Corpus Christi
    new Date(today.getFullYear(), 5, 29), // San Pedro y San Pablo
    new Date(today.getFullYear(), 6, 16), // Día de la Virgen del Carmen
    new Date(today.getFullYear(), 7, 15), // Asunción de la Virgen
    new Date(today.getFullYear(), 8, 18), // Independencia Nacional
    new Date(today.getFullYear(), 8, 19), // Día de las Glorias del Ejército
    new Date(today.getFullYear(), 8, 20), // Fiestas Patrias
    new Date(today.getFullYear(), 9, 12), // Encuentro de Dos Mundos
    new Date(today.getFullYear(), 9, 27), // Día de la Reforma Protestante
    new Date(today.getFullYear(), 9, 31), // Día de las Iglesias Evangélicas y Protestantes
    new Date(today.getFullYear(), 10, 1), // Día de Todos los Santos
    new Date(today.getFullYear(), 10, 24), // Domingo de Cristo Rey
    new Date(today.getFullYear(), 11, 8), // Inmaculada Concepción
    new Date(today.getFullYear(), 11, 25), // Navidad
  ];

  // Iterar sobre cada día del mes hasta la fecha actual
  for (var date = startDate; date <= today; date.setDate(date.getDate() + 1)) {
    // Verificar si el día actual no es fin de semana (sábado o domingo) ni feriado
    if (
      date.getDay() !== 0 &&
      date.getDay() !== 6 &&
      !esFeriado(date, feriados)
    ) {
      diasHabiles++;
    }
  }

  return diasHabiles;
}
