import { IconButton, Tooltip } from "@mui/material";
import { ToggleOn, ToggleOff } from "@mui/icons-material";
import { MECHANIC_STATUS } from "../../../../constants/mechanic-status.constants";
import { useUpdateMechanicMutation } from "../../../../apis/admin/admin.api";
import { useCallback } from "react";

export default function MechanicStatusToggleAction({ mechanic }) {
  const [updateMechanic] = useUpdateMechanicMutation();

  const isEnabled = mechanic.status === MECHANIC_STATUS.ENABLED;

  const handleToggle = useCallback(async () => {
    const newStatus = isEnabled
      ? MECHANIC_STATUS.DISABLED
      : MECHANIC_STATUS.ENABLED;

    await updateMechanic({
      id: mechanic.id,
      body: { status: newStatus },
    });
  }, [mechanic, updateMechanic, isEnabled]);

  return (
    <Tooltip title={isEnabled ? "Deshabilitar mecánico" : "Habilitar mecánico"}>
      <IconButton
        color={isEnabled ? "success" : "warning"}
        onClick={handleToggle}
      >
        {isEnabled ? <ToggleOn /> : <ToggleOff />}
      </IconButton>
    </Tooltip>
  );
}
