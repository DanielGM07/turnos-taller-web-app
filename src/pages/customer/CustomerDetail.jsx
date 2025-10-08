// CustomerDetail.jsx (MUI) — conectado a la API con RTK Query
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import BadgeIcon from "@mui/icons-material/Badge";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";

// Hooks generados por tu slice RTK Query
import {
  useViewCustomerQuery,
  useCustomerListVehiclesQuery,
  useCustomerListAppointmentsQuery,
} from "../../apis/customer/customer.api"; // ajustá la ruta si difiere

// --- Utilidades simples ---
const formatDate = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(d);
};

const formatTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ageFromBirthDate = (iso) => {
  const d = new Date(iso);
  if (isNaN(d)) return undefined;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
};

const initialsFrom = (first = "", last = "") =>
  `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();

const copy = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {}
};

function LabeledValue({ label, value, icon, copyable }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1" color="gray">
        {label}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        {icon}
        <Typography variant="h6" sx={{ wordBreak: "break-word" }}>
          {value ?? "-"}
        </Typography>
        {copyable && value ? (
          <Tooltip title="Copiar">
            <IconButton
              size="small"
              onClick={() => copy(value)}
              aria-label={`Copiar ${label}`}
            >
              <ContentCopyIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        ) : null}
      </Stack>
    </Box>
  );
}

function AppointmentsList({ items = [] }) {
  const byDate = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(a.date || a.start || a.when) -
          new Date(b.date || b.start || b.when),
      ),
    [items],
  );
  return (
    <List>
      {byDate.map((a) => {
        const dateStr = a.date || a.start || a.when;
        const title = a.title || a.reason || a.service_name || "Turno";
        const status = (a.status || a.state || "").toLowerCase();
        return (
          <ListItem
            key={a.id || `${dateStr}-${title}`}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText
              primary={`${formatDate(dateStr)} — ${formatTime(dateStr)}`}
              secondary={title}
            />
            {status && (
              <Chip
                size="small"
                label={status}
                color={
                  status.includes("confirm")
                    ? "success"
                    : status.includes("cancel")
                      ? "error"
                      : "warning"
                }
              />
            )}
          </ListItem>
        );
      })}
    </List>
  );
}

function VehiclesList({ items = [] }) {
  return (
    <List>
      {items.map((v) => (
        <ListItem key={v.id || v.plate} sx={{ borderRadius: 2, mb: 1 }}>
          <ListItemIcon>
            <DirectionsCarFilledIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${v.brand || v.make || "Vehículo"} ${v.model || ""} ${v.year || ""}`.trim()}
            secondary={`Patente: ${v.plate || v.license_plate || "-"}${v.color ? ` • Color: ${v.color}` : ""}`}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default function CustomerDetail() {
  const { id: customerId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);

  // Datos del cliente
  const {
    data: customer,
    isLoading: isLoadingCustomer,
    isError: isErrorCustomer,
    refetch: refetchCustomer,
  } = useViewCustomerQuery(customerId, { skip: !customerId });

  // Vehículos del cliente
  const {
    data: vehiclesData,
    isLoading: isLoadingVehicles,
    isError: isErrorVehicles,
    refetch: refetchVehicles,
  } = useCustomerListVehiclesQuery({ customerId }, { skip: !customerId });

  // Turnos del cliente
  const {
    data: apptsData,
    isLoading: isLoadingAppts,
    isError: isErrorAppts,
    refetch: refetchAppts,
  } = useCustomerListAppointmentsQuery({ customerId }, { skip: !customerId });

  const isLoading =
    isLoadingCustomer ||
    (tabIndex === 1 && isLoadingVehicles) ||
    (tabIndex === 2 && isLoadingAppts);
  const hasError =
    isErrorCustomer ||
    (tabIndex === 1 && isErrorVehicles) ||
    (tabIndex === 2 && isErrorAppts);

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

  const first_name = customer.first_name || customer.name || "";
  const last_name = customer.last_name || customer.surname || "";
  const email = customer.email;
  const dni = customer.dni;
  const address = customer.address || "-";
  const phone_number = customer.phone_number || customer.phone || "";
  const birth_date = customer.birth_date;

  const age = ageFromBirthDate(birth_date);

  const vehicles = vehiclesData || [];
  const appointments = apptsData || [];

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
              label={`Vehículos${Array.isArray(vehicles) ? ` (${vehicles.length})` : ""}`}
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
                {initialsFrom(first_name, last_name)}
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {`${last_name}, ${first_name}`}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                  {dni ? (
                    <Chip icon={<BadgeIcon />} label={dni} size="small" />
                  ) : null}
                  {birth_date ? (
                    <Chip
                      icon={<CalendarMonthIcon />}
                      label={`${formatDate(birth_date)}${typeof age === "number" ? ` • ${age} años` : ""}`}
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
              <Grid xs={12} md={5}>
                <LabeledValue
                  label="DNI"
                  value={dni}
                  icon={<BadgeIcon color="action" />}
                  copyable
                />
                <LabeledValue
                  label="Correo Electrónico"
                  value={email}
                  icon={<MailOutlineIcon color="action" />}
                  copyable
                />
                <LabeledValue
                  label="Teléfono"
                  value={phone_number}
                  icon={<PhoneIphoneOutlinedIcon color="action" />}
                  copyable
                />
              </Grid>
              <Grid xs={12} md={4}>
                <LabeledValue
                  label="Dirección"
                  value={address}
                  icon={<LocationOnOutlinedIcon color="action" />}
                />
                <LabeledValue
                  label="Fecha de Nacimiento"
                  value={
                    birth_date
                      ? `${formatDate(birth_date)}${typeof age === "number" ? ` (${age} años)` : ""}`
                      : "-"
                  }
                  icon={<CalendarMonthIcon color="action" />}
                />
              </Grid>
              <Grid xs={12} md={3}>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Button variant="contained">Editar</Button>
                  <Button variant="outlined">Nuevo turno</Button>
                </Box>
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

          {/* Tab 3: Documentación (placeholder, hasta que expongas endpoint) */}
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
