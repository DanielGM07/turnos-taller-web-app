// src/pages/customer/components/CustomerDetail.jsx
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
  Grid,
  Chip,
  Stack,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BadgeIcon from "@mui/icons-material/Badge";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import useCustomerDetail from "../hooks/useCustomerDetail.jsx";
import LabeledValue from "./LabeledValue.jsx";
import AppointmentsList from "./AppointmentsList.jsx";
import VehiclesList from "./VehiclesList.jsx";

export default function CustomerDetail() {
  const [tabIndex, setTabIndex] = useState(0);

  const {
    customerId,
    customer,
    vehicles,
    appointments,
    isLoadingCustomer,
    isErrorCustomer,
    isAnyTabLoading,
    hasTabError,
    refetchCustomer,
    refetchVehicles,
    refetchAppts,
  } = useCustomerDetail();

  if (!customerId) {
    return (
      <Alert severity="warning">
        No se proporcionó el ID de cliente en la URL.
      </Alert>
    );
  }

  if (isLoadingCustomer) {
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

  if (isErrorCustomer) {
    return (
      <Alert severity="error">
        Error cargando cliente.{" "}
        <Button color="inherit" size="small" onClick={refetchCustomer}>
          Reintentar
        </Button>
      </Alert>
    );
  }

  if (!customer) {
    return <Alert severity="info">No se encontró el cliente.</Alert>;
  }

  const isLoading = isAnyTabLoading(tabIndex);
  const hasError = hasTabError(tabIndex);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.100",
        p: 3,
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="h4"
            sx={{ mt: 3, mb: 3, fontWeight: "bold", color: "primary.main" }}
          >
            Detalle del Cliente
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              onClick={() => {
                refetchCustomer();
                if (tabIndex === 1) refetchVehicles();
                if (tabIndex === 2) refetchAppts();
              }}
            >
              Refrescar
            </Button>
            <Button variant="contained">Nuevo turno</Button>
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
              label="Vista General"
              sx={{ textTransform: "none", fontWeight: 600 }}
            />
            <Tab
              label={`Vehículos${
                Array.isArray(vehicles) ? ` (${vehicles.length})` : ""
              }`}
              sx={{ textTransform: "none", fontWeight: 600 }}
            />
            <Tab
              label="Turnos"
              sx={{ textTransform: "none", fontWeight: 600 }}
            />
            <Tab
              label="Documentación"
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
                {customer.initials}
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {customer.fullName}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                  {customer.dni ? (
                    <Chip
                      icon={<BadgeIcon />}
                      label={customer.dni}
                      size="small"
                    />
                  ) : null}
                  {customer.birth_date ? (
                    <Chip
                      icon={<CalendarMonthIcon />}
                      label={`${customer.birthDateFormatted}${
                        typeof customer.age === "number"
                          ? ` • ${customer.age} años`
                          : ""
                      }`}
                      size="small"
                    />
                  ) : null}
                </Stack>
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
                  if (tabIndex === 1) refetchVehicles();
                  if (tabIndex === 2) refetchAppts();
                }}
              >
                Reintentar
              </Button>
            </Alert>
          )}

          {/* Tab 0: Vista General */}
          {tabIndex === 0 && !isLoading && !hasError && (
            <Grid container columnSpacing={3} rowSpacing={3}>
              <Grid xs={12} md={6}>
                <LabeledValue
                  label="DNI"
                  value={customer.dni}
                  icon={<BadgeIcon color="action" />}
                  copyable
                />
                <LabeledValue
                  label="Correo Electrónico"
                  value={customer.email}
                  icon={<MailOutlineIcon color="action" />}
                  copyable
                />
              </Grid>
              <Grid xs={12} md={6}>
                <LabeledValue
                  label="Fecha de Nacimiento"
                  value={
                    customer.birth_date
                      ? `${customer.birthDateFormatted}${
                          typeof customer.age === "number"
                            ? ` (${customer.age} años)`
                            : ""
                        }`
                      : "-"
                  }
                  icon={<CalendarMonthIcon color="action" />}
                />
                <LabeledValue
                  label="Fecha de alta"
                  value={customer.createdAtFormatted}
                  icon={<LocationOnOutlinedIcon color="action" />}
                />
              </Grid>
            </Grid>
          )}

          {/* Tab 1: Vehículos */}
          {tabIndex === 1 && !isLoading && !hasError && (
            <Box sx={{ mt: 1 }}>
              {Array.isArray(vehicles) && vehicles.length > 0 ? (
                <VehiclesList items={vehicles} />
              ) : (
                <Alert severity="info">
                  Este cliente no tiene vehículos cargados.
                </Alert>
              )}
            </Box>
          )}

          {/* Tab 2: Turnos */}
          {tabIndex === 2 && !isLoading && !hasError && (
            <Box sx={{ mt: 1 }}>
              {Array.isArray(appointments) && appointments.length > 0 ? (
                <AppointmentsList items={appointments} />
              ) : (
                <Alert severity="info">Este cliente no tiene turnos.</Alert>
              )}
            </Box>
          )}

          {/* Tab 3: Documentación */}
          {tabIndex === 3 && (
            <Box sx={{ mt: 1 }}>
              <List>
                <ListItem sx={{ borderRadius: 2 }}>
                  <ListItemIcon>
                    <DescriptionOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sin documentos"
                    secondary="Cuando haya endpoint de documentos, los listamos aquí."
                  />
                </ListItem>
              </List>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
