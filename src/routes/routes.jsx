// src/routes/routes.jsx (o donde lo tengas)

import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import App from "../App.jsx";
import Layout from "../layout/Layout.jsx";
import PlaygroundTheme from "../pages/playground-theme/PlaygroundTheme.jsx";

import CustomerDetailView from "../pages/customer/CustomerDetailView.jsx";
import MechanicTestView from "../pages/mechanic/MechanicTestView.jsx";
import AdminTestView from "../pages/admin/AdminTestView.jsx";
import Login from "../pages/auth/Login.jsx";
import { ROLES } from "../constants/roles.constants.js";

function RootElement() {
  const user = useSelector((state) => state.workshop_user);

  if (!user?.role) {
    return <Login />;
  }

  switch (user.role) {
    case ROLES.CUSTOMER:
      // Ahora redirigimos a la ruta con prefijo de rol
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
          // Decide a qué ruta ir según el rol
          { index: true, element: <RootElement /> },

          // CUSTOMER
          {
            path: "customer",
            children: [
              // /customer/detail/:id
              { path: "detail/:id", element: <CustomerDetailView /> },
            ],
          },

          // MECHANIC
          {
            path: "mechanic",
            children: [
              // /mechanic
              { index: true, element: <MechanicTestView /> },
            ],
          },

          // ADMIN
          {
            path: "admin",
            children: [
              // /admin
              { index: true, element: <AdminTestView /> },
            ],
          },
        ],
      },

      // Ruta fuera del layout principal
      {
        path: "playground-theme",
        element: <PlaygroundTheme />,
      },
    ],
  },
]);
