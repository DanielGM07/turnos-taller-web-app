import { Box, Paper, Typography, Button } from "@mui/material";
import GenericForm from "../../components/common/form/GenericForm.jsx";
import useRegister from "./hooks/useRegister.jsx";
import { useNavigate } from "react-router-dom";
import theme from "../../styles/theme.js";

export default function Register() {
  const { onSubmit, isSubmitting } = useRegister();
  const navigate = useNavigate();

  const fields = [
    {
      type: "text",
      name: "dni",
      label: "DNI",
      rules: { required: "Obligatorio" },
    },
    {
      type: "text",
      name: "first_name",
      label: "Nombre",
      rules: { required: "Obligatorio" },
    },
    {
      type: "text",
      name: "last_name",
      label: "Apellido",
      rules: { required: "Obligatorio" },
    },
    {
      type: "date",
      name: "birth_date",
      label: "Fecha de nacimiento",
      rules: { required: "Obligatorio" },
    },
    {
      type: "email",
      name: "email",
      label: "Correo electrónico",
      rules: { required: "Obligatorio" },
    },
    {
      type: "password",
      name: "password",
      label: "Contraseña",
      rules: { required: "Obligatorio" },
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: theme.palette.background,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 450,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" textAlign="center" mb={2}>
          Crear cuenta
        </Typography>

        <GenericForm
          fields={fields}
          onSubmit={onSubmit}
          submitLabel="Registrarme"
          isSubmitting={isSubmitting}
          showCancel={false}
        />

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2">¿Ya tienes una cuenta?</Typography>

          <Button size="small" sx={{ mt: 1 }} onClick={() => navigate("/")}>
            Iniciar sesión
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
