import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useFetch, useFetchDiaria } from "../../hooks/useFetch";
import { FaArrowTrendUp } from "react-icons/fa6";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import PropTypes from "prop-types";

const Proyeccion = (props) => {
  const { sx, valor } = props;

  let total = 0;
  const precio = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems={"flex-start"} direction="row" spacing={3}>
          <Stack>
            <Typography color="text.secondary" variant="overline">
              Proyección Mes Actual
            </Typography>
            <Typography variant="h4">{precio.format(valor)}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 70,
              width: 70,
            }}
          >
            <SvgIcon>
              <FaArrowTrendUp />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

Proyeccion.propTypes = {
  sx: PropTypes.object,
};

export default Proyeccion;
