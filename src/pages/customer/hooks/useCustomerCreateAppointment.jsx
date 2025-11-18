// src/features/customer/hooks/useCustomerCreateAppointment.jsx

import { useState, useMemo } from "react";
import {
  useCustomerCreateAppointmentMutation,
  useCustomerListVehiclesQuery,
  useCustomerListServicesQuery,
} from "../../../apis/customer/customer.api";

import {
  useListAllWorkshopsQuery,
  useViewMechanicsQuery,
} from "../../../apis/mechanic/mechanic.api";

// ajustá el path a tu hook real

export const useCustomerCreateAppointment = ({ customerId, onSuccess }) => {
  const [createAppointment, { isLoading }] =
    useCustomerCreateAppointmentMutation();

  const { data: servicesData, isLoading: isLoadingServices } =
    useCustomerListServicesQuery();

  const { data: vehiclesData, isLoading: isLoadingVehicles } =
    useCustomerListVehiclesQuery({ customerId });

  const { data: workshopsData, isLoading: isLoadingWorkshops } =
    useListAllWorkshopsQuery();

  const { data: mechanicsData, isLoading: isLoadingMechanics } =
    useViewMechanicsQuery();

  const [errorMessage, setErrorMessage] = useState(null);

  // ===== Opciones =====
  const serviceOptions = useMemo(
    () =>
      servicesData?.map((service) => ({
        value: service.id,
        label: service.name,
      })) ?? [],
    [servicesData],
  );

  const vehicleOptions = useMemo(
    () =>
      vehiclesData?.map((vehicle) => ({
        value: vehicle.id,
        label: `${vehicle.brand} ${vehicle.model} (${vehicle.license_plate})`,
      })) ?? [],
    [vehiclesData],
  );

  const workshopOptions = useMemo(
    () =>
      workshopsData?.map((workshop) => ({
        value: workshop.id,
        label: workshop.name,
      })) ?? [],
    [workshopsData],
  );

  const mechanicOptions = useMemo(
    () =>
      mechanicsData?.map((mechanic) => ({
        value: mechanic.id,
        label: `${mechanic.first_name} ${mechanic.last_name}`,
      })) ?? [],
    [mechanicsData],
  );

  // ===== Campos para GenericForm =====
  const fields = useMemo(
    () => [
      {
        type: "select",
        name: "service_id",
        label: "Servicio",
        options: serviceOptions,
        rules: { required: "El servicio es obligatorio" },
        xs: 12,
        md: 6,
        disabled: isLoadingServices,
      },
      {
        type: "select",
        name: "workshop_id",
        label: "Taller",
        options: workshopOptions,
        rules: { required: "El taller es obligatorio" },
        xs: 12,
        md: 6,
        disabled: isLoadingWorkshops,
      },
      {
        type: "select",
        name: "mechanic_id",
        label: "Mecánico",
        options: mechanicOptions,
        rules: { required: "El mecánico es obligatorio" },
        xs: 12,
        md: 6,
        disabled: isLoadingMechanics,
      },
      {
        type: "select",
        name: "vehicle_id",
        label: "Vehículo",
        options: vehicleOptions,
        rules: { required: "El vehículo es obligatorio" },
        xs: 12,
        md: 6,
        disabled: isLoadingVehicles,
      },
      {
        type: "datetime",
        name: "scheduled_at",
        label: "Fecha y hora",
        xs: 12,
        md: 6,
        rules: { required: "La fecha y hora son obligatorias" },
      },
      {
        type: "text",
        name: "notes",
        label: "Notas",
        multiline: true,
        minRows: 3,
        xs: 12,
        md: 12,
        helperLines: 2,
      },
    ],
    [
      serviceOptions,
      workshopOptions,
      mechanicOptions,
      vehicleOptions,
      isLoadingServices,
      isLoadingWorkshops,
      isLoadingMechanics,
      isLoadingVehicles,
    ],
  );

  // ===== Submit =====
  const handleSubmit = async (values) => {
    setErrorMessage(null);

    try {
      const scheduledAtISO = values.scheduled_at
        ? new Date(values.scheduled_at).toISOString()
        : null;

      const payload = {
        customer_id: customerId,

        service_id: values.service_id,
        mechanic_id: values.mechanic_id,
        vehicle_id: values.vehicle_id || null,
        workshop_id: values.workshop_id,
        scheduled_at: scheduledAtISO,
        notes: values.notes || null,
        status: "PENDING",
      };

      await createAppointment({ customerId, ...payload }).unwrap();

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      const apiMsg =
        err?.data?.message || err?.data?.error || "No se pudo crear el turno.";
      setErrorMessage(Array.isArray(apiMsg) ? apiMsg.join(" · ") : apiMsg);
    }
  };

  return {
    fields,
    handleSubmit,
    isSubmitting: isLoading,
    errorMessage,
  };
};
