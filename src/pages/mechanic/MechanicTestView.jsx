import { Box, Typography } from "@mui/material";

export default function MechanicTestView() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={600}>
        Vista de prueba Mecánico
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Esto es un placeholder. Luego acá va la vista real del rol MECÁNICO.
      </Typography>
    </Box>
  );
}
