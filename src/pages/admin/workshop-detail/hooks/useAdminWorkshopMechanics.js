import { useViewMechanicsQuery } from "../../../../apis/admin/admin.api";

export default function useAdminWorkshopMechanics() {
  const { data, isLoading, isError, error } = useViewMechanicsQuery();

  return {
    mechanics: data || [],
    isLoading,
    isError,
    error,
  };
}
