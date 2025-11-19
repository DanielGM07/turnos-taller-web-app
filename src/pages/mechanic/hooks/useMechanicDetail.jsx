// src/pages/mechanic/hooks/useMechanicDetail.jsx
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  useViewMechanicQuery,
  useListMyAppointmentsQuery,
  useListMyWorkshopsQuery,
} from "../../../apis/mechanic/mechanic.api";

const formatDate = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(d);
};

const initialsFrom = (first = "", last = "") =>
  `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();

export default function useMechanicDetail() {
  const { id: mechanicId } = useParams();

  // Datos básicos del mecánico
  const {
    data: mechanic,
    isLoading: isLoadingMechanic,
    isError: isErrorMechanic,
    refetch: refetchMechanic,
  } = useViewMechanicQuery(mechanicId, { skip: !mechanicId });

  // Turnos asignados
  const {
    data: apptsData,
    isLoading: isLoadingAppointments,
    isError: isErrorAppointments,
    refetch: refetchAppointments,
  } = useListMyAppointmentsQuery({ mechanicId }, { skip: !mechanicId });

  // Talleres a los que pertenece
  const {
    data: workshopsData,
    isLoading: isLoadingWorkshops,
    isError: isErrorWorkshops,
    refetch: refetchWorkshops,
  } = useListMyWorkshopsQuery({ mechanicId }, { skip: !mechanicId });

  const appointments = useMemo(() => apptsData || [], [apptsData]);
  const workshops = useMemo(() => workshopsData || [], [workshopsData]);

  const viewModel = useMemo(() => {
    if (!mechanic) return null;

    const first_name = mechanic.first_name || "";
    const last_name = mechanic.last_name || "";
    const email = mechanic.email || "";
    const phone = mechanic.phone || "";
    const specialtiesArr = mechanic.specialties || [];
    const created_at = mechanic.created_at;

    const specialties =
      Array.isArray(specialtiesArr) && specialtiesArr.length
        ? specialtiesArr.join(", ")
        : "-";

    return {
      id: mechanic.id,
      first_name,
      last_name,
      fullName: `${last_name}, ${first_name}`,
      email,
      phone,
      specialties,
      created_at,
      createdAtFormatted: created_at ? formatDate(created_at) : "-",
      initials: initialsFrom(first_name, last_name),
    };
  }, [mechanic]);

  return {
    mechanicId,
    mechanic: viewModel,

    appointments,
    workshops,

    isLoadingMechanic,
    isErrorMechanic,
    isLoadingAppointments,
    isErrorAppointments,
    isLoadingWorkshops,
    isErrorWorkshops,

    isAnyTabLoading: (tabIndex) =>
      isLoadingMechanic ||
      (tabIndex === 1 && isLoadingAppointments) ||
      (tabIndex === 2 && isLoadingWorkshops),

    hasTabError: (tabIndex) =>
      isErrorMechanic ||
      (tabIndex === 1 && isErrorAppointments) ||
      (tabIndex === 2 && isErrorWorkshops),

    refetchMechanic,
    refetchAppointments,
    refetchWorkshops,
  };
}
