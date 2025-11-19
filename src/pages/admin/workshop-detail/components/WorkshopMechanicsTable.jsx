import GenericTable from "../../../../components/common/table/GenericTable";
import useAdminWorkshopMechanics from "../hooks/useAdminWorkshopMechanics";

export default function WorkshopMechanicsTable() {
  const { mechanics, isLoading, isError, error } = useAdminWorkshopMechanics();

  const columns = [
    { id: "first_name", label: "Nombre" },
    { id: "last_name", label: "Apellido" },
    { id: "email", label: "Email" },
    { id: "status", label: "Estado" },
    {
      id: "specialties",
      label: "Especialidades",
      render: (row) => (row.specialties || []).join(", "),
    },
  ];

  return (
    <GenericTable
      title="Mecánicos asignados"
      columns={columns}
      data={mechanics}
      isLoading={isLoading}
      isError={isError}
      error={error}
      hideHeader
    />
  );
}
