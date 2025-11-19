// src/pages/admin/workshop-detail/hooks/useAdminWorkshopAppointments.js

import { useViewWorkshopAppointmentsQuery } from "../../../../apis/admin/admin.api";

export default function useAdminWorkshopAppointments(workshopId) {
  const { data, isLoading, isError, error } =
    useViewWorkshopAppointmentsQuery(workshopId);

  return {
    appointments: data || [],
    isLoading,
    isError,
    error,
  };
}
