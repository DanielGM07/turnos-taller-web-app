import * as React from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export default function useApp() {
  const NAVIGATION = React.useMemo(
    () => [
      { kind: "header", title: "General" },
      {
        kind: "page",
        segment: "detail",
        title: "Detalle",
      },
      { kind: "divider" },
      { kind: "header", title: "Configuración" },
      {
        kind: "page",
        segment: "settings",
        title: "Preferencias",
        icon: <SettingsOutlinedIcon />,
      },
    ],
    [],
  );

  return { NAVIGATION };
}
