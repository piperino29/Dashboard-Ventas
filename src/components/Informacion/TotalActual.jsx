import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useFetch, useFetchDiaria } from "../../hooks/useFetch";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import PropTypes from "prop-types";

const TotalActual = (props) => {
  const { fecha, sx, metaDia, url } = props;

  let total = 0;
  const precio = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });
  const { dataDiaria, loading, error } = useFetchDiaria(url, fecha);
  dataDiaria && dataDiaria.map((item) => (total += item.TotalDia));
  const monto = precio.format(total);
  let difference = (total / metaDia) * 100;
  difference -= 100;
  difference = difference < 0 ? difference * -1 : difference;
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems={"flex-start"}
          direction="row"
          justifyContent={"space-between"}
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Venta Día
            </Typography>
            <Typography variant="h4">{monto}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
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
                color={total > metaDia ? "success" : "error"}
                fontSize="small"
              >
                {total > metaDia ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={total > metaDia ? "success.main" : "error.main"}
                variant="body2"
              >
                {difference.toFixed(2)}%
              </Typography>
            </Stack>
            <Typography fontWeight="bold" variant="caption">
              Diferencia Meta Diaria ({precio.format(metaDia)})
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

TotalActual.propTypes = {
  sx: PropTypes.object,
};

export default TotalActual;
