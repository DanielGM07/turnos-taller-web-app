// styles/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#FFA116", // LeetCode orange
      contrastText: "#15141A",
    },
    secondary: {
      main: "#38BDF8", // buen secundario (azul)
      contrastText: "#15141A",
    },

    success: {
      main: "#4ADE80",
      contrastText: "#0F172A",
    },
    warning: {
      main: "#FACC15",
      contrastText: "#1E1E26",
    },
    error: {
      main: "#FB7185",
      contrastText: "#1E1E26",
    },
    info: {
      main: "#38BDF8",
      contrastText: "#1E1E26",
    },

    background: {
      default: "#15141A", // Fondo puro estilo LeetCode dark
      paper: "#1E1E26", // Superficies
    },

    divider: "rgba(255, 255, 255, 0.08)",

    text: {
      primary: "#F5F5F5",
      secondary: "#9CA3AF",
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
    body1: { color: "#F5F5F5", fontSize: 14 },
    body2: { color: "#9CA3AF", fontSize: 13 },
    button: { textTransform: "none", fontWeight: 600 },
  },

  shape: { borderRadius: 12 },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#1E1E26",
          borderRadius: 16,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#15141A",
          borderRadius: 16,
          border: "1px solid #2D2D35",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#15141A",
          boxShadow: "0 20px 40px rgba(0,0,0,0.85)",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#15141A",
          borderRight: "1px solid #2D2D35",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          padding: "8px 20px",
          "&:hover": {
            backgroundColor: "#FFB63D", // hover estilo LeetCode
          },
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#1E1E26",
          },
          "&:hover": {
            backgroundColor: "#23232C",
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          backgroundColor: "#27272F",
          color: "#F5F5F5",
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
