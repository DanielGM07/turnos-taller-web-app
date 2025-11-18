// src/pages/customer/hooks/useCustomerCreateVehicleForm.jsx

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCustomerCreateVehicleMutation } from "../../../apis/customer/customer.api.js";

export default function useCustomerCreateVehicleForm() {
  const user = useSelector((state) => state.workshop_user);
  const customerId = user?.id;
  const navigate = useNavigate();

  const [customerCreateVehicle, { isLoading, isSuccess, error }] =
    useCustomerCreateVehicleMutation();

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      brand: "",
      model: "",
      year: "",
      license_plate: "",
      color: "",
      vin: "",
    },
  });

  const onSubmit = async (data) => {
    if (!customerId) {
      console.error("No se encontró el customerId del usuario logueado");
      return;
    }

    try {
      await customerCreateVehicle({
        customerId,
        // 👇 el backend está pidiendo esto:
        customer_id: customerId,
        ...data,
      }).unwrap();

      navigate(`/customer/detail/${customerId}`);
    } catch (e) {
      console.error("Error al crear vehículo", e);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: isLoading,
    isSuccess,
    error,
  };
}
