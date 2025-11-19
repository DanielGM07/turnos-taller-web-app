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

import Login from "../pages/auth/Login.jsx";
import { ROLES } from "../constants/roles.constants.js";

import CustomerRootElement from "./CustomerRootElement.jsx";
import MechanicRootElement from "./MechanicRootElement.jsx";
import Register from "../pages/auth/Register.jsx";
import AdminDashboardView from "../pages/admin/AdminDashboardView.jsx";
import AdminWorkshopsListView from "../pages/admin/workshops/AdminWorkshopsListView.jsx";
import AdminWorkshopDetailView from "../pages/admin/workshop-detail/AdminWorkshopDetailView.jsx";
import AdminEditWorkshopView from "../pages/admin/workshops/AdminEditWorkshopView.jsx";
import AdminCreateWorkshopView from "../pages/admin/create-workshop/AdminCreateWorkshopView.jsx";
import AdminMechanicsListView from "../pages/admin/mechanics/AdminMechanicsListView.jsx";
import AdminMechanicDetailView from "../pages/admin/mechanic-detail/AdminMechanicDetailView.jsx";
import AdminCreateMechanicView from "../pages/admin/create-mechanic/AdminCreateMechanicView.jsx";
import AdminEditMechanicView from "../pages/admin/mechanics/AdminEditMechanicView.jsx";
import MechanicServicesListView from "../pages/mechanic/services/MechanicServicesListView.jsx";
import MechanicCreateServiceView from "../pages/mechanic/services/MechanicCreateServiceView.jsx";
import CustomerPayAppointmentView from "../pages/customer/CustomerPayAppointmentView.jsx";
import CustomerPaymentsListView from "../pages/customer/CustomerPaymentsListView.jsx";

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
              {
                path: "appointments/:appointmentId/pay",
                element: <CustomerPayAppointmentView />,
              },
              // 👇 NUEVO
              {
                path: "payments",
                element: <CustomerPaymentsListView />,
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
              { path: "services", element: <MechanicServicesListView /> }, // 👈 listado
              {
                path: "services/create",
                element: <MechanicCreateServiceView />,
              }, // 👈 creación
              { path: "ratings", element: <MechanicRatingsView /> },
            ],
          },

          // ADMIN
          {
            path: "admin",
            children: [
              { index: true, element: <AdminDashboardView /> },

              // Workshops
              { path: "workshops", element: <AdminWorkshopsListView /> },
              {
                path: "workshops/:id",
                element: <AdminWorkshopDetailView />,
              },
              {
                path: "workshops/:id/edit",
                element: <AdminEditWorkshopView />, // lo agregamos en segmento 3
              },
              { path: "create-workshop", element: <AdminCreateWorkshopView /> },

              // Mechanics
              { path: "mechanics", element: <AdminMechanicsListView /> },
              {
                path: "mechanics/:id",
                element: <AdminMechanicDetailView />,
              },
              {
                path: "mechanics/:id/edit",
                element: <AdminEditMechanicView />, // lo agregamos en segmento 4
              },
              { path: "create-mechanic", element: <AdminCreateMechanicView /> },
            ],
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
