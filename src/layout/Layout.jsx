import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";

import LogoutButton from "./LogoutButton.jsx";

export default function Layout() {
  return (
    <DashboardLayout
      sidebarExpanded
      slots={{ toolbarActions: LogoutButton }} // botón en el header
    >
      <PageContainer sx={{ p: 3 }}>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
