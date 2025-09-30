// styles/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0F766E",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#2563EB",
      contrastText: "#FFFFFF",
    },
    success: { main: "#16A34A" },
    warning: { main: "#F59E0B" },
    error: { main: "#DC2626" },
    info: { main: "#2563EB" },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    divider: "#E2E8F0",
    text: {
      primary: "#0F172A",
      secondary: "#475569",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    body1: { color: "#0F172A" },
    button: { textTransform: "none" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          padding: "8px 20px",
        },
      },
    },
  },
});

export default theme;
