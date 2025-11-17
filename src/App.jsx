import "./App.css";
import { Outlet } from "react-router-dom";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";

// import theme from "./styles/theme.js";
import useApp from "./hooks/useApp.jsx";

export default function App() {
  const { NAVIGATION } = useApp();

  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      // theme={theme}
      branding={{
        title: "Turnos Taller",
        logo: <BuildCircleIcon />,
        homeUrl: "/", // clic en el título/logo → "/"
      }}
    >
      <Outlet />
    </ReactRouterAppProvider>
  );
}
