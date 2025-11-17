import { useSelector } from "react-redux";
import { ROLES } from "../constants/roles.constants.js";

import CUSTOMER_NAVIGATION from "../routes/navigation/customer.js";
import MECHANIC_NAVIGATION from "../routes/navigation/mechanic.js";
import ADMIN_NAVIGATION from "../routes/navigation/admin.js";

function useApp() {
  const userRole = useSelector((state) => state.workshop_user.role);

  function getNavigationByRole(role) {
    switch (role) {
      case ROLES.CUSTOMER:
        return CUSTOMER_NAVIGATION;
      case ROLES.MECHANIC:
        return MECHANIC_NAVIGATION;
      case ROLES.ADMIN:
        return ADMIN_NAVIGATION;
      default:
        return [];
    }
  }

  const NAVIGATION = getNavigationByRole(userRole);

  return { userRole, NAVIGATION };
}

export default useApp;
