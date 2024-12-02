import { array } from "prop-types";

export function combinarData(array1, array2, array3, campoIncluir) {
  const ordenarPorCodvende = (a, b) => a.codvende - b.codvende;

  array1.sort(ordenarPorCodvende);
  array2.sort(ordenarPorCodvende);
  array3.sort(ordenarPorCodvende);

  const objeto1 = {};
  array1.forEach((item) => (objeto1[item.codvende] = item));

  const resultadoParcial = array2.map((item) => ({
    ...objeto1[item.codvende],
    ...item,
  }));

  const objeto2 = {};
  resultadoParcial.forEach((item) => (objeto2[item.codvende] = item));

  const resultadoFinal = array3.map((item) => ({
    ...objeto2[item.codvende],
    [campoIncluir]: item[campoIncluir],
  }));

  return resultadoFinal;
}

export function combinarData2(array1, array2) {
  const ordenarPorCodvende = (a, b) => a.codvende - b.codvende;
  const ordenarPorMetaDiariaDesc = (a, b) => b.metaDiaria - a.metaDiaria;

  array1.sort(ordenarPorCodvende);
  array2.sort(ordenarPorMetaDiariaDesc);

  const objeto1 = {};
  array1.forEach((item) => (objeto1[item.codvende] = item));

  const resultadoParcial1 = array2.map((item) => ({
    ...objeto1[item.codvende],
    ...item,
  }));

  const resultadoFinal = {};
  resultadoParcial1.forEach((item) => (resultadoFinal[item.codvende] = item));

  const resultadoFinalArray = Object.values(resultadoFinal).sort(
    ordenarPorMetaDiariaDesc
  );

  return resultadoFinalArray;
}

export function combinarDataKAM(array1, array2, array3) {
  const objeto1 = {};
  array1 && array1.forEach((item) => (objeto1[item.KAM] = item));

  const resultadoParcial =
    array2 &&
    array2.map((item) => ({
      ...objeto1[item.KAM],
      ...item,
    }));

  const objeto2 = {};
  resultadoParcial &&
    resultadoParcial.forEach((item) => (objeto2[item.KAM] = item));

  const resultadoFinal =
    array3 &&
    array3.map((item) => ({
      ...objeto2[item.KAM],
      ...item,
    }));

  return resultadoFinal;
}
