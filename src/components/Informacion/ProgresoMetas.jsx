import {
  Avatar,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ScaleIcon from "@heroicons/react/24/solid/ScaleIcon";
import { Box } from "@mui/system";
const ProgresoMetas = (props) => {
  const { porcentaje, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" gutterBottom variant="overline">
              Progreso de Meta
            </Typography>
            <Typography variant="h4">{porcentaje.toFixed(2)}%</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <ScaleIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress
            value={porcentaje}
            variant="determinate"
          ></LinearProgress>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProgresoMetas;
