// src/routes/MechanicRootElement.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function MechanicRootElement() {
  const user = useSelector((state) => state.workshop_user);

  if (!user?.id) {
    return <Navigate to="/" replace />;
  }

  return <Navigate to={`/mechanic/detail/${user.id}`} replace />;
}
