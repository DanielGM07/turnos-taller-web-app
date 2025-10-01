import { Routes, Route, Navigate } from "react-router-dom";
import CustomerDetail from "../pages/customer/CustomerDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/customers/1" replace />} />
      <Route path="/customers/:id" element={<CustomerDetail />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
