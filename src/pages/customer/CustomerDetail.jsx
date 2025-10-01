import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Edit, DirectionsCarFilled } from "@mui/icons-material";
import { customers, vehiclesByCustomer } from "./mocks/customers";

const formatDate = (iso) => {
  if (!iso) return "-";
  // si viene YYYY-MM-DD lo mostramos con locale
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00Z" : ""));
  return isNaN(d) ? iso : d.toLocaleDateString();
};

const getInitials = (first, last) =>
  [first?.[0], last?.[0]].filter(Boolean).join("").toUpperCase() || "?";

function VehicleCard({ vehicle }) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        avatar={<DirectionsCarFilled />}
        title={`${vehicle.brand ?? "Marca"} ${vehicle.model ?? ""}`.trim()}
        subheader={vehicle.year ? `Año ${vehicle.year}` : ""}
      />
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="body2"
              sx={{ minWidth: 90, color: "text.secondary" }}
            >
              Patente:
            </Typography>
            <Chip label={vehicle.plate ?? "-"} size="small" />
          </Stack>
          {vehicle.color && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="body2"
                sx={{ minWidth: 90, color: "text.secondary" }}
              >
                Color:
              </Typography>
              <Typography variant="body2">{vehicle.color}</Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  // Simulamos “fetch” con un timeout corto para ver skeletons
  useEffect(() => {
    const t = setTimeout(() => {
      const c = customers.find((x) => x.id === id) ?? customers[0];
      setCustomer(c);
      setVehicles(vehiclesByCustomer[c.id] ?? []);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [id]);

  const initials = useMemo(
    () => getInitials(customer?.first_name, customer?.last_name),
    [customer],
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Skeleton variant="circular" width={56} height={56} />
            <Skeleton variant="text" width={240} height={36} />
            <Skeleton
              variant="rectangular"
              width={100}
              height={36}
              sx={{ ml: "auto" }}
            />
          </Stack>

          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Skeleton variant="rectangular" height={60} />
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Typography variant="h6">Vehículos</Typography>
          <Grid container spacing={2}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={180} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    );
  }

  if (!customer) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography color="error">
          Cliente no encontrado en los mocks.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Avatar sx={{ width: 56, height: 56, fontWeight: 600 }}>
          {initials}
        </Avatar>
        <Box>
          <Typography variant="h5">
            {customer.first_name} {customer.last_name}
          </Typography>
        </Box>
        <Tooltip title="Editar perfil (mock)">
          <IconButton
            aria-label="Editar"
            onClick={() => navigate(`/customers/${customer.id}/edit`)}
            sx={{ ml: "auto" }}
          >
            <Edit />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Info personal según tu DTO */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Información personal
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="caption" color="text.secondary">
              DNI
            </Typography>
            <Typography variant="body1">{customer.dni || "-"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="caption" color="text.secondary">
              Nombre
            </Typography>
            <Typography variant="body1">
              {customer.first_name || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="caption" color="text.secondary">
              Apellido
            </Typography>
            <Typography variant="body1">{customer.last_name || "-"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="caption" color="text.secondary">
              Fecha de nacimiento
            </Typography>
            <Typography variant="body1">
              {formatDate(customer.birth_date)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="caption" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1">{customer.email || "-"}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Vehículos (una card por cada uno) */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Vehículos
      </Typography>
      {vehicles.length === 0 ? (
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography color="text.secondary">
            Este cliente aún no tiene vehículos asignados.
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {vehicles.map((v) => (
            <Grid item xs={12} sm={6} md={4} key={v.id}>
              <VehicleCard vehicle={v} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
