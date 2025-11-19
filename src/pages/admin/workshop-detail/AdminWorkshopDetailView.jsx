import { Box, Tab, Tabs } from "@mui/material";
import { useParams } from "react-router-dom";
import useAdminWorkshopDetail from "./hooks/useAdminWorkshopDetail";
import WorkshopInfoCard from "./components/WorkshopInfoCard";
import WorkshopAppointmentsTable from "./components/WorkshopAppointmentsTable";
import WorkshopMechanicsTable from "./components/WorkshopMechanicsTable";
import { useState } from "react";

export default function AdminWorkshopDetailView() {
  const { id } = useParams();
  const { workshop } = useAdminWorkshopDetail(id);

  const [tab, setTab] = useState(0);

  if (!workshop) return null;

  return (
    <Box sx={{ p: 3 }}>
      <WorkshopInfoCard workshop={workshop} />

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mt: 3 }}>
        <Tab label="Turnos" />
        <Tab label="Mecánicos asignados" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && <WorkshopAppointmentsTable workshopId={id} />}
        {tab === 1 && <WorkshopMechanicsTable workshopId={id} />}
      </Box>
    </Box>
  );
}
