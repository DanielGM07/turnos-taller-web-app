// src/pages/admin/AdminDashboardView.jsx
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Stack,
  Button,
  Divider,
  Chip,
  Avatar,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import HandymanIcon from "@mui/icons-material/Handyman";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import StoreIcon from "@mui/icons-material/Store";
import PaidIcon from "@mui/icons-material/Paid";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { useNavigate } from "react-router-dom";

import { useDashboardStatsQuery } from "../../apis/admin/admin.api";

export default function AdminDashboardView() {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useDashboardStatsQuery(
    undefined,
    {
      // por si acaso, para evitar refetch raro
      refetchOnMountOrArgChange: true,
    },
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error cargando dashboard:{" "}
          {error?.data?.message || error?.error || "Error desconocido"}
        </Alert>
      </Box>
    );
  }

  // --------- Normalización de data ---------
  const totals = data?.totals || {};
  const appointmentsByStatus = data?.appointmentsByStatus || [];
  const appointmentsPerDay = data?.appointmentsPerDay || [];
  const revenuePerDay = data?.revenuePerDay || [];
  const topMechanics = data?.topMechanics || [];

  // ingresos últimos 30 días (sumando revenuePerDay)
  const totalRevenueLast30Days = revenuePerDay.reduce((acc, r) => {
    const n = Number(r.total ?? r.totalRevenue ?? 0);
    return acc + (Number.isNaN(n) ? 0 : n);
  }, 0);

  // total turnos últimos 30 días (por appointmentsPerDay)
  const totalAppointmentsLast30Days = appointmentsPerDay.reduce((acc, r) => {
    const n = Number(r.count ?? r.total ?? 0);
    return acc + (Number.isNaN(n) ? 0 : n);
  }, 0);

  // Mapa legible para estados
  const statusLabels = {
    PENDING: "Pendiente",
    CONFIRMED: "Confirmado",
    IN_PROGRESS: "En progreso",
    COMPLETED: "Completado",
    CANCELED: "Cancelado",
    NO_SHOW: "No se presentó",
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Dashboard administrador
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Resumen general de turnos, clientes, talleres, mecánicos e ingresos.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<CalendarMonthIcon />}
            onClick={() => navigate("/admin/appointments")}
          >
            Ver turnos
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<PeopleIcon />}
            onClick={() => navigate("/admin/customers")}
          >
            Ver clientes
          </Button>
        </Stack>
      </Box>

      {/* Row 1: Cards de métricas principales */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Turnos totales
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {totals.appointments ?? 0}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Últimos 30 días: {totalAppointmentsLast30Days}
                  </Typography>
                </Box>
                <Avatar>
                  <CalendarMonthIcon fontSize="small" />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Clientes
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {totals.customers ?? 0}
                  </Typography>
                </Box>
                <Avatar>
                  <PeopleIcon fontSize="small" />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Mecánicos
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {totals.mechanics ?? 0}
                  </Typography>
                </Box>
                <Avatar>
                  <HandymanIcon fontSize="small" />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Talleres
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {totals.workshops ?? 0}
                  </Typography>
                </Box>
                <Avatar>
                  <StoreIcon fontSize="small" />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Row 2: Más métricas */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Vehículos
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {totals.vehicles ?? 0}
                  </Typography>
                </Box>
                <Avatar>
                  <DirectionsCarIcon fontSize="small" />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Servicios
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {totals.services ?? 0}
                  </Typography>
                </Box>
                <Avatar>
                  <HomeRepairServiceIcon fontSize="small" />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    Ingresos (30 días)
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    ${totalRevenueLast30Days.toFixed(2)}
                  </Typography>
                </Box>
                <Avatar>
                  <PaidIcon fontSize="small" />
                </Avatar>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Row 3: Turnos por estado + “gráfico” turnos por día */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Turnos por estado */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Turnos por estado
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Distribución de los turnos según su estado actual.
              </Typography>
              <Stack spacing={0.75}>
                {appointmentsByStatus.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No hay datos disponibles.
                  </Typography>
                )}
                {appointmentsByStatus.map((row, idx) => {
                  const status = row.status ?? row.a_status ?? "";
                  const count = Number(row.count ?? 0);
                  return (
                    <Stack
                      key={idx}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Chip
                        label={statusLabels[status] || status || "Desconocido"}
                        size="small"
                        variant="outlined"
                      />
                      <Typography variant="body2">{count}</Typography>
                    </Stack>
                  );
                })}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Turnos por día (últimos 30 días) */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Turnos por día (últimos 30 días)
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1.5 }}
              >
                Tendencia diaria de creación de turnos.
              </Typography>

              {appointmentsPerDay.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No hay datos de turnos en los últimos 30 días.
                </Typography>
              ) : (
                <Box
                  sx={{
                    maxHeight: 240,
                    overflow: "auto",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    p: 1,
                  }}
                >
                  {appointmentsPerDay.map((row, idx) => {
                    const rawDate = row.date ?? row.a_date ?? "";
                    const dateLabel =
                      typeof rawDate === "string"
                        ? rawDate.slice(0, 10)
                        : new Date(rawDate).toISOString().slice(0, 10);
                    const count = Number(row.count ?? 0);

                    return (
                      <Stack
                        key={idx}
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mb: 0.5 }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ width: 90, flexShrink: 0 }}
                        >
                          {dateLabel}
                        </Typography>
                        <Box
                          sx={{
                            flexGrow: 1,
                            height: 8,
                            borderRadius: 999,
                            bgcolor: "action.hover",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              width: `${Math.min(count * 10, 100)}%`,
                              height: "100%",
                              bgcolor: "primary.main",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{ width: 24, textAlign: "right" }}
                        >
                          {count}
                        </Typography>
                      </Stack>
                    );
                  })}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Row 4: Top mecánicos */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Box>
                  <Typography variant="h6">Top mecánicos</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mejores valorados por los clientes.
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<HandymanIcon />}
                  onClick={() => navigate("/admin/mechanics")}
                >
                  Ver mecánicos
                </Button>
              </Stack>

              <Divider sx={{ mb: 1.5 }} />

              {topMechanics.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  Todavía no hay calificaciones registradas.
                </Typography>
              )}

              <Stack spacing={1.5}>
                {topMechanics.map((mec) => (
                  <Stack
                    key={mec.id}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32 }}>
                        <ReviewsIcon fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {mec.first_name} {mec.last_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {mec.specialties?.join(", ") || "Sin especialidades"}
                        </Typography>
                      </Box>
                    </Stack>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="body2" fontWeight={600}>
                        {Number(mec.average_rating ?? 0).toFixed(1)}/10
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {mec.ratings_count ?? 0} reviews
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Podés usar esta columna para cualquier otro widget extra (últimos pagos, etc.) */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Accesos rápidos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Navegá rápido a las secciones clave del panel de administración.
              </Typography>
              <Stack spacing={1}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin/workshops")}
                  startIcon={<StoreIcon />}
                >
                  Gestionar talleres
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin/mechanics")}
                  startIcon={<HandymanIcon />}
                >
                  Gestionar mecánicos
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin/customers")}
                  startIcon={<PeopleIcon />}
                >
                  Gestionar clientes
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin/services")}
                  startIcon={<HomeRepairServiceIcon />}
                >
                  Gestionar servicios
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
