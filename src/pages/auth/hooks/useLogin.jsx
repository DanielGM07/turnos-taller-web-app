import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWorkshopUser } from "../../../stores/workshop-user/slice.js";
import { ROLES } from "../../../constants/roles.constants.js";

// IDs que me pasaste
const MOCK_IDS = {
  CUSTOMER: "5a22eb95-438b-463a-9f76-cd9e5b8bd886",
  MECHANIC: "202e74a4-9b84-4464-aae4-94d8ded1cf02",
  ADMIN: "4072926b-3f5e-47e5-9b3b-ccdc65672dfc",
};

export default function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const lower = username.toLowerCase();
      let userData = null;

      if (lower.includes("customer")) {
        userData = {
          role: ROLES.CUSTOMER,
          id: MOCK_IDS.CUSTOMER,
        };
        navigate(`/detail/${MOCK_IDS.CUSTOMER}`);
      } else if (lower.includes("mechanic")) {
        userData = {
          role: ROLES.MECHANIC,
          id: MOCK_IDS.MECHANIC,
        };
        navigate("/mechanic-test");
      } else if (lower.includes("admin")) {
        userData = {
          role: ROLES.ADMIN,
          id: MOCK_IDS.ADMIN,
        };
        navigate("/admin-test");
      } else {
        alert(
          "Usa un usuario de prueba que contenga 'customer', 'mechanic' o 'admin' en el email.",
        );
        return;
      }

      // guardamos en redux + persist
      dispatch(setWorkshopUser(userData));
    } catch (err) {
      console.error("Login error:", err);
      alert("Ocurrió un error al iniciar sesión");
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
