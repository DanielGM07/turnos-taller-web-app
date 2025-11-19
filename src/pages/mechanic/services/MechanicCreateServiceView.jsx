import { Box, Paper, Typography } from "@mui/material";
import GenericForm from "../../../components/common/form/GenericForm.jsx";
import useMechanicCreateService from "./hooks/useMechanicCreateService.jsx";

export default function MechanicCreateServiceView() {
  const { onSubmit, isSubmitting } = useMechanicCreateService();

  const fields = [
    {
      type: "text",
      name: "name",
      label: "Nombre del servicio",
      rules: { required: "Obligatorio" },
    },
    {
      type: "text",
      name: "description",
      label: "Descripción (opcional)",
      rules: {},
    },
    {
      type: "number",
      name: "min_price",
      label: "Precio mínimo",
      rules: {
        required: "Obligatorio",
        validate: (value) =>
          !isNaN(value) && Number(value) >= 0
            ? true
            : "Debe ser un número mayor o igual a 0",
      },
    },
    {
      type: "number",
      name: "max_price",
      label: "Precio máximo",
      rules: {
        required: "Obligatorio",
        validate: (value) =>
          !isNaN(value) && Number(value) >= 0
            ? true
            : "Debe ser un número mayor o igual a 0",
      },
    },
  ];

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>
          Crear servicio
        </Typography>
        <GenericForm
          fields={fields}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </Paper>
    </Box>
  );
}
