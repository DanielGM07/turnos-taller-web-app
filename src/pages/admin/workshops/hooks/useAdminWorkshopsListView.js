import {
  useViewWorkshopsQuery,
  useDeleteWorkshopMutation,
} from "../../../../apis/admin/admin.api";
import { useCallback } from "react";

export default function useAdminWorkshopsListView() {
  const { data, isLoading, isError, error } = useViewWorkshopsQuery();
  const [deleteWorkshop] = useDeleteWorkshopMutation();

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteWorkshop(id).unwrap();
        return { success: true };
      } catch (err) {
        return { success: false };
      }
    },
    [deleteWorkshop],
  );

  return {
    data,
    isLoading,
    isError,
    error,
    handleDelete,
  };
}
