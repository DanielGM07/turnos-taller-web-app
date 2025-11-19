// src/pages/mechanic/components/MechanicDetail.jsx
import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  CardContent,
  Tabs,
  Tab,
  Divider,
  Paper,
  Stack,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import BuildIcon from "@mui/icons-material/Build";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import useMechanicDetail from "../hooks/useMechanicDetail.jsx";
import theme from "../../../styles/theme.js";

import MechanicAppointmentsTab from "./MechanicAppointmentsTab.jsx";
import MechanicWorkshopsTab from "./MechanicWorkshopsTab.jsx";

export default function MechanicDetail() {
  const [tabIndex, setTabIndex] = useState(0);

  const {
    mechanicId,
    mechanic,
    appointments,
    workshops,
    isLoadingMechanic,
    isErrorMechanic,
    isAnyTabLoading,
    hasTabError,
    refetchMechanic,
    refetchAppointments,
    refetchWorkshops,
  } = useMechanicDetail();

  if (!mechanicId) {
    return (
      <Alert severity="warning">
        No se proporcionó el ID de mecánico en la URL.
      </Alert>
    );
  }

  if (isLoadingMechanic) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isErrorMechanic) {
    return (
      <Alert severity="error">
        Error cargando datos del mecánico.{" "}
        <Button color="inherit" size="small" onClick={refetchMechanic}>
          Reintentar
        </Button>
      </Alert>
    );
  }

  if (!mechanic) {
    return (
      <Alert severity="info">No se encontró el mecánico solicitado.</Alert>
    );
  }

  const isLoading = isAnyTabLoading(tabIndex);
  const hasError = hasTabError(tabIndex);

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
        {/* Título + acciones */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="h4"
            sx={{ mt: 3, mb: 3, fontWeight: "bold", color: "primary.main" }}
          >
            Mi perfil de mecánico
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              onClick={() => {
                refetchMechanic();
                if (tabIndex === 1) refetchAppointments();
                if (tabIndex === 2) refetchWorkshops();
              }}
            >
              Refrescar
            </Button>
          </Stack>
        </Stack>

        <Paper sx={{ p: 3, borderRadius: 3 }}>
          {/* Tabs */}
          <Tabs
            value={tabIndex}
            onChange={(e, val) => setTabIndex(val)}
            indicatorColor="secondary"
            textColor="inherit"
            sx={{ mb: 2 }}
          >
            <Tab
              label="Vista general"
              sx={{ textTransform: "none", fontWeight: 600 }}
            />
            <Tab
              label={`Mis turnos${
                Array.isArray(appointments) ? ` (${appointments.length})` : ""
              }`}
              sx={{ textTransform: "none", fontWeight: 600 }}
            />
            <Tab
              label={`Mis talleres${
                Array.isArray(workshops) ? ` (${workshops.length})` : ""
              }`}
              sx={{ textTransform: "none", fontWeight: 600 }}
            />
            <Tab
              label="Mi resumen"
              sx={{ textTransform: "none", fontWeight: 600 }}
            />
          </Tabs>

          <Divider sx={{ mb: 3 }} />

          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", py: 0 }}>
            <CardContent
              sx={{ display: "flex", alignItems: "center", gap: 2, p: 0 }}
            >
              <Avatar
                sx={{ width: 100, height: 100, bgcolor: "primary.light" }}
              >
                {mechanic.initials}
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {mechanic.fullName}
                </Typography>
                {mechanic.specialties && mechanic.specialties !== "-" && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Especialidades: {mechanic.specialties}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Estados por tab */}
          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {hasError && (
            <Alert severity="error">
              Ocurrió un error.{" "}
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  if (tabIndex === 1) refetchAppointments();
                  if (tabIndex === 2) refetchWorkshops();
                }}
              >
                Reintentar
              </Button>
            </Alert>
          )}

          {/* Tab 0: Vista general */}
          {tabIndex === 0 && !isLoading && !hasError && (
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              }}
            >
              <Box>
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <MailOutlineIcon color="action" />
                    <Typography variant="body2">
                      <strong>Correo:</strong> {mechanic.email || "-"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneIphoneIcon color="action" />
                    <Typography variant="body2">
                      <strong>Teléfono:</strong> {mechanic.phone || "-"}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
              <Box>
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarMonthIcon color="action" />
                    <Typography variant="body2">
                      <strong>Fecha de alta:</strong>{" "}
                      {mechanic.createdAtFormatted}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <BuildIcon color="action" />
                    <Typography variant="body2">
                      <strong>Total de turnos:</strong>{" "}
                      {Array.isArray(appointments) ? appointments.length : 0}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          )}

          {/* Tab 1: Mis turnos */}
          {tabIndex === 1 && !isLoading && !hasError && (
            <MechanicAppointmentsTab appointments={appointments} />
          )}

          {/* Tab 2: Mis talleres */}
          {tabIndex === 2 && !isLoading && !hasError && (
            <MechanicWorkshopsTab
              workshops={workshops}
              mechanicId={mechanicId}
              onAfterUnenroll={refetchWorkshops}
            />
          )}

          {/* Tab 3: Mi resumen (vacía por ahora) */}
          {tabIndex === 3 && !isLoading && !hasError && (
            <Box sx={{ mt: 1 }}>
              <Alert severity="info">
                Aquí vamos a mostrar un resumen general del mecánico (KPIs,
                productividad, etc.). Lo dejamos vacío por ahora.
              </Alert>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
