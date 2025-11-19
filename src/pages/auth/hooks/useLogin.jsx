import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setWorkshopUser } from "../../../stores/workshop-user/slice.js";
import { ROLES } from "../../../constants/roles.constants.js";
import { loginRequest } from "../../../apis/auth.api.js";

export default function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState(""); // email
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const data = await loginRequest(username, password);
      // data = { id, role, first_name, last_name }

      const userData = {
        id: data.id,
        role: data.role,
        first_name: data.first_name,
        last_name: data.last_name,
      };

      // Guardar en redux
      dispatch(setWorkshopUser(userData));

      // Opcional extra: guardar también en localStorage
      localStorage.setItem("workshop_user", JSON.stringify(userData));

      // Navegar según rol
      switch (data.role) {
        case ROLES.CUSTOMER:
          navigate(`/customer/detail/${data.id}`);
          break;
        case ROLES.MECHANIC:
          navigate("/mechanic");
          break;
        case ROLES.ADMIN:
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Ocurrió un error al iniciar sesión");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    onSubmit,
    isSubmitting,
  };
}
