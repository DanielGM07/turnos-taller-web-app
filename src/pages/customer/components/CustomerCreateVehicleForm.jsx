// src/pages/customer/components/CustomerCreateVehicleForm.jsx
import { Paper, Box, Typography } from "@mui/material";
import GenericForm from "../../../components/common/form/GenericForm.jsx";
import useCustomerCreateVehicleForm from "../hooks/useCustomerCreateVehicleForm.jsx";

const VEHICLE_FIELDS = [
  {
    type: "text",
    name: "brand",
    label: "Marca",
    md: 6,
    rules: {
      required: "La marca es obligatoria",
    },
  },
  {
    type: "text",
    name: "model",
    label: "Modelo",
    md: 6,
    rules: {
      required: "El modelo es obligatorio",
    },
  },
  {
    type: "number",
    name: "year",
    label: "Año",
    md: 4,
    rules: {
      required: "El año es obligatorio",
      min: { value: 1900, message: "Ingrese un año válido" },
      max: {
        value: new Date().getFullYear() + 1,
        message: "El año no puede ser mayor al actual + 1",
      },
    },
  },
  {
    type: "text",
    name: "license_plate",
    label: "Patente",
    md: 4,
    rules: {
      required: "La patente es obligatoria",
    },
  },
  {
    type: "text",
    name: "color",
    label: "Color",
    md: 4,
  },
];

export default function CustomerCreateVehicleForm() {
  const { form, onSubmit, isSubmitting } = useCustomerCreateVehicleForm();

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <Paper
      elevation={2}
      sx={(theme) => ({
        maxWidth: 800,
        mx: "auto",
        p: 3,
        borderRadius: 1,
        // El theme ya pone background para el Paper (paper: "#1E1E26")
        border: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={600} color="text.primary">
          Registrar vehículo
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Completa los datos de tu vehículo para asociarlo a tu cuenta.
        </Typography>
      </Box>

      <GenericForm
        form={form}
        fields={VEHICLE_FIELDS}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Guardar vehículo"
        cancelLabel="Cancelar"
        showCancel
        onCancel={handleCancel}
        layout="grid"
      />
    </Paper>
  );
}
