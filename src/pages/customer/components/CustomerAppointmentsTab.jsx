// src/pages/customer/components/CustomerAppointmentsTab.jsx
import PropTypes from "prop-types";
import { Box, Alert } from "@mui/material";
import GenericTable from "../../../components/common/table/GenericTable.jsx";
import useCustomerAppointmentsTab from "../hooks/useCustomerAppointmentsTab.jsx";

const CustomerAppointmentsTab = ({ customerId }) => {
  const { columns, data, isLoading, isError, error } =
    useCustomerAppointmentsTab(customerId);

  return (
    <Box sx={{ mt: 1 }}>
      {/* Mensaje de error general */}
      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error al cargar los turnos: {error?.message || "Desconocido"}
        </Alert>
      )}

      <GenericTable
        title="Mis turnos"
        columns={columns}
        data={Array.isArray(data) ? data : []}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </Box>
  );
};

CustomerAppointmentsTab.propTypes = {
  customerId: PropTypes.string.isRequired,
};

export default CustomerAppointmentsTab;
