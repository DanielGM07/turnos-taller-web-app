import { useNavigate } from "react-router-dom";
import { useCreateServiceMutation } from "../../../../apis/service/service.api";

export default function useMechanicCreateService() {
  const navigate = useNavigate();
  const [createService, { isLoading }] = useCreateServiceMutation();

  const onSubmit = async (values) => {
    // El DTO espera strings numéricas para min_price y max_price, así que está OK
    const payload = {
      name: values.name,
      description: values.description || undefined,
      min_price: values.min_price,
      max_price: values.max_price,
    };

    try {
      await createService(payload).unwrap();
      // acá podrías usar tu snackbar/toast global si querés
      // showToastGlobal({ message: "Servicio creado correctamente", severity: "success" });
      navigate("/mechanic/services");
    } catch (e) {
      console.error(e);
      // idem: podrías mostrar un toast de error
      // showToastGlobal({ message: "Error al crear el servicio", severity: "error" });
    }
  };

  return { onSubmit, isSubmitting: isLoading };
}
