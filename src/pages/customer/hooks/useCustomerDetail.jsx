// src/pages/customer/hooks/useCustomerDetail.jsx
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  useViewCustomerQuery,
  useCustomerListVehiclesQuery,
  useCustomerListAppointmentsQuery,
} from "../../../apis/customer/customer.api";

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

const ageFromBirthDate = (iso) => {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (isNaN(d)) return undefined;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
};

const initialsFrom = (first = "", last = "") =>
  `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();

export default function useCustomerDetail() {
  const { id: customerId } = useParams();

  const {
    data: customer,
    isLoading: isLoadingCustomer,
    isError: isErrorCustomer,
    refetch: refetchCustomer,
  } = useViewCustomerQuery(customerId, { skip: !customerId });

  const {
    data: vehiclesData,
    isLoading: isLoadingVehicles,
    isError: isErrorVehicles,
    refetch: refetchVehicles,
  } = useCustomerListVehiclesQuery({ customerId }, { skip: !customerId });

  const {
    data: apptsData,
    isLoading: isLoadingAppts,
    isError: isErrorAppts,
    refetch: refetchAppts,
  } = useCustomerListAppointmentsQuery({ customerId }, { skip: !customerId });

  const vehicles = useMemo(() => vehiclesData || [], [vehiclesData]);
  const appointments = useMemo(() => apptsData || [], [apptsData]);

  const viewModel = useMemo(() => {
    if (!customer) return null;

    const first_name = customer.first_name || "";
    const last_name = customer.last_name || "";
    const email = customer.email || "";
    const dni = customer.dni || "";
    const birth_date = customer.birth_date;
    const created_at = customer.created_at;

    const age = ageFromBirthDate(birth_date);

    return {
      id: customer.id,
      first_name,
      last_name,
      fullName: `${last_name}, ${first_name}`,
      email,
      dni,
      birth_date,
      birthDateFormatted: birth_date ? formatDate(birth_date) : "-",
      age,
      created_at,
      createdAtFormatted: created_at ? formatDate(created_at) : "-",
      initials: initialsFrom(first_name, last_name),
    };
  }, [customer]);

  return {
    customerId,
    customer: viewModel,
    vehicles,
    appointments,

    isLoadingCustomer,
    isErrorCustomer,
    isLoadingVehicles,
    isErrorVehicles,
    isLoadingAppts,
    isErrorAppts,

    isAnyTabLoading: (tabIndex) =>
      isLoadingCustomer ||
      (tabIndex === 1 && isLoadingVehicles) ||
      (tabIndex === 2 && isLoadingAppts),

    hasTabError: (tabIndex) =>
      isErrorCustomer ||
      (tabIndex === 1 && isErrorVehicles) ||
      (tabIndex === 2 && isErrorAppts),

    refetchCustomer,
    refetchVehicles,
    refetchAppts,
  };
}
