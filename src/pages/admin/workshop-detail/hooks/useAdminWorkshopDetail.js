import { useViewWorkshopQuery } from "../../../../apis/admin/admin.api";

export default function useAdminWorkshopDetail(id) {
  const { data, isLoading } = useViewWorkshopQuery(id);

  return {
    workshop: data,
    isLoading,
  };
}
