import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GenericForm from "../../../components/common/form/GenericForm.jsx";
import useAdminCreateMechanic from "./hooks/useAdminCreateMechanic.js";

export default function AdminCreateMechanicView() {
  const navigate = useNavigate();
  const { onSubmit, isSubmitting, specialtiesOptions } =
    useAdminCreateMechanic();

  const fields = [
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
      type: "email",
      name: "email",
      label: "Correo electrónico",
      rules: { required: "Obligatorio" },
    },
    {
      type: "date",
      name: "birth_date",
      label: "Fecha de nacimiento",
      rules: { required: "Obligatorio" },
    },
    {
      type: "select-multiple",
      name: "specialties",
      label: "Especialidades",
      options: specialtiesOptions,
      rules: { required: "Seleccioná al menos una" },
    },
    {
      type: "number",
      name: "commission_percentage",
      label: "Porcentaje de comisión (%)",
      rules: { required: "Obligatorio" },
    },
    {
      type: "password",
      name: "password",
      label: "Contraseña",
      rules: { required: "Obligatorio", minLength: 6 },
    },
    {
      type: "password",
      name: "confirm_password",
      label: "Confirmar contraseña",
      rules: {
        required: "Obligatorio",
        validate: (value, data) =>
          value === data.password || "Las contraseñas no coinciden",
      },
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Crear Mecánico
        </Typography>

        <GenericForm
          fields={fields}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Crear mecánico"
          showCancel
          cancelLabel="Volver"
          onCancel={() => navigate("/admin/mechanics")}
        />
      </Paper>
    </Box>
  );
}
