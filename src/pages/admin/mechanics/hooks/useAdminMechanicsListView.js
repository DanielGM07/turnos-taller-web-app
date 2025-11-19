import {
  useViewMechanicsQuery,
  useDeleteMechanicMutation,
} from "../../../../apis/admin/admin.api";
import { useCallback } from "react";

export default function useAdminMechanicsListView() {
  const { data, isLoading, isError, error } = useViewMechanicsQuery();
  const [deleteMechanic] = useDeleteMechanicMutation();

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteMechanic(id).unwrap();
        return { success: true };
      } catch (e) {
        return { success: false };
      }
    },
    [deleteMechanic],
  );

  return {
    data,
    isLoading,
    isError,
    error,
    handleDelete,
  };
}
