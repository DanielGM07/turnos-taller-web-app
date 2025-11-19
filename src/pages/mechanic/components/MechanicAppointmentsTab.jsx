// src/pages/mechanic/components/MechanicAppointmentsTab.jsx
import PropTypes from "prop-types";
import { Box, Alert } from "@mui/material";
import GenericTable from "../../../components/common/table/GenericTable"; // ajustá si tu path es distinto
import { formatDate } from "../../../utils/formatDate.utils";

export default function MechanicAppointmentsTab({ appointments }) {
  if (!Array.isArray(appointments) || appointments.length === 0) {
    return (
      <Alert severity="info">No tenés turnos asignados por el momento.</Alert>
    );
  }

  const columns = [
    {
      id: "scheduled_at",
      label: "Fecha",
      align: "left",
      render: (row) => formatDate(row.scheduled_at),
    },
    {
      id: "customer",
      label: "Cliente",
      align: "left",
      render: (row) =>
        row.customer
          ? `${row.customer.last_name}, ${row.customer.first_name}`
          : "-",
    },
    {
      id: "vehicle",
      label: "Vehículo",
      align: "left",
      render: (row) =>
        row.vehicle
          ? `${row.vehicle.brand ?? ""} ${row.vehicle.model ?? ""} ${
              row.vehicle.plate ? `(${row.vehicle.plate})` : ""
            }`.trim()
          : "-",
    },
    {
      id: "service",
      label: "Servicio",
      align: "left",
      render: (row) => row.service?.name ?? "-",
    },
    {
      id: "workshop",
      label: "Taller",
      align: "left",
      render: (row) => row.workshop?.name ?? "-",
    },
    {
      id: "status",
      label: "Estado",
      align: "left",
      render: (row) => row.status ?? "-",
    },
  ];

  return (
    <Box sx={{ mt: 1 }}>
      <GenericTable
        title="Mis turnos"
        subtitle="Listado de turnos asignados"
        columns={columns}
        data={appointments}
        isLoading={false}
        isError={false}
        searchFields={null}
        onSearch={() => {}}
        onClear={() => {}}
        pagination={null}
      />
    </Box>
  );
}

MechanicAppointmentsTab.propTypes = {
  appointments: PropTypes.array.isRequired,
};
