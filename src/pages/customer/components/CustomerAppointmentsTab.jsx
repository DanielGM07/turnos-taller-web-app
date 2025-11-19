// src/pages/customer/components/CustomerAppointmentsTab.jsx
import PropTypes from "prop-types";
import { Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GenericTable from "../../../components/common/table/GenericTable.jsx";
import useCustomerAppointmentsTab from "../hooks/useCustomerAppointmentsTab.jsx";

const CustomerAppointmentsTab = ({ customerId }) => {
  const navigate = useNavigate();

  const {
    columns,
    searchFields,
    data,
    isLoading,
    isError,
    error,
    onSearch,
    onClear,
  } = useCustomerAppointmentsTab(customerId);

  if (!customerId) {
    return (
      <Alert severity="warning">
        No se proporcionó el ID de cliente para cargar los turnos.
      </Alert>
    );
  }

  return (
    <Box sx={{ mt: 1 }}>
      <GenericTable
        title="Turnos del cliente"
        subtitle="Listado de todos los turnos asociados a este cliente"
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error}
        searchFields={searchFields}
        onSearch={onSearch}
        onClear={onClear}
        // ⬇️ Botón para solicitar turno
        addButton={{
          label: "Solicitar turno",
          onClick: () =>
            navigate(`/customer/create-appointment?customerId=${customerId}`),
        }}
        // Sin paginación por ahora (el backend devuelve array simple)
        pagination={null}
      />
    </Box>
  );
};

CustomerAppointmentsTab.propTypes = {
  customerId: PropTypes.string.isRequired,
};

export default CustomerAppointmentsTab;
