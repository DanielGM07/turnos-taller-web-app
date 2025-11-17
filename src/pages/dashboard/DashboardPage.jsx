import Grid from "@mui/material/Grid";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

const SUMMARY = [
  {
    title: "Turnos para hoy",
    value: 18,
    color: "primary",
    description: "Incluye inspecciones y servicios rápidos",
  },
  {
    title: "Turnos pendientes",
    value: 42,
    color: "warning",
    description: "Esperando confirmación del cliente",
  },
  {
    title: "Entregas programadas",
    value: 7,
    color: "success",
    description: "Vehículos listos para retirar",
  },
];

const SERVICE_LOAD = [
  { label: "Mecánica", value: 70 },
  { label: "Eléctrica", value: 45 },
  { label: "Chapa y pintura", value: 55 },
  { label: "Diagnóstico", value: 32 },
];

export default function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Resumen del día
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Visualizá cómo está operando el taller hoy y preparate para los turnos
          entrantes.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {SUMMARY.map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardHeader
                title={item.title}
                titleTypographyProps={{
                  variant: "subtitle1",
                  color: "text.secondary",
                }}
                sx={{ pb: 0 }}
              />
              <CardContent>
                <Stack spacing={1.5}>
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    color={`${item.color}.main`}
                  >
                    {item.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card
        elevation={0}
        sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}
      >
        <CardHeader
          title="Carga por área del taller"
          titleTypographyProps={{ variant: "h6" }}
          action={<Chip label="Hoy" color="primary" variant="outlined" />}
        />
        <CardContent>
          <Stack spacing={3}>
            {SERVICE_LOAD.map((item) => (
              <Stack key={item.label} spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1">{item.label}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.value}%
                  </Typography>
                </Stack>
                <LinearProgress
                  value={item.value}
                  variant="determinate"
                  color={item.value > 60 ? "warning" : "primary"}
                  sx={{ height: 8, borderRadius: 5 }}
                />
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
