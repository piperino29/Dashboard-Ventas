import { useCallback, useEffect, useState } from "react";
const fechaActual = new Date();
const contador = 0;

export const useFetch = (url, fecha) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    anio: fecha.getFullYear(),
    mes: fecha.getMonth() + 1,
    dia: fecha.getDate(),
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url, requestOptions);

      if (!res.ok) throw Error("Error al consumir la api");
      const { valores } = await res.json();
      setData(valores);
    } catch (error) {
      setError(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 600000);
    return () => clearInterval(fetchDataInterval);
  }, []);
  return { data, loading, error };
};

export const useFetchAnterior = (url, fecha) => {
  const [dataAnte, setDataAnte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    anio: fecha.getFullYear() - 1,
    mes: fecha.getMonth() + 1,
    dia: fecha.getDate(),
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url, requestOptions);
      if (!res.ok) throw Error("Error al consumir la api");
      const { valores } = await res.json();
      setDataAnte(valores);
    } catch (error) {
      setError(error);
      setDataAnte([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 600000);
    return () => clearInterval(fetchDataInterval);
  }, []);

  return { dataAnte, loading, error };
};

export const useFetchDiaria = (url, fecha) => {
  const [dataDiaria, setDataDiaria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    fecha:
      fecha.getFullYear() +
      "" +
      ("0" + (fecha.getMonth() + 1)).slice(-2) +
      "" +
      ("0" + fecha.getDate()).slice(-2),
  });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url, requestOptions);
      if (!res.ok) throw Error("Error al consumir la api");
      const { valor } = await res.json();
      setDataDiaria(valor);
    } catch (error) {
      setError(error);
      setDataDiaria([]);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 600000);

    return () => clearInterval(fetchDataInterval);
  }, []);

  return { dataDiaria, loading, error };
};

export const useFetchMetas = () => {
  const [metas, setMetas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  var raw = "";

  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://inventario.lucasdiesel.cl:3100/api/monitor/metas",
        requestOptions
      );

      if (!res) throw setError("Error al consumir la api");
      const { result } = await res.json();
      setMetas(result);
    } catch (error) {
      setError(error);
      setMetas([]);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 600000);
    return () => clearInterval(fetchDataInterval);
  }, []);

  return { metas, loading, error };
};

export const useFetchMetaKamLab = () => {
  const [metas, setMetas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  var raw = "";

  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://inventario.lucasdiesel.cl:3100/api/monitor/metaKamLab",
        requestOptions
      );

      if (!res) throw setError("Error al consumir la api");
      const { result } = await res.json();
      setMetas(result);
    } catch (error) {
      setError(error);
      setMetas([]);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 600000);
    return () => clearInterval(fetchDataInterval);
  }, []);

  return { metas, loading, error };
};
export const useFetchMetaKamFM = () => {
  const [metas, setMetas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  var raw = "";

  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://inventario.lucasdiesel.cl:3100/api/monitor/metaKamFm",
        requestOptions
      );

      if (!res) throw setError("Error al consumir la api");
      const { result } = await res.json();
      setMetas(result);
    } catch (error) {
      setError(error);
      setMetas([]);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 600000);
    return () => clearInterval(fetchDataInterval);
  }, []);

  return { metas, loading, error };
};
export const useFetchMetaKamEquipos = () => {
  const [metas, setMetas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  var raw = "";

  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://inventario.lucasdiesel.cl:3100/api/monitor/metaKamEquipo",
        requestOptions
      );

      if (!res) throw setError("Error al consumir la api");
      const { result } = await res.json();
      setMetas(result);
    } catch (error) {
      setError(error);
      setMetas([]);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 600000);
    return () => clearInterval(fetchDataInterval);
  }, []);

  return { metas, loading, error };
};

export const useFetchProyeccion = (url, fecha) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (fecha.getDate() == "1") {
    return { data: 0 };
  } else {
    var raw = JSON.stringify({
      anio: fecha.getFullYear(),
      mes: fecha.getMonth() + 1,
      dia: fecha.getDate() - 1,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const fetchData = useCallback(async () => {
      setLoading(true);
      try {
        const res = await fetch(url, requestOptions);

        if (!res.ok) throw Error("Error al consumir la api");
        const { valores } = await res.json();
        setData(valores);
      } catch (error) {
        setError(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }, []);
    useEffect(() => {
      fetchData();
      const fetchDataInterval = setInterval(() => {
        fetchData();
      }, 600000);
      return () => clearInterval(fetchDataInterval);
    }, []);
    return { data, loading, error };
  }
};
