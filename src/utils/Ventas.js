import { calcularDiasHabilesChile, diasTranscurridos } from "./DiasHabiles";

export function restarTotales(datos, codvende1, codvende2) {
  // Buscar y restar dinámicamente los Totales
  for (const key in datos) {
    if (datos[key].codvende === codvende1) {
      // Encontrado codvende1, restar su Total
      const total1 = datos[key].Total;

      for (const innerKey in datos) {
        if (datos[innerKey].codvende === codvende2) {
          // Encontrado codvende2, restar su Total
          const total2 = datos[innerKey].Total;

          // Realizar la resta y actualizar el Total de codvende2
          datos[innerKey].Total = total2 - total1;

          // Retornar un array de objetos
          return Object.values(datos);
        }
      }

      // Salir del bucle exterior una vez que se haya realizado la operación
      break;
    }
  }

  // Retornar un array de objetos si no se encuentra algún valor
  return Object.values(datos);
}

export const Ventas = (data) => {
  const totalSum = {};
  const result = [];

  data &&
    data.map((item) => {
      const codvende = item.codvende;

      if (totalSum[codvende]) {
        totalSum[codvende] += item.TotalDia;
      } else {
        totalSum[codvende] = item.TotalDia;
      }
    });

  // Agrupar los resultados específicos bajo el idVende 003
  const specialIds = ["21", "391", "17", "342"];
  const specialSum = specialIds.reduce((acc, id) => {
    if (totalSum[id]) {
      acc += totalSum[id];
      delete totalSum[id]; // Eliminar la entrada individual
    }
    return acc;
  }, 0);

  // Agregar la suma especial al objeto totalSum
  totalSum["669"] = specialSum;

  const totalArray = Object.keys(totalSum).map((codvende) => ({
    codvende: parseInt(codvende),
    TotalDiaria: totalSum[codvende],
  }));

  // Filtrar los specialIds del resultado final
  const final = result.concat(
    totalArray.filter((item) => !specialIds.includes(item.codvende.toString()))
  );
  return final;
};

export const Ventas2 = (data) => {
  const totalSum = {};
  const result = [];
  data &&
    data.map((item) => {
      const codvende = item.codvende;

      // Si el codvende ya existe en el totalSum, sumar el Total
      if (totalSum[codvende]) {
        totalSum[codvende] += item.Total;
      } else {
        // Si no existe, crear una nueva entrada
        totalSum[codvende] = item.Total;
      }

      // Agregar una nueva línea al resultado si codvende es 332 o codvend es 332
      // if (codvende === 332 || item.codvend === 332) {
      //   result.push({
      //     codvende: 332,
      //     Total: item.Total,
      //   });
      // }
    });

  // Convertir el totalSum en un array de objetos
  const totalArray = Object.keys(totalSum).map((codvende) => ({
    codvende: parseInt(codvende),
    Total: totalSum[codvende],
  }));

  const final = result.concat(totalArray);

  return final;
};

export function procesarDatos(data) {
  // Objeto para almacenar la suma de los valores de "Total" por "codvende"
  const totalSum = {};

  // Iterar sobre los datos y sumar los valores
  data &&
    data.map((item) => {
      // Si el codvende es 276 y CODVEND es 332, sumar el Total a la línea de 332 y restar al 276
      if (item.codvende === 276 && item.CODVEND === 332) {
        if (!totalSum[332]) {
          totalSum[332] = 0;
        }
        totalSum[332] += item.Total;
        totalSum[276] = (totalSum[276] || 0) - item.Total;
      } else {
        // Para otros casos, manejar normalmente
        const codvende =
          item.CODVEND === 276 && item.codvende === 332 ? 332 : item.codvende;

        // Si el codvende ya existe en el totalSum, sumar el Total
        if (totalSum[codvende]) {
          totalSum[codvende] += item.Total;
        } else {
          // Si no existe, crear una nueva entrada
          totalSum[codvende] = item.Total;
        }
      }
    });

  // Convertir el totalSum en un array de objetos
  const totalArray = Object.keys(totalSum).map((codvende) => ({
    codvende: parseInt(codvende),
    Total: totalSum[codvende],
  }));

  // Modificar los datos originales con las sumas correspondientes
  const finalResult = data.map((item) => {
    const codvende =
      item.CODVEND === 276 && item.codvende === 332 ? 332 : item.codvende;
    return {
      codvende: codvende,
      Total: totalSum[codvende],
    };
  });

  return finalResult.concat(totalArray);
}

export function procesa(data) {
  // Tu array original

  // Objeto para almacenar la suma de los valores de "Total" por "codvende"
  const totalSum = {};

  // Iterar sobre los datos y sumar los valores
  data &&
    data.map((item) => {
      const codvende = item.codvend === 332 ? 332 : item.codvende;

      if (!totalSum[codvende]) {
        totalSum[codvende] = 0;
      }

      totalSum[codvende] += item.Total;
    });

  // Convertir el totalSum en un array de objetos
  const totalArray = Object.keys(totalSum).map((codvende) => ({
    codvende: parseInt(codvende),
    Total: totalSum[codvende],
  }));

  // Modificar los datos originales con las sumas correspondientes
  const finalResult = data.map((item) => {
    const codvende = item.codvend === 332 ? 332 : item.codvende;
    return {
      codvende: codvende,
      Total: totalSum[codvende],
      Periodo: item.Periodo,
    };
  });
}

export function sacarTotal(data) {
  const totales = [];
  for (const objecto of data) {
    totales.push(objecto.Total || 0);
  }
  return totales;
}
export function sacaVendedor(data) {
  const nombres = [];
  for (const objecto of data) {
    nombres.push(objecto.NombreVendedor);
  }
  return nombres;
}

export function sacarMeta(data) {
  const metas = [];
  const fecha = new Date();
  const mes = fecha.toLocaleString("es-ES", { month: "long" });
  for (const objecto of data) {
    metas.push(objecto[mes] || 0);
  }
  return metas;
}

export function metaAlDia(data) {
  let fecha = new Date();
  var diaTranscurrido = diasTranscurridos();
  var diaHabil = calcularDiasHabilesChile(
    fecha.getFullYear(),
    fecha.getMonth() + 1
  );
  const mes = fecha.toLocaleString("es-ES", { month: "long" });
  const metasDiarias = [];
  for (const objecto of data) {
    metasDiarias.push((objecto[mes] / diaHabil) * diaTranscurrido);
  }
  return metasDiarias;
}

export function metaDiaria(data) {
  let fecha = new Date();
  var diaHabil = calcularDiasHabilesChile(
    fecha.getFullYear(),
    fecha.getMonth() + 1
  );
  const mes = fecha.toLocaleString("es-ES", { month: "long" });
  const metaDia = [];
  for (const objecto of data) {
    metaDia.push({
      metaDiaria: objecto[mes] / diaHabil,
      codvende: objecto.codvende,
    });
  }
  return metaDia;
}

export const OtraFuncion = (data) => {
  const totalSum = {};
  const result = [];

  data &&
    data.map((item) => {
      const codvende = item.codvende;

      if (totalSum[codvende]) {
        totalSum[codvende] += item.Total;
      } else {
        totalSum[codvende] = item.Total;
      }

      // Agregar una nueva línea al resultado si codvende es 332 o codvend es 332
      // if (codvende === 332 || item.codvend === 332) {
      //   result.push({
      //     codvende: 332,
      //     Total: item.Total,
      //   });
      // }
    });

  const specialIds = ["21", "391", "17", "342"];
  const specialSum = specialIds.reduce((acc, id) => {
    if (totalSum[id]) {
      acc += totalSum[id];
      delete totalSum[id];
    }
    return acc;
  }, 0);

  totalSum["669"] = specialSum;

  const totalArray = Object.keys(totalSum).map((codvende) => ({
    codvende: parseInt(codvende),
    Total: totalSum[codvende],
  }));

  const final = result.concat(
    totalArray.filter((item) => !specialIds.includes(item.codvende.toString()))
  );

  return final;
};

export function unirArraysPorKam(array1, array2, array3) {
  return array1.flatMap((elem1) =>
    array2.flatMap((elem2) =>
      array3
        .filter(
          (elem3) =>
            elem1["KAM"] === elem2["KAM"] && elem2["KAM"] === elem3["KAM"]
        )
        .map((elem3) => Object.assign({}, elem1, elem2, elem3))
    )
  );
}

