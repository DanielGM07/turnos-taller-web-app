import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Layout from "../layout/Layout.jsx";
import PlaygroundTheme from "../pages/playground-theme/PlaygroundTheme.jsx";
import CustomerDetailView from "../pages/customer/CustomerDetailView.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          // el login después te redirige a /detail/:id
          { path: "detail/:id", element: <CustomerDetailView /> },
        ],
      },
      {
        path: "playground-theme",
        element: <PlaygroundTheme />,
      },
    ],
  },
]);
