// src/pages/customer/CustomerPaymentsListView.jsx

import { useSelector } from "react-redux";
import { Box, Typography, Paper } from "@mui/material";
import GenericTable from "../../components/common/table/GenericTable";
import { useListCustomerPaymentsQuery } from "../../apis/payment/payment.api";

const CustomerPaymentsListView = () => {
  const user = useSelector((state) => state.workshop_user);
  const customerId = user?.id;

  const {
    data: paymentsResponse,
    isLoading,
    isError,
    error,
  } = useListCustomerPaymentsQuery({ customerId }, { skip: !customerId });

  // 🔹 Aseguramos que payments siempre sea un array
  //   Por si tu backend devuelve { items: [...], meta: ... } o algo así.
  const payments = Array.isArray(paymentsResponse)
    ? paymentsResponse
    : (paymentsResponse?.items ?? []);

  const columns = [
    {
      id: "created_at",
      label: "Fecha de pago",
      align: "left",
      isDateValue: true,
    },
    {
      id: "amount_total",
      label: "Monto",
      align: "right",
      render: (row) => `$ ${row.amount_total}`,
    },
    {
      id: "method",
      label: "Método",
      align: "left",
    },
    {
      id: "status",
      label: "Estado",
      align: "left",
    },
    {
      id: "service",
      label: "Servicio",
      align: "left",
      render: (row) => row.appointment?.service?.name ?? "-",
    },
    {
      id: "workshop",
      label: "Taller",
      align: "left",
      render: (row) => row.appointment?.workshop?.name ?? "-",
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Mis pagos
      </Typography>

      <Paper sx={{ p: 2 }}>
        <GenericTable
          columns={columns}
          // 👇 le pasamos las filas usando *ambos* nombres
          //    para cubrir cómo esté implementado tu GenericTable.
          rows={payments}
          data={payments}
          loading={isLoading}
          error={isError ? error : null}
        />
      </Paper>
    </Box>
  );
};

export default CustomerPaymentsListView;
