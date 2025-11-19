import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import GenericForm from "../../../components/common/form/GenericForm.jsx";
import useAdminEditMechanic from "./hooks/useAdminEditMechanic.js";

export default function AdminEditMechanicView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mechanic, isLoading, isSubmitting, fields, form, onSubmit, isDirty } =
    useAdminEditMechanic(id);

  if (isLoading && !mechanic) {
    return (
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!mechanic) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Editar mecánico
        </Typography>

        <GenericForm
          fields={fields}
          onSubmit={onSubmit}
          form={form}
          showSubmit={false} // usamos botones custom
          showCancel={false}
        />

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/mechanics")}
          >
            Volver a lista de mecánicos
          </Button>

          <Button
            variant="contained"
            disabled={!isDirty || isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Guardando..." : "Modificar"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
