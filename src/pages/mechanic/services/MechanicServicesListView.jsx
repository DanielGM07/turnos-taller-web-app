// src/pages/mechanic/services/MechanicServicesListView.jsx
import { useNavigate } from "react-router-dom";
import GenericTable from "../../../components/common/table/GenericTable";
import { useListServicesQuery } from "../../../apis/service/service.api";

export default function MechanicServicesListView() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useListServicesQuery();

  const columns = [
    { id: "name", label: "Nombre", align: "left" },
    { id: "description", label: "Descripción", align: "left" },
    {
      id: "min_price",
      label: "Precio mín.",
      align: "right",
      render: (row) => `$ ${row.min_price}`,
    },
    {
      id: "max_price",
      label: "Precio máx.",
      align: "right",
      render: (row) => `$ ${row.max_price}`,
    },
    {
      id: "created_at",
      label: "Creado",
      align: "left",
      // GenericTable ya formatea si es fecha ISO
    },
  ];

  return (
    <GenericTable
      title="Servicios"
      subtitle="Listado de servicios del taller"
      columns={columns}
      data={data || []}
      isLoading={isLoading}
      isError={isError}
      error={error}
      addButton={{
        label: "Crear servicio",
        onClick: () => navigate("/mechanic/services/create"), // 👈 acá usamos navigate
      }}
    />
  );
}
