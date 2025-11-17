import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import useApp from "../hooks/useApp.jsx";

export default function Layout() {
  const { NAVIGATION } = useApp();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{ title: "Turnos Taller", logo: <BuildCircleIcon /> }}
      router={{ pathname, navigate }}
    >
      <DashboardLayout sidebarExpanded>
        <PageContainer sx={{ p: 3 }}>
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
