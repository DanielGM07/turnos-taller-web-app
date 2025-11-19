import GenericTable from "../../../../components/common/table/GenericTable";
import useAdminWorkshopAppointments from "../hooks/useAdminWorkshopAppointments";

export default function WorkshopAppointmentsTable({ workshopId }) {
  const { appointments, isLoading, isError, error } =
    useAdminWorkshopAppointments(workshopId);

  const columns = [
    { id: "id", label: "ID" },
    { id: "scheduled_at", label: "Fecha" },
    {
      id: "service.name",
      label: "Servicio",
      render: (row) => row.service?.name,
    },
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
      title="Turnos del taller"
      columns={columns}
      data={appointments}
      isLoading={isLoading}
      isError={isError}
      error={error}
      hideHeader
    />
  );
}
