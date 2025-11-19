import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useLogin from "./hooks/useLogin.jsx";
import theme from "../../styles/theme.js";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    username,
    setUsername,
    password,
    setPassword,
    onSubmit,
    isSubmitting,
  } = useLogin();

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: theme.palette.background,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography variant="h4" fontWeight={600}>
            Taller
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Inicia sesión para continuar
          </Typography>
        </Box>

        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Correo electrónico"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </Box>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2">¿No tienes una cuenta?</Typography>
          <Button
            size="small"
            sx={{ mt: 1 }}
            onClick={() => navigate("/register")}
          >
            Crear cuenta
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
