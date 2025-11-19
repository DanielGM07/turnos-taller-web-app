import {
  useViewWorkshopQuery,
  useUpdateWorkshopMutation,
} from "../../../../apis/admin/admin.api.js";
import { useNavigate } from "react-router-dom";
import useEditEntityForm from "../../../../components/common/form/hooks/useEditEntityForm.js";
import { useMemo } from "react";

export default function useAdminEditWorkshop(id) {
  const navigate = useNavigate();

  const { data: workshop, isLoading } = useViewWorkshopQuery(id);
  const [updateWorkshop, updateState] = useUpdateWorkshopMutation();

  const fields = useMemo(
    () => [
      {
        type: "text",
        name: "name",
        label: "Nombre",
        rules: { required: "Obligatorio" },
      },
      {
        type: "text",
        name: "address",
        label: "Dirección",
        rules: { required: "Obligatorio" },
      },
      {
        type: "time",
        name: "opens_at",
        label: "Abre a",
        rules: { required: "Obligatorio" },
      },
      {
        type: "time",
        name: "closes_at",
        label: "Cierra a",
        rules: { required: "Obligatorio" },
      },
    ],
    [],
  );

  const handleSubmit = async (data) => {
    try {
      await updateWorkshop({ workshopId: id, body: data }).unwrap();
      navigate(`/admin/workshops/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const { formMethods, onSubmit, isDirty } = useEditEntityForm(
    workshop || {},
    handleSubmit,
  );

  return {
    workshop,
    fields,
    onSubmit,
    formMethods,
    isDirty,
    isSubmitting: updateState.isLoading || isLoading,
  };
}
