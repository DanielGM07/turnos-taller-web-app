// por ejemplo en src/routes/CustomerRootElement.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function CustomerRootElement() {
  const user = useSelector((state) => state.workshop_user);

  // Si por algún motivo no hay user, lo mandás a login o a "/"
  if (!user?.id) {
    return <Navigate to="/" replace />;
  }

  return <Navigate to={`/customer/detail/${user.id}`} replace />;
}
