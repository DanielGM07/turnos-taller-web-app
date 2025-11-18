// src/pages/customer/hooks/useCustomerAppointmentsTab.jsx
import { useMemo } from "react";
import useSearchAccordion from "../../../components/common/table/hooks/useSearchAccordion";
import { useCustomerListAppointmentsQuery } from "../../../apis/customer/customer.api";

const useCustomerAppointmentsTab = (customerId) => {
  const { searchValue, handleSearch, handleClear } = useSearchAccordion();

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

  // Campos de búsqueda (solo UI, sin lógica backend todavía)
  const searchFields = useMemo(
    () => [
      {
        name: "status",
        label: "Estado",
        type: "select",
        defaultValue: "",
        options: [
          { value: "", label: "Todos" },
          { value: "PENDING", label: "Pendiente" },
          { value: "CONFIRMED", label: "Confirmado" },
          { value: "IN_PROGRESS", label: "En curso" },
          { value: "COMPLETED", label: "Completado" },
          { value: "CANCELLED", label: "Cancelado" },
        ],
      },
      {
        name: "from",
        label: "Desde (fecha)",
        type: "text",
        inputType: "date",
        defaultValue: "",
      },
      {
        name: "to",
        label: "Hasta (fecha)",
        type: "text",
        inputType: "date",
        defaultValue: "",
      },
      {
        name: "serviceName",
        label: "Servicio",
        type: "text",
        defaultValue: "",
      },
      {
        name: "workshopName",
        label: "Taller",
        type: "text",
        defaultValue: "",
      },
      {
        name: "mechanicName",
        label: "Mecánico",
        type: "text",
        defaultValue: "",
      },
    ],
    [],
  );

  // Por ahora searchValue no se usa para pedir al backend.
  // Más adelante lo mapeamos a { status, from, to, ... } en la query.

  return {
    columns,
    searchFields,
    data: appointments,
    isLoading,
    isError,
    error,
    onSearch: handleSearch,
    onClear: handleClear,
    searchValue, // por si luego querés verlo en el componente
  };
};

export default useCustomerAppointmentsTab;
