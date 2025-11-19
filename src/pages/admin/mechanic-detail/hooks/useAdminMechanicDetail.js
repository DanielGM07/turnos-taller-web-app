import { useViewMechanicQuery } from "../../../../apis/admin/admin.api";

export default function useAdminMechanicDetail(id) {
  const { data, isLoading } = useViewMechanicQuery(id);

  return {
    mechanic: data,
    isLoading,
  };
}
