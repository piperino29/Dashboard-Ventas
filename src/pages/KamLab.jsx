import { Box, Container, Grid } from "@mui/material";
import Cargando from "../assets/Cargando";
import {
  useFetch,
  useFetchDiaria,
  useFetchMetaKamEquipos,
  useFetchMetaKamFM,
  useFetchMetaKamLab,
} from "../hooks/useFetch";
import {
  calcularDiasHabilesChile,
  diasTranscurridos,
} from "../utils/DiasHabiles";
import TotalActual from "../components/Informacion/TotalActual";
import TotalVenta from "../components/Informacion/TotalVenta";
import TotalMetas from "../components/Informacion/TotalMetas";
import ProgresoMetas from "../components/Informacion/ProgresoMetas";
import Vendedores from "../components/Informacion/Vendedores";
import { unirArraysPorKam } from "../utils/Ventas";
import { combinarDataKAM } from "../utils/CombinarArrays";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const urlLAb = "http://inventario.lucasdiesel.cl:3100/api/monitor/diariaKamLab";
const urlMes =
  "http://inventario.lucasdiesel.cl:3100/api/monitor/mensualKamLab";
const urlFM = "http://inventario.lucasdiesel.cl:3100/api/monitor/diariaKamFm";
const urlFMes =
  "http://inventario.lucasdiesel.cl:3100/api/monitor/mensualKamFm";
const urlEQ =
  "http://inventario.lucasdiesel.cl:3100/api/monitor/diariaKamEquipo";
const urlEQMes =
  "http://inventario.lucasdiesel.cl:3100/api/monitor/mensualKamEquipo";
const KamLab = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const tiempoEspera = 40 * 1000;
    const temporizador = setTimeout(() => {
      navigate("/");
    }, tiempoEspera);
    return () => clearTimeout(temporizador);
  }, [navigate]);

  const fecha = new Date();
  var diaTranscurrido = diasTranscurridos();
  var diaHabil = calcularDiasHabilesChile(
    fecha.getFullYear(),
    fecha.getMonth() + 1
  );
  let metaDia = 0;
  let metaAlDia = 0;
  let metaMes = 0;

  const { metas } = useFetchMetaKamLab();
  const { dataDiaria } = useFetchDiaria(urlLAb, fecha);
  const { data, loading } = useFetch(urlMes, fecha);
  const FM = useFetchDiaria(urlFM, fecha);
  const FMM = useFetch(urlFMes, fecha);
  const METAFM = useFetchMetaKamFM();
  const EQ = useFetchDiaria(urlEQ, fecha);
  const EQMES = useFetch(urlEQMes, fecha);
  const EQMETAS = useFetchMetaKamEquipos();
  if (loading) {
    return <Cargando />;
  }
  const mesActual = fecha.toLocaleString("es-ES", { month: "long" });
  metas && metas.map((item) => (metaMes = item[mesActual]));
  metaDia = metaMes / diaHabil;
  metaAlDia = metaDia * diaTranscurrido;
  let total = 0;
  data && data.map((item) => (total = item.Total));
  const kams = combinarDataKAM(metas, dataDiaria, data);
  const kamFM = combinarDataKAM(METAFM.metas, FM.dataDiaria, FMM.data);
  const KAMEQ = combinarDataKAM(EQMETAS.metas, EQ.dataDiaria, EQMES.data);
  console.log(kams);
  let porcentaje = (total * 100) / metaMes;
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
            <Grid item={true} xs={12} sm={6} lg={3}>
              <TotalActual
                fecha={fecha}
                metaDia={metaDia}
                url={urlLAb}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid item={true} xs={12} sm={6} lg={3}>
              <TotalVenta
                fecha={fecha}
                sx={{ height: "100%" }}
                values={total.toString()}
                metaDiaActual={metaAlDia}
              />
            </Grid>
            <Grid item={true} xs={12} sm={6} lg={3}>
              <TotalMetas value={metaMes} sx={{ height: "100%" }} />
            </Grid>
            <Grid item={true} xs={12} sm={6} lg={3}>
              <ProgresoMetas porcentaje={porcentaje} sx={{ height: "100%" }} />
            </Grid>
            <Grid item={true} xs={12} lg={12}>
              <Vendedores
                vendedores={kams}
                sx={{ height: "100%" }}
                mes={mesActual}
                title={"Venta Kam Laboratorios"}
              />
            </Grid>
            <Grid item={true} xs={12} lg={12}>
              <Vendedores
                vendedores={kamFM}
                sx={{ height: "100%" }}
                mes={mesActual}
                title={"Venta Kam Fuel Manager"}
              />
            </Grid>
            <Grid item={true} xs={12} lg={12}>
              <Vendedores
                vendedores={KAMEQ}
                sx={{ height: "100%" }}
                mes={mesActual}
                title={"Venta Kam Equipos"}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default KamLab;
