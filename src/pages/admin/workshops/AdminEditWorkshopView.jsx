import { Box, Paper, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import EditEntityForm from "../../../components/common/form/EditEntityForm.jsx";
import useAdminEditWorkshop from "./hooks/useAdminEditWorkshop.js";

export default function AdminEditWorkshopView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { workshop, fields, onSubmit, isSubmitting, isDirty } =
    useAdminEditWorkshop(id);

  if (!workshop) return null; // o spinner si querés

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Editar Taller
        </Typography>

        <EditEntityForm
          fields={fields}
          initialValues={workshop}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          disabled={!isDirty}
          onCancel={() => navigate("/admin/workshops")}
          submitLabel="Modificar"
        />

        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          onClick={() => navigate("/admin/workshops")}
        >
          Volver a talleres
        </Button>
      </Paper>
    </Box>
  );
}
