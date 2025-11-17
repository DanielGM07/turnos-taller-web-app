// styles/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      // Acento principal: cian/teal estilo moderno
      main: "#22C55E",
      contrastText: "#020617",
    },
    secondary: {
      // Acento secundario: azul eléctrico suave
      main: "#38BDF8",
      contrastText: "#020617",
    },
    success: {
      main: "#22C55E",
      contrastText: "#022c22",
    },
    warning: {
      main: "#F97316",
      contrastText: "#111827",
    },
    error: {
      main: "#EF4444",
      contrastText: "#FEF2F2",
    },
    info: {
      main: "#0EA5E9",
      contrastText: "#0B1120",
    },
    background: {
      // Fondo casi negro
      default: "#020617", // slate-950
      // Superficies principales (cards, panels)
      paper: "#0F172A", // slate-900
    },
    divider: "rgba(148, 163, 184, 0.35)",
    text: {
      primary: "#E5E7EB", // gris claro
      secondary: "#9CA3AF", // gris medio
      disabled: "#6B7280",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    body1: { color: "#E5E7EB", fontSize: 14 },
    body2: { color: "#9CA3AF", fontSize: 13 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#020617",
          borderRadius: 16,
          border: "1px solid rgba(148, 163, 184, 0.2)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#020617",
          boxShadow: "0 20px 40px rgba(0,0,0,0.85)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#020617",
          borderRight: "1px solid rgba(15, 23, 42, 0.8)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          padding: "8px 20px",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
          },
          "&:hover": {
            backgroundColor: "rgba(30, 64, 175, 0.4)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
  },
});

export default theme;
