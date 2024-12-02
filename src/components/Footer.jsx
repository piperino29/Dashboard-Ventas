import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}
      component="footer"
    >
      <Container maxWidth="sm">
        asdasd
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © Departamento TI (FJA) V2.0 2024."}{" "}
        </Typography>
      </Container>
    </Box>
  );
};
export default Footer;
