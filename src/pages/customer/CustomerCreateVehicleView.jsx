// src/pages/customer/CustomerCreateVehicleView.jsx
import { Box, Paper, Typography } from "@mui/material";
import CustomerCreateVehicleForm from "./components/CustomerCreateVehicleForm.jsx";

export default function CustomerCreateVehicleView() {
  return (
    <Box
      sx={(theme) => ({
        p: 3,
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default, // "#15141A"
      })}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 800,
          mx: "auto",
          mb: 2,
          p: 0,
          bgcolor: "transparent",
        }}
      >
        <Typography variant="h4" fontWeight={600} color="text.primary">
          Nuevo vehículo
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Registrá un vehículo para poder gestionar turnos y servicios.
        </Typography>
      </Paper>

      <CustomerCreateVehicleForm />
    </Box>
  );
}
