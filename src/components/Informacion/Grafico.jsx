import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import ComputerDesktopIcon from "@heroicons/react/24/solid/ComputerDesktopIcon";
import DeviceTabletIcon from "@heroicons/react/24/solid/DeviceTabletIcon";
import PhoneIcon from "@heroicons/react/24/solid/PhoneIcon";
import { Chart } from "../Chart";

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: [
      "#1F78B4", // Azul
      "#33A02C", // Verde
      "#FF7F00", // Naranja
      "#6A3D9A", // Morado
      "#E31A1C", // Rojo
      "#7570B3", // Violeta
      "#A6CEE3", // Celeste
    ],

    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};
const iconMap = {
  Desktop: (
    <SvgIcon>
      <ComputerDesktopIcon />
    </SvgIcon>
  ),
  Tablet: (
    <SvgIcon>
      <DeviceTabletIcon />
    </SvgIcon>
  ),
  Phone: (
    <SvgIcon>
      <PhoneIcon />
    </SvgIcon>
  ),
};
const Grafico = (props) => {
  const { chartSeries, labels, total, sx } = props;
  const chartOptions = useChartOptions(labels);
  const precio = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  return (
    <Card sx={sx}>
      <CardHeader title="Venta Mes" />
      <CardContent>
        <Chart
          height={200}
          options={chartOptions}
          series={chartSeries}
          type="heatmap"
          width="50%"
        />
        <Stack
          alignItems="end"
          direction="column"
          justifyContent="right"
          spacing={2}
          sx={{ m: 2 }}
        >
          {chartSeries.map((item, index) => {
            const label = labels[index];

            return (
              <Box
                key={label}
                sx={{
                  display: "flex",
                }}
              >
                {iconMap[label]}
                <Typography sx={{}} variant="p">
                  {label}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {((item * 100) / total).toFixed(2)}%
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Grafico;
