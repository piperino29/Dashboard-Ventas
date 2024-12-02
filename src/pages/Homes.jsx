import TotalVenta from "../components/Informacion/TotalVenta";
import { Box, Container, Grid } from "@mui/material";

import {
  useFetch,
  useFetchDiaria,
  useFetchMetas,
  useFetchProyeccion,
} from "../hooks/useFetch";
import Cargando from "../assets/Cargando";
import TotalActual from "../components/Informacion/TotalActual";
import ProgresoMetas from "../components/Informacion/ProgresoMetas";
import TotalMetas from "../components/Informacion/TotalMetas";
import Vendedores from "../components/Informacion/Vendedores";
import {
  OtraFuncion,
  Ventas,
  metaAlDia,
  metaDiaria,
  sacaVendedor,
  sacarMeta,
  sacarTotal,
} from "../utils/Ventas";
import { combinarData, combinarData2 } from "../utils/CombinarArrays";
import {
  calcularDiasHabilesChile,
  diasTranscurridos,
} from "../utils/DiasHabiles";
import LinesChart from "../components/Informacion/LinesChart";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import donFrancisc from "../assets/Don_Francis.mp3";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Proyeccion from "../components/Informacion/Proyeccion";
const urlDiaria = "http://inventario.lucasdiesel.cl:3100/api/monitor/diaria";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const tiempoEspera = 40 * 1000;
    const temporizador = setTimeout(() => {
      navigate("/KamLab");
    }, tiempoEspera);
    return () => clearTimeout(temporizador);
  }, [navigate]);

  let total = 0;
  let totalDia = 0;
  let totalMeta = 0;
  let metaDia = 0;
  let metaDiaActual = 0;
  let totalProyeccion = 0;
  let anio = new Date();
  var diaTranscurrido = diasTranscurridos();
  var diaHabil = calcularDiasHabilesChile(
    anio.getFullYear(),
    anio.getMonth() + 1
  );
  const fecha = new Date();
  const mesActual = fecha.toLocaleString("es-ES", { month: "long" });
  const { data, loading, error } = useFetch(
    "http://inventario.lucasdiesel.cl:3100/api/monitor/mensual",
    fecha
  );
  const { dataDiaria } = useFetchDiaria(
    "http://inventario.lucasdiesel.cl:3100/api/monitor/diaria",
    fecha
  );
  const { metas } = useFetchMetas();
  const dataProyeccion = useFetchProyeccion(
    "http://inventario.lucasdiesel.cl:3100/api/monitor/mensual",
    fecha
  );
  if (loading)
    return (
      <>
        <Cargando />
      </>
    );

  data.map((item) => (total += item.Total));
  metas.map((item) => (totalMeta += parseInt(item[mesActual])));
  let porcentaje = (total * 100) / totalMeta;
  const limpiar = OtraFuncion(data);
  const Diarias = Ventas(dataDiaria);
  const transicion = combinarData(limpiar, metas, Diarias, "TotalDiaria");
  const dia = metaDiaria(transicion);
  const vendedores = combinarData2(transicion, dia);
  metaDia = totalMeta / diaHabil;
  metaDiaActual = metaDia * diaTranscurrido;
  const mensual = sacarTotal(transicion);
  const nombre = sacaVendedor(transicion);
  const meta = sacarMeta(transicion);
  const metaAlDiaria = metaAlDia(transicion);
  dataDiaria && dataDiaria.map((item) => (totalDia += item.TotalDia));
  dataProyeccion.data &&
    dataProyeccion.data.map((item) => (totalProyeccion += item.Total));
  let proyeccion = (totalProyeccion / (diaTranscurrido - 1)) * diaHabil;
  proyeccion = proyeccion ? proyeccion : 0;

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="x1">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
              <TotalActual
                fecha={fecha}
                metaDia={metaDia}
                url={urlDiaria}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <TotalVenta
                fecha={fecha}
                sx={{ height: "100%" }}
                values={total.toString()}
                metaDiaActual={metaDiaActual}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <TotalMetas value={totalMeta} sx={{ height: "100%" }} />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <ProgresoMetas porcentaje={porcentaje} sx={{ height: "100%" }} />
            </Grid>
            <Grid item xs={12} lg={8}>
              <Vendedores
                vendedores={vendedores}
                sx={{ height: "100%" }}
                mes={mesActual}
                title={"Venta Por Vendedores"}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Grid container spacing={3} direction="column">
                <Grid item xs={12}>
                  <LinesChart
                    data={mensual}
                    labels={nombre}
                    total={total}
                    meta={meta}
                    metaAlDiaria={metaAlDiaria}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Proyeccion
                    valor={proyeccion}
                    sx={{
                      height: "100%",
                      marginLeft: "50px",
                      marginRight: "50px",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {(porcentaje === 100 && porcentaje === 100.05) ||
      (porcentaje === 105 && porcentaje === 105.05) ||
      (porcentaje === 110 && porcentaje === 110.05) ? (
        <AudioPlayer className="invisible" autoPlay src={donFrancisc} />
      ) : (
        <></>
      )}
      <Footer />
    </>
  );
};

export default Home;
