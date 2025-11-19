// src/pages/admin/hooks/useAdminDashboardStats.js
import { useDashboardStatsQuery } from "../../../apis/admin/admin.api.js";

export default function useAdminDashboardStats() {
  const { data, isLoading, isError, error } = useDashboardStatsQuery();

  return {
    stats: data,
    isLoading,
    isError,
    error,
  };
}
