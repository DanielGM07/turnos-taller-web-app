import { useCreateWorkshopMutation } from "../../../../apis/admin/admin.api";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function useAdminCreateWorkshop() {
  const navigate = useNavigate();
  const [createWorkshop, { isLoading }] = useCreateWorkshopMutation();

  const onSubmit = useCallback(
    async (data) => {
      try {
        await createWorkshop(data).unwrap();
        navigate("/admin/workshops");
      } catch (err) {
        console.error(err);
      }
    },
    [createWorkshop, navigate],
  );

  return {
    onSubmit,
    isSubmitting: isLoading,
  };
}
