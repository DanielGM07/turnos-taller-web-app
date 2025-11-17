// src/pages/playground-theme/PlaygroundTheme.jsx
import { useState } from "react";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  Switch,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Alert,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BuildIcon from "@mui/icons-material/Build";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TuneIcon from "@mui/icons-material/Tune";

const drawerWidth = 260;

const rows = [
  {
    hora: "08:30",
    cliente: "Juan Pérez",
    vehiculo: "Ford Focus 2018",
    servicio: "Cambio de aceite",
    estado: "En horario",
  },
  {
    hora: "09:15",
    cliente: "María López",
    vehiculo: "Toyota Corolla 2020",
    servicio: "Revisión general",
    estado: "En taller",
  },
  {
    hora: "10:00",
    cliente: "Carlos Ruiz",
    vehiculo: "VW Amarok 2017",
    servicio: "Frenos",
    estado: "Demorado",
  },
  {
    hora: "11:00",
    cliente: "Ana Torres",
    vehiculo: "Renault Sandero 2019",
    servicio: "Alineación y balanceo",
    estado: "Confirmado",
  },
];

export default function PlaygroundTheme() {
  const [tab, setTab] = useState(0);
  const [prioridad, setPrioridad] = useState("media");
  const [fecha, setFecha] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [urgente, setUrgente] = useState(false);
  const [notificar, setNotificar] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* SIDEBAR */}
      <Paper
        elevation={0}
        square
        sx={{
          width: drawerWidth,
          display: "flex",
          flexDirection: "column",
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DirectionsCarFilledOutlinedIcon
              sx={{ fontSize: 22, color: "primary.contrastText" }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>
              TallerPro
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Playground de theme
            </Typography>
          </Box>
        </Box>

        <Divider />

        <List dense sx={{ flex: 1, py: 1 }}>
          <ListItem disablePadding>
            <ListItemButton selected>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Dashboard de prueba" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Agenda (mock)" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BuildIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Órdenes (mock)" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Config (mock)" />
            </ListItemButton>
          </ListItem>
        </List>

        <Box sx={{ p: 2 }}>
          <Alert severity="info" variant="outlined" sx={{ borderRadius: 3 }}>
            <Typography variant="body2" fontWeight={600}>
              Playground de theme
            </Typography>
            <Typography variant="caption">
              Usá esta vista para probar cambios en{" "}
              <strong>styles/theme.js</strong>.
            </Typography>
          </Alert>
        </Box>
      </Paper>

      {/* CONTENIDO PRINCIPAL */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* APPBAR */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Toolbar sx={{ gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Breadcrumbs
                aria-label="breadcrumb"
                sx={{ color: "text.secondary", mb: 0.5 }}
              >
                <Link underline="hover" color="inherit" href="#">
                  TallerPro
                </Link>
                <Typography color="text.primary">
                  Playground de theme
                </Typography>
              </Breadcrumbs>
              <Typography variant="h5" fontWeight={600}>
                Turnos de hoy (demo)
              </Typography>
            </Box>

            <TextField
              size="small"
              placeholder="Buscar cliente o patente..."
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, fontSize: 18 }} />,
              }}
              sx={{ width: 260 }}
            />

            <Tooltip title="Notificaciones (mock)">
              <IconButton>
                <Badge color="error" variant="dot">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Avatar sx={{ width: 36, height: 36, bgcolor: "secondary.main" }}>
              AD
            </Avatar>
          </Toolbar>
        </AppBar>

        {/* TABS SUPERIORES */}
        <Paper square elevation={0}>
          <Tabs
            value={tab}
            onChange={(_, value) => setTab(value)}
            textColor="inherit"
            indicatorColor="primary"
            sx={{ px: 2 }}
          >
            <Tab label="Resumen" />
            <Tab label="Turnos" />
            <Tab label="Taller" />
          </Tabs>
        </Paper>

        {/* SCROLLABLE CONTENT */}
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Container maxWidth="xl" sx={{ py: 3 }}>
            <Grid container spacing={3}>
              {/* CARDS RESUMEN */}
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="overline" color="text.secondary">
                      Turnos de hoy
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
                      18
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        size="small"
                        color="success"
                        label="12 en horario"
                      />
                      <Chip size="small" color="warning" label="3 demorados" />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="overline" color="text.secondary">
                      En taller
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
                      7
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={60}
                      sx={{ borderRadius: 999 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      3 por entregar antes de las 18 hs
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="overline" color="text.secondary">
                      Facturación estimada
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
                      $420.000
                    </Typography>
                    <Chip size="small" color="secondary" label="+18% vs ayer" />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="overline" color="text.secondary">
                      Alertas
                    </Typography>
                    <Stack spacing={1} sx={{ mt: 1 }}>
                      <Chip color="error" size="small" label="1 reclamo" />
                      <Chip
                        color="warning"
                        size="small"
                        label="2 servicios demorados"
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* TABLA + FORM + CALENDARIO */}
              <Grid item xs={12} lg={8}>
                <Card>
                  <CardHeader
                    title="Turnos agendados"
                    subheader="Vista rápida de los turnos de hoy"
                    action={
                      <Stack direction="row" spacing={1}>
                        <FormControl size="small" sx={{ minWidth: 140 }}>
                          <InputLabel>Estado</InputLabel>
                          <Select
                            label="Estado"
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                          >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="En horario">En horario</MenuItem>
                            <MenuItem value="En taller">En taller</MenuItem>
                            <MenuItem value="Demorado">Demorado</MenuItem>
                            <MenuItem value="Confirmado">Confirmado</MenuItem>
                          </Select>
                        </FormControl>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<AddCircleOutlineIcon />}
                        >
                          Nuevo turno
                        </Button>
                      </Stack>
                    }
                  />
                  <Divider />
                  <CardContent sx={{ p: 0 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Hora</TableCell>
                          <TableCell>Cliente</TableCell>
                          <TableCell>Vehículo</TableCell>
                          <TableCell>Servicio</TableCell>
                          <TableCell>Estado</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .filter(
                            (r) => !filtroEstado || r.estado === filtroEstado,
                          )
                          .map((row, idx) => (
                            <TableRow key={idx} hover>
                              <TableCell>{row.hora}</TableCell>
                              <TableCell>{row.cliente}</TableCell>
                              <TableCell>{row.vehiculo}</TableCell>
                              <TableCell>{row.servicio}</TableCell>
                              <TableCell>
                                {row.estado === "En horario" && (
                                  <Chip
                                    size="small"
                                    color="success"
                                    label={row.estado}
                                  />
                                )}
                                {row.estado === "En taller" && (
                                  <Chip
                                    size="small"
                                    color="info"
                                    label={row.estado}
                                  />
                                )}
                                {row.estado === "Demorado" && (
                                  <Chip
                                    size="small"
                                    color="warning"
                                    label={row.estado}
                                  />
                                )}
                                {row.estado === "Confirmado" && (
                                  <Chip
                                    size="small"
                                    color="secondary"
                                    label={row.estado}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} lg={4}>
                <Stack spacing={3}>
                  {/* CALENDARIO */}
                  <Card>
                    <CardHeader
                      title="Calendario"
                      action={
                        <IconButton size="small">
                          <TuneIcon fontSize="small" />
                        </IconButton>
                      }
                    />
                    <CardContent sx={{ pt: 0 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                          value={fecha}
                          onChange={(newDate) => setFecha(newDate)}
                          sx={{
                            "& .MuiPickersDay-root.Mui-selected": {
                              bgcolor: "primary.main",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </CardContent>
                  </Card>

                  {/* FORM NUEVO TURNO */}
                  <Card>
                    <CardHeader title="Nuevo turno rápido" />
                    <CardContent>
                      <Stack spacing={2}>
                        <TextField
                          label="Cliente"
                          placeholder="Nombre y apellido"
                          fullWidth
                        />
                        <TextField
                          label="Patente"
                          placeholder="ABC123"
                          fullWidth
                        />
                        <TextField
                          label="Vehículo"
                          placeholder="Marca y modelo"
                          fullWidth
                        />

                        <TextField
                          label="Servicio"
                          placeholder="Ej: Cambio de aceite"
                          fullWidth
                        />

                        <FormControl fullWidth>
                          <InputLabel>Prioridad</InputLabel>
                          <Select
                            label="Prioridad"
                            value={prioridad}
                            onChange={(e) => setPrioridad(e.target.value)}
                          >
                            <MenuItem value="baja">Baja</MenuItem>
                            <MenuItem value="media">Media</MenuItem>
                            <MenuItem value="alta">Alta</MenuItem>
                          </Select>
                        </FormControl>

                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Duración estimada (minutos)
                          </Typography>
                          <Slider
                            valueLabelDisplay="auto"
                            step={15}
                            min={30}
                            max={240}
                            defaultValue={60}
                          />
                        </Box>

                        <FormControl component="fieldset">
                          <Typography variant="caption" color="text.secondary">
                            Tipo de turno
                          </Typography>
                          <RadioGroup row defaultValue="taller">
                            <FormControlLabel
                              value="taller"
                              control={<Radio size="small" />}
                              label="En taller"
                            />
                            <FormControlLabel
                              value="rapido"
                              control={<Radio size="small" />}
                              label="Servicio rápido"
                            />
                          </RadioGroup>
                        </FormControl>

                        <Stack direction="row" spacing={2} alignItems="center">
                          <FormControlLabel
                            control={
                              <Switch
                                checked={urgente}
                                onChange={(e) => setUrgente(e.target.checked)}
                              />
                            }
                            label="Marcar como urgente"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={notificar}
                                onChange={(e) => setNotificar(e.target.checked)}
                                size="small"
                              />
                            }
                            label="Notificar al cliente"
                          />
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <Button variant="text" color="inherit">
                            Cancelar
                          </Button>
                          <Button variant="contained" color="primary">
                            Guardar turno
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>

              {/* CHIPS / ALERTS / OTROS */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Otros componentes de prueba
                    </Typography>
                    <Stack spacing={2}>
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        <Chip label="Primary" color="primary" />
                        <Chip label="Secondary" color="secondary" />
                        <Chip label="Success" color="success" />
                        <Chip label="Warning" color="warning" />
                        <Chip label="Error" color="error" />
                        <Chip label="Info" color="info" />
                        <Chip label="Outline" variant="outlined" />
                      </Stack>

                      <Stack spacing={1}>
                        <Alert severity="success">
                          Turno guardado correctamente.
                        </Alert>
                        <Alert severity="warning">
                          Hay turnos con posible superposición de horarios.
                        </Alert>
                        <Alert severity="error">
                          No se pudo conectar con el servidor.
                        </Alert>
                        <Alert severity="info">
                          Esta sección sirve solo para chequear cómo se ven los
                          colores.
                        </Alert>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
