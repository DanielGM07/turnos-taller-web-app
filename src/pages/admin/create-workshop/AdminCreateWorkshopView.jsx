import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GenericForm from "../../../components/common/form/GenericForm.jsx";
import useAdminCreateWorkshop from "./hooks/useAdminCreateWorkshop.js";

export default function AdminCreateWorkshopView() {
  const navigate = useNavigate();
  const { onSubmit, isSubmitting } = useAdminCreateWorkshop();

  const fields = [
    {
      type: "text",
      name: "name",
      label: "Nombre del taller",
      rules: { required: "Obligatorio" },
    },
    {
      type: "text",
      name: "address",
      label: "Dirección",
      rules: { required: "Obligatorio" },
    },
    {
      type: "time",
      name: "opens_at",
      label: "Hora de apertura",
      rules: { required: "Obligatorio" },
    },
    {
      type: "time",
      name: "closes_at",
      label: "Hora de cierre",
      rules: { required: "Obligatorio" },
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Crear Taller
        </Typography>

        <GenericForm
          fields={fields}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Crear taller"
          showCancel
          cancelLabel="Volver"
          onCancel={() => navigate("/admin/workshops")}
        />
      </Paper>
    </Box>
  );
}
