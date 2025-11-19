// src/routes/routes.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import App from "../App.jsx";
import Layout from "../layout/Layout.jsx";
import PlaygroundTheme from "../pages/playground-theme/PlaygroundTheme.jsx";

import CustomerCreateAppointmentView from "../pages/customer/CustomerCreateAppointmentView.jsx";
import CustomerDetailView from "../pages/customer/CustomerDetailView.jsx";
import CustomerCreateVehicleView from "../pages/customer/CustomerCreateVehicleView.jsx";

import MechanicDetailView from "../pages/mechanic/MechanicDetailView.jsx";
import MechanicRatingsView from "../pages/mechanic/MechanicRatingsView.jsx";
import MechanicWorkshopsView from "../pages/mechanic/MechanicWorkshopsView.jsx"; // 👈 nuevo

import AdminTestView from "../pages/admin/AdminTestView.jsx";
import Login from "../pages/auth/Login.jsx";
import { ROLES } from "../constants/roles.constants.js";

import CustomerRootElement from "./CustomerRootElement.jsx";
import MechanicRootElement from "./MechanicRootElement.jsx";
import Register from "../pages/auth/Register.jsx";

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
          { path: "register", element: <Register /> }, // 👈 agregar esto

          // CUSTOMER
          {
            path: "customer",
            children: [
              { index: true, element: <CustomerRootElement /> },
              { path: "detail/:id", element: <CustomerDetailView /> },
              {
                path: "create-vehicle",
                element: <CustomerCreateVehicleView />,
              },
              {
                path: "create-appointment",
                element: <CustomerCreateAppointmentView />,
              },
            ],
          },

          // MECHANIC
          {
            path: "mechanic",
            children: [
              { index: true, element: <MechanicRootElement /> },
              { path: "detail/:id", element: <MechanicDetailView /> },
              { path: "workshops", element: <MechanicWorkshopsView /> }, // 👈 nuevo
              { path: "ratings", element: <MechanicRatingsView /> },
            ],
          },

          // ADMIN
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
