import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App.jsx'
import Layout from '../layout/Layout.jsx'
import DashboardPage from '../pages/dashboard/DashboardPage.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
        ],
      },
    ],
  },
])
