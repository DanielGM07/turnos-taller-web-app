import { useNavigate } from "react-router-dom";
import GenericTable from "../../../components/common/table/GenericTable.jsx";
import ActionsColumn from "../../../components/common/table/ActionsColumn.jsx";
import useAdminWorkshopsListView from "./hooks/useAdminWorkshopsListView.js";

export default function AdminWorkshopsListView() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, handleDelete } =
    useAdminWorkshopsListView();

  const columns = [
    { id: "name", label: "Nombre" },
    { id: "address", label: "Dirección" },
    { id: "opens_at", label: "Abre" },
    { id: "closes_at", label: "Cierra" },
    {
      id: "actions",
      label: "Acciones",
      render: (row) => (
        <ActionsColumn
          row={row}
          onEdit={() => navigate(`/admin/workshops/${row.id}/edit`)}
          onDelete={(id) => handleDelete(id)}
          deleteItemNameKey="name"
        />
      ),
    },
  ];

  return (
    <GenericTable
      title="Talleres"
      subtitle="Listado de todos los talleres del sistema"
      columns={columns}
      data={data || []}
      isLoading={isLoading}
      isError={isError}
      error={error}
      addButton={{
        label: "Crear taller",
        onClick: () => navigate("/admin/create-workshop"),
      }}
      onRowClick={(row) => navigate(`/admin/workshops/${row.id}`)}
    />
  );
}
