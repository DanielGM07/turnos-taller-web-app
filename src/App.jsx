import { BrowserRouter } from "react-router-dom";
import { CssBaseline, Container } from "@mui/material";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <AppRoutes />
      </Container>
    </BrowserRouter>
  );
}
