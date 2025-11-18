// src/features/customer/components/CustomerCreateAppointmentForm.jsx

import PropTypes from "prop-types";
import { Box } from "@mui/material";
import GenericForm from "../../../components/common/form/GenericForm.jsx";
import { useCustomerCreateAppointment } from "../hooks/useCustomerCreateAppointment.jsx";

const CustomerCreateAppointmentForm = ({ customerId, onSuccess }) => {
  const { fields, handleSubmit, isSubmitting, errorMessage } =
    useCustomerCreateAppointment({ customerId, onSuccess });

  return (
    <Box>
      <GenericForm
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Crear turno"
        isSubmitting={isSubmitting}
      />

      {errorMessage && (
        <Box
          sx={{
            mt: 1,
            color: "#f87171",
            fontSize: 14,
          }}
        >
          {errorMessage}
        </Box>
      )}
    </Box>
  );
};

CustomerCreateAppointmentForm.propTypes = {
  customerId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
};

export default CustomerCreateAppointmentForm;
