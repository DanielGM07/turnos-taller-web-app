import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  useViewMechanicQuery,
  useUpdateMechanicMutation,
} from "../../../../apis/mechanic/mechanic.api";
import { MECHANIC_STATUS } from "../../../../constants/mechanic-status.constants";

export default function useAdminEditMechanic(id) {
  const { data: mechanic, isLoading } = useViewMechanicQuery(id);

  const [updateMechanic, { isLoading: isSubmitting }] =
    useUpdateMechanicMutation();

  // mapeo de mechanic -> valores del form
  const defaultValues = useMemo(() => {
    if (!mechanic) return {};

    return {
      first_name: mechanic.first_name ?? "",
      last_name: mechanic.last_name ?? "",
      email: mechanic.email ?? "",
      birth_date: mechanic.birth_date ? mechanic.birth_date.slice(0, 10) : "",
      specialties: (mechanic.specialties || []).join(", "),
      commission_percentage: mechanic.commission_percentage ?? 0,
      status: mechanic.status ?? MECHANIC_STATUS.ENABLED,
    };
  }, [mechanic]);

  const form = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { reset, watch, formState } = form;

  useEffect(() => {
    if (mechanic) {
      reset(defaultValues);
    }
  }, [mechanic, defaultValues, reset]);

  const values = watch();
  const isDirty =
    formState.isDirty &&
    JSON.stringify(values) !== JSON.stringify(defaultValues);

  const fields = useMemo(
    () => [
      {
        type: "text",
        name: "first_name",
        label: "Nombre",
        rules: { required: "Obligatorio" },
      },
      {
        type: "text",
        name: "last_name",
        label: "Apellido",
        rules: { required: "Obligatorio" },
      },
      {
        type: "email",
        name: "email",
        label: "Correo electrónico",
        rules: { required: "Obligatorio" },
      },
      {
        type: "date",
        name: "birth_date",
        label: "Fecha de nacimiento",
        rules: { required: "Obligatorio" },
      },
      {
        type: "text",
        name: "specialties",
        label: "Especialidades (separadas por coma)",
      },
      {
        type: "number",
        name: "commission_percentage",
        label: "Porcentaje de comisión (%)",
        rules: { min: { value: 0, message: "Mínimo 0" } },
      },
      {
        type: "select",
        name: "status",
        label: "Estado",
        options: [
          { value: MECHANIC_STATUS.ENABLED, label: "Habilitado" },
          { value: MECHANIC_STATUS.DISABLED, label: "Deshabilitado" },
        ],
        rules: { required: "Obligatorio" },
      },
    ],
    [],
  );

  const onSubmit = async (data) => {
    try {
      const specialties = data.specialties
        ? data.specialties
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

      const body = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        birth_date: data.birth_date,
        specialties,
        commission_percentage: Number(data.commission_percentage) || 0,
        status: data.status,
      };

      await updateMechanic({ id, body }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    mechanic,
    isLoading,
    isSubmitting,
    fields,
    form,
    onSubmit,
    isDirty,
  };
}
