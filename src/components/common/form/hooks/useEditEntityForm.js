import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";

export default function useEditEntityForm(initialValues, submitFn) {
  const formMethods = useForm({
    defaultValues: initialValues,
    mode: "onChange",
  });

  const { watch, handleSubmit, reset } = formMethods;

  // Determinar cambios
  const current = watch();
  const isDirty = useMemo(() => {
    return JSON.stringify(initialValues) !== JSON.stringify(current);
  }, [initialValues, current]);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const onSubmit = handleSubmit((data) => submitFn(data));

  return {
    formMethods,
    onSubmit,
    isDirty,
  };
}
