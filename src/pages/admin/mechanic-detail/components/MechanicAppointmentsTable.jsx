import GenericTable from "../../../../components/common/table/GenericTable";
import useAdminMechanicAppointments from "../hooks/useAdminMechanicAppointments";

export default function MechanicAppointmentsTable({ mechanicId }) {
  const { appointments, isLoading, isError, error } =
    useAdminMechanicAppointments(mechanicId);

  const columns = [
    { id: "scheduled_at", label: "Fecha" },
    {
      id: "customer",
      label: "Cliente",
      render: (row) =>
        row.customer
          ? `${row.customer.first_name} ${row.customer.last_name}`
          : "-",
    },
    {
      id: "vehicle",
      label: "Vehículo",
      render: (row) =>
        row.vehicle ? `${row.vehicle.brand} ${row.vehicle.model}` : "-",
    },
    { id: "status", label: "Estado" },
  ];

  return (
    <GenericTable
      title="Turnos del mecánico"
      columns={columns}
      data={appointments}
      isLoading={isLoading}
      isError={isError}
      error={error}
      hideHeader
    />
  );
}
