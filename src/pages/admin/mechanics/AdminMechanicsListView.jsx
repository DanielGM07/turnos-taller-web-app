import { useNavigate } from "react-router-dom";
import GenericTable from "../../../components/common/table/GenericTable.jsx";
import ActionsColumn from "../../../components/common/table/ActionsColumn.jsx";
import MechanicStatusToggleAction from "./components/MechanicStatusToggleAction.jsx";
import useAdminMechanicsListView from "./hooks/useAdminMechanicsListView.js";

export default function AdminMechanicsListView() {
  const navigate = useNavigate();

  const { data, isLoading, isError, error, handleDelete } =
    useAdminMechanicsListView();

  const columns = [
    { id: "first_name", label: "Nombre" },
    { id: "last_name", label: "Apellido" },
    { id: "email", label: "Email" },
    {
      id: "specialties",
      label: "Especialidades",
      render: (row) => (row.specialties || []).join(", "),
    },
    { id: "status", label: "Estado" },
    {
      id: "actions",
      label: "Acciones",
      render: (row) => (
        <>
          <ActionsColumn
            row={row}
            onEdit={() => navigate(`/admin/mechanics/${row.id}/edit`)}
            onDelete={(id) => handleDelete(id)}
            deleteItemNameKey="first_name"
          />
          <MechanicStatusToggleAction mechanic={row} />
        </>
      ),
    },
  ];

  return (
    <GenericTable
      title="Mecánicos"
      subtitle="Listado de todos los mecánicos del sistema"
      columns={columns}
      data={data || []}
      isLoading={isLoading}
      isError={isError}
      error={error}
      addButton={{
        label: "Crear mecánico",
        onClick: () => navigate("/admin/create-mechanic"),
      }}
      onRowClick={(row) => navigate(`/admin/mechanics/${row.id}`)}
    />
  );
}
