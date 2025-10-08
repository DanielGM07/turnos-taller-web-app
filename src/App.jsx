// src/App.jsx — define tus rutas SIN envolver con otro Router
import { Routes, Route, Navigate } from "react-router-dom";

// Ajustá la ruta según dónde guardaste el archivo
import CustomerDetail from "./pages/customer/CustomerDetail"; // p.ej. "./pages/CustomerDetail.jsx"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/customers/1" replace />} />
      <Route path="/customers/:id" element={<CustomerDetail />} />
      <Route
        path="*"
        element={<div style={{ padding: 24 }}>404 - Not Found</div>}
      />
    </Routes>
  );
}
