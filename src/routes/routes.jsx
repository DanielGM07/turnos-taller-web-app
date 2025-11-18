// src/routes/routes.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import App from "../App.jsx";
import Layout from "../layout/Layout.jsx";
import PlaygroundTheme from "../pages/playground-theme/PlaygroundTheme.jsx";

import CustomerDetailView from "../pages/customer/CustomerDetailView.jsx";
import CustomerCreateVehicleView from "../pages/customer/CustomerCreateVehicleView.jsx";
import MechanicTestView from "../pages/mechanic/MechanicTestView.jsx";
import AdminTestView from "../pages/admin/AdminTestView.jsx";
import Login from "../pages/auth/Login.jsx";
import { ROLES } from "../constants/roles.constants.js";

import CustomerRootElement from "./CustomerRootElement.jsx";

function RootElement() {
  const user = useSelector((state) => state.workshop_user);

  if (!user?.role) {
    return <Login />;
  }

  switch (user.role) {
    case ROLES.CUSTOMER:
      return <Navigate to={`/customer/detail/${user.id}`} replace />;
    case ROLES.MECHANIC:
      return <Navigate to="/mechanic" replace />;
    case ROLES.ADMIN:
      return <Navigate to="/admin" replace />;
    default:
      return <Login />;
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <RootElement /> },

          // Rutas de CUSTOMER
          {
            path: "customer",
            children: [
              // /customer → decide redirección
              { index: true, element: <CustomerRootElement /> },

              // /customer/detail/:id → detalle de customer
              { path: "detail/:id", element: <CustomerDetailView /> },

              // /customer/vehicles/new → crear vehículo
              {
                path: "create-vehicle",
                element: <CustomerCreateVehicleView />,
              },
            ],
          },

          // Rutas de MECHANIC
          {
            path: "mechanic",
            children: [{ index: true, element: <MechanicTestView /> }],
          },

          // Rutas de ADMIN
          {
            path: "admin",
            children: [{ index: true, element: <AdminTestView /> }],
          },
        ],
      },

      {
        path: "playground-theme",
        element: <PlaygroundTheme />,
      },
    ],
  },
]);
