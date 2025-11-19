import { useNavigate } from "react-router-dom";
import { useListServicesQuery } from "../../../apis/service.api";

export default function useMechanicServicesListView() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useListServicesQuery();

  const handleAddClick = () => {
    navigate("/mechanic/services/create"); // ruta a la pantalla de creación
  };

  return {
    services: data || [],
    isLoading,
    isError,
    error,
    handleAddClick,
  };
}
