// src/pages/admin/create-mechanic/hooks/useAdminCreateMechanic.js

import { useCreateMechanicMutation } from "../../../../apis/mechanic/mechanic.api";
// o "../../../../api/mechanic/mechanic.api" según tu carpeta real

import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { MECHANIC_SPECIALTIES } from "../../../../constants/mechanic-specialties.constants";

export default function useAdminCreateMechanic() {
  const navigate = useNavigate();
  const [createMechanic, { isLoading }] = useCreateMechanicMutation();

  const specialtiesOptions = useMemo(
    () =>
      Object.values(MECHANIC_SPECIALTIES).map((sp) => ({
        label: sp,
        value: sp,
      })),
    [],
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        const { confirm_password, ...body } = data;
        await createMechanic(body).unwrap();
        navigate("/admin/mechanics");
      } catch (err) {
        console.error(err);
      }
    },
    [createMechanic, navigate],
  );

  return {
    onSubmit,
    isSubmitting: isLoading,
    specialtiesOptions,
  };
}
