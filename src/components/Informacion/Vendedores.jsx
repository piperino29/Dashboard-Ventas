import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  calcularDiasHabilesChile,
  diasTranscurridos,
} from "../../utils/DiasHabiles";

const Vendedores = (props) => {
  const { vendedores, sx, mes, title } = props;
  const precio = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });
  let anio = new Date();
  var diaTranscurrido = diasTranscurridos();
  var diaHabil = calcularDiasHabilesChile(
    anio.getFullYear(),
    anio.getMonth() + 1
  );

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <Card sx={sx}>
      <CardHeader title={title} sx={{ textAlign: "center" }} />
      <Box sx={{ minWidth: 800 }}>
        <Table sx={{ tableLayout: "auto" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Vendedor</StyledTableCell>
              <StyledTableCell align="center">Venta Hoy</StyledTableCell>
              <StyledTableCell align="center">Meta Diaria</StyledTableCell>
              <StyledTableCell align="center">Cumpliento Día</StyledTableCell>
              <StyledTableCell align="center">Venta Mes</StyledTableCell>
              <StyledTableCell align="center">Meta al Día</StyledTableCell>
              <StyledTableCell align="center">
                Cumpliento al Dia
              </StyledTableCell>
              <StyledTableCell align="center">
                Meta Mes {mes.to}
              </StyledTableCell>
              <StyledTableCell align="center">
                Cumplimiento Meta
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendedores &&
              vendedores.map((ven) => {
                return (
                  <StyledTableRow hover key={ven.codvende || ven.KAM}>
                    <StyledTableCell align="center">
                      {ven.NombreVendedor}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {precio.format(ven.TotalDiaria || ven.TotalDia || 0)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {precio.format(ven[mes] / diaHabil)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {(
                        (ven.TotalDiaria * 100 || ven.TotalDia * 100 || 0) /
                        (ven[mes] / diaHabil)
                      ).toFixed(2)}
                      %
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {ven.Total ? precio.format(ven.Total) : "$" + 0}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {precio.format((ven[mes] / diaHabil) * diaTranscurrido)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {ven.Total
                        ? (
                            (ven.Total * 100) /
                            ((ven[mes] / diaHabil) * diaTranscurrido)
                          ).toFixed(2)
                        : 0}
                      %
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {precio.format(ven[mes])}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {ven.Total
                        ? ((ven.Total * 100) / ven[mes]).toFixed(2)
                        : 0}
                      %
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};
export default Vendedores;
