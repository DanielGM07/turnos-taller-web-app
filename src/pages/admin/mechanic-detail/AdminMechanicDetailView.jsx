import { Box, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";

import useAdminMechanicDetail from "./hooks/useAdminMechanicDetail";
import MechanicInfoCard from "./components/MechanicInfoCard";
import MechanicAppointmentsTable from "./components/MechanicAppointmentsTable";
import MechanicReviews from "./components/MechanicReviews";
import MechanicSpecialties from "./components/MechanicSpecialties";

export default function AdminMechanicDetailView() {
  const { id } = useParams();
  const { mechanic } = useAdminMechanicDetail(id);

  const [tab, setTab] = useState(0);

  if (!mechanic) return null;

  return (
    <Box sx={{ p: 3 }}>
      <MechanicInfoCard mechanic={mechanic} />

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mt: 3 }}>
        <Tab label="Turnos" />
        <Tab label="Reviews" />
        <Tab label="Especialidades" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && <MechanicAppointmentsTable mechanicId={id} />}
        {tab === 1 && <MechanicReviews mechanicId={id} />}
        {tab === 2 && <MechanicSpecialties mechanic={mechanic} />}
      </Box>
    </Box>
  );
}
