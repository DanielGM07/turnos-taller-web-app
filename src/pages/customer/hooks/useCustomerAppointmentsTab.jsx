// src/pages/customer/hooks/useCustomerAppointmentsTab.jsx
import { useMemo } from "react";
import { useCustomerListAppointmentsQuery } from "../../../apis/customer/customer.api";

const useCustomerAppointmentsTab = (customerId) => {
  // Traemos TODOS los turnos del customer (sin filtros por ahora)
  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
  } = useCustomerListAppointmentsQuery({ customerId }, { skip: !customerId });

  // Columnas para GenericTable
  const columns = useMemo(
    () => [
      {
        id: "scheduled_at",
        label: "Fecha y hora",
        align: "left",
        // GenericTable ya te formatea fechas con formatDate + isDateValue
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
        id: "mechanic",
        label: "Mecánico",
        align: "left",
        render: (row) =>
          row.mechanic
            ? `${row.mechanic.first_name} ${row.mechanic.last_name}`
            : "-",
      },
      {
        id: "vehicle",
        label: "Vehículo",
        align: "left",
        render: (row) =>
          row.vehicle
            ? `${row.vehicle.brand} ${row.vehicle.model} (${row.vehicle.plate})`
            : "-",
      },
      {
        id: "status",
        label: "Estado",
        align: "left",
        render: (row) => row.status,
      },
    ],
    [],
  );

  return {
    columns,
    data: appointments,
    isLoading,
    isError,
    error,
  };
};

export default useCustomerAppointmentsTab;
