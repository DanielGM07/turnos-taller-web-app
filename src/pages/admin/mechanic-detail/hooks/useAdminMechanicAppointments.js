// src/pages/admin/mechanic-detail/hooks/useAdminMechanicAppointments.js

import { useViewMechanicAppointmentsQuery } from "../../../../apis/admin/admin.api";

export default function useAdminMechanicAppointments(mechanicId) {
  const { data, isLoading, isError, error } =
    useViewMechanicAppointmentsQuery(mechanicId);

  return {
    appointments: data || [],
    isLoading,
    isError,
    error,
  };
}
