// src/pages/mechanic/MechanicWorkshopsView.jsx
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";

import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import theme from "../../styles/theme.js";
import GenericTable from "../../components/common/table/GenericTable.jsx";
import { formatDate } from "../../utils/formatDate.utils";
import useMechanicWorkshopsPage from "./hooks/useMechanicWorkshopsPage.jsx";

export default function MechanicWorkshopsView() {
  const {
    allWorkshops,
    myWorkshopIds,
    isLoadingAll,
    isErrorAll,
    errorAll,
    isMutating,
    enrollInWorkshop,
    unenrollFromWorkshop,
    snackbar,
    closeSnackbar,
  } = useMechanicWorkshopsPage();

  const columns = [
    {
      id: "name",
      label: "Nombre",
      align: "left",
    },
    {
      id: "address",
      label: "Dirección",
      align: "left",
    },
    {
      id: "opens_at",
      label: "Abre",
      align: "center",
      render: (row) => row.opens_at ?? "-",
    },
    {
      id: "closes_at",
      label: "Cierra",
      align: "center",
      render: (row) => row.closes_at ?? "-",
    },
    {
      id: "created_at",
      label: "Fecha alta",
      align: "center",
      render: (row) => (row.created_at ? formatDate(row.created_at) : "-"),
    },
    {
      id: "actions",
      label: "Acciones",
      align: "right",
      render: (row) => {
        const alreadyEnrolled = myWorkshopIds.has(row.id);
        const label = alreadyEnrolled ? "Desinscribirme" : "Inscribirme";

        const handleClick = (e) => {
          e.stopPropagation();
          if (alreadyEnrolled) {
            unenrollFromWorkshop(row.id, row.name);
          } else {
            enrollInWorkshop(row.id, row.name);
          }
        };

        return (
          <button
            type="button"
            style={{
              borderRadius: 999,
              border: alreadyEnrolled
                ? `1px solid ${theme.palette.error.main}`
                : "none",
              padding: "6px 12px",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              cursor: isMutating ? "default" : "pointer",
              opacity: isMutating ? 0.6 : 1,
              backgroundColor: alreadyEnrolled
                ? "transparent"
                : theme.palette.primary.main,
              color: alreadyEnrolled
                ? theme.palette.error.main
                : theme.palette.primary.contrastText,
            }}
            disabled={isMutating}
            onClick={handleClick}
          >
            <HowToRegIcon fontSize="small" />
            {label}
          </button>
        );
      },
    },
  ];

  let content;

  if (isLoadingAll) {
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 4,
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else if (isErrorAll) {
    content = (
      <Alert severity="error">
        Error cargando talleres.{" "}
        {errorAll?.data?.message && (
          <span>Detalle: {errorAll.data.message}</span>
        )}
      </Alert>
    );
  } else {
    content = (
      <GenericTable
        title="Todos los talleres"
        subtitle="Explorá todos los talleres disponibles; podés inscribirte o desinscribirte."
        columns={columns}
        data={Array.isArray(allWorkshops) ? allWorkshops : []}
        isLoading={false}
        isError={false}
        searchFields={null}
        onSearch={() => {}}
        onClear={() => {}}
        pagination={null}
      />
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        p: 3,
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            gap: 1.5,
          }}
        >
          <HomeRepairServiceIcon color="primary" />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Talleres disponibles
          </Typography>
        </Box>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          {content}
        </Paper>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <MuiAlert
            onClose={closeSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Box>
  );
}
