import PropTypes from "prop-types";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useFetchAnterior } from "../../hooks/useFetch";

const TotalVenta = (props) => {
  const { fecha, sx, values, metaDiaActual } = props;
  const precio = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });
  const monto = precio.format(values);
  let anterior = 0;

  const { dataAnte, loading, error } = useFetchAnterior(
    "http://inventario.lucasdiesel.cl:3100/api/monitor/mensual",
    fecha
  );
  dataAnte && dataAnte.map((item) => (anterior += item.Total));

  // let difference = (values / metaDiaActual) * 100;
  // difference -= 100;
  // difference = difference < 0 ? difference * -1 : difference;
  let difference = (values * 100) / metaDiaActual;
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignContent="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Venta Mes Actual
            </Typography>
            <Typography variant="h4">{monto}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "error.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon
                color={values > metaDiaActual ? "success" : "error"}
                fontSize="small"
              >
                {/* {values > metaDiaActual ? <ArrowUpIcon /> : <ArrowDownIcon />} */}
              </SvgIcon>
              <Typography
                color={values > metaDiaActual ? "success.main" : "error.main"}
                variant="body2"
              >
                {difference.toFixed(2)}%
              </Typography>
            </Stack>
            <Typography fontWeight="bold" variant="caption">
              Diferencia Meta al día ({precio.format(metaDiaActual)})
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

TotalVenta.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  values: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
export default TotalVenta;
