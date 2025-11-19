import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCustomerMutation } from "../../../apis/customer/customer.api";

export default function useRegister() {
  const navigate = useNavigate();
  const [createCustomer] = useCreateCustomerMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createCustomer(data).unwrap();

      alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");

      navigate("/"); // login
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Error al registrar usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting };
}
