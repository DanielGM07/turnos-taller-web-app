// src/pages/customer/CustomerCreateAppointmentPage.jsx

import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import CustomerCreateAppointmentForm from "../../pages/customer/components/CustomerCreateAppointmentForm.jsx";
import useAuth from "../../hooks/useAuth.jsx"; // ajustá el path a tu hook real

const CustomerCreateAppointmentView = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Ajustá esto según cómo guardes el customer en tu auth
  const customerId = user?.customer?.id ?? user?.id;

  const handleSuccess = () => {
    // redirigís a donde quieras: lista de turnos, dashboard, etc.
    navigate(`/customer/detail/${customerId}`);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Nuevo turno
      </Typography>

      <CustomerCreateAppointmentForm
        customerId={customerId}
        onSuccess={handleSuccess}
      />
    </Box>
  );
};

export default CustomerCreateAppointmentView;
