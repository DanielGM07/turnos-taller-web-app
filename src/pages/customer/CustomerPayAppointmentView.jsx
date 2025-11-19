// src/pages/customer/CustomerPayAppointmentView.jsx
// (si aún no lo tenés creado)
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import GenericForm from "../../components/common/form/GenericForm.jsx";
import { PAYMENT_METHOD_OPTIONS } from "../../constants/payment.constants.js";
import { useCreatePaymentMutation } from "../../apis/payment/payment.api";
import { useGetAppointmentByIdQuery } from "../../apis/appointment/appointment.api";

const CustomerPayAppointmentView = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const {
    data: appointment,
    isLoading: isLoadingAppointment,
    isError: isErrorAppointment,
  } = useGetAppointmentByIdQuery(appointmentId, { skip: !appointmentId });

  const [createPayment, { isLoading: isSubmitting }] =
    useCreatePaymentMutation();

  const defaultValues = useMemo(
    () => ({
      amount_total: appointment?.final_price ?? "",
      method: "",
      notes: "",
    }),
    [appointment],
  );

  const fields = useMemo(
    () => [
      {
        type: "number",
        name: "amount_total",
        label: "Monto a pagar",
        rules: {
          required: "El monto es obligatorio",
        },
        helperLines: 1,
      },
      {
        type: "select",
        name: "method",
        label: "Método de pago",
        options: PAYMENT_METHOD_OPTIONS,
        rules: {
          required: "El método de pago es obligatorio",
        },
      },
      {
        type: "text",
        name: "notes",
        label: "Notas (opcional)",
        helperLines: 2,
      },
    ],
    [],
  );

  const handleSubmit = async (values) => {
    await createPayment({
      appointment_id: appointmentId,
      amount_total: values.amount_total?.toString(),
      method: values.method,
      notes: values.notes || undefined,
    }).unwrap();

    navigate(-1); // volver a la pantalla anterior
  };

  if (!appointmentId) {
    return <Typography>No se encontró el turno a pagar.</Typography>;
  }

  if (isErrorAppointment) {
    return <Typography>Error al cargar el turno.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Pagar turno
        </Typography>

        {isLoadingAppointment ? (
          <Typography>Cargando datos del turno...</Typography>
        ) : appointment ? (
          <Box sx={{ mb: 2, fontSize: 14, color: "text.secondary" }}>
            <div>
              <strong>Servicio:</strong> {appointment.service?.name ?? "-"}
            </div>
            <div>
              <strong>Taller:</strong> {appointment.workshop?.name ?? "-"}
            </div>
            <div>
              <strong>Mecánico:</strong>{" "}
              {appointment.mechanic
                ? `${appointment.mechanic.first_name} ${appointment.mechanic.last_name}`
                : "-"}
            </div>
            <div>
              <strong>Fecha:</strong>{" "}
              {new Date(appointment.scheduled_at).toLocaleString()}
            </div>
          </Box>
        ) : null}

        <GenericForm
          fields={fields}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          submitLabel="Pagar"
          showCancel
          cancelLabel="Cancelar"
          onCancel={() => navigate(-1)}
          isSubmitting={isSubmitting}
        />
      </Paper>
    </Box>
  );
};

export default CustomerPayAppointmentView;
