import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearWorkshopUser } from "../stores/workshop-user/slice.js";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseSession = () => {
    dispatch(clearWorkshopUser());
    navigate("/"); // RootElement en "/" va a mostrar el Login
  };

  return (
    <Button color="error" variant="contained" onClick={handleCloseSession}>
      Cerrar sesión
    </Button>
  );
}
