// src/pages/mechanic/components/MechanicWorkshopsTab.jsx
import PropTypes from "prop-types";
import { Box, Snackbar, Alert as MuiAlert, Button } from "@mui/material";
import React from "react";

import GenericTable from "../../../components/common/table/GenericTable";
import { formatDate } from "../../../utils/formatDate.utils";
import { useUnenrollWorkshopMutation } from "../../../apis/mechanic/mechanic.api";

export default function MechanicWorkshopsTab({
  workshops,
  mechanicId,
  onAfterUnenroll,
}) {
  const [unenrollWorkshop, { isLoading: isUnenrolling }] =
    useUnenrollWorkshopMutation();

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const handleUnenroll = async (workshopId, workshopName) => {
    if (!mechanicId) {
      showSnackbar("No se pudo determinar el mecánico logueado.", "error");
      return;
    }

    try {
      await unenrollWorkshop({ mechanicId, workshopId }).unwrap();
      showSnackbar(
        `Te desinscribiste del taller "${workshopName}".`,
        "success",
      );
      onAfterUnenroll?.();
    } catch (error) {
      const backendMsg =
        error?.data?.message || "No se pudo desinscribirse del taller.";
      showSnackbar(backendMsg, "error");
    }
  };

  const columns = [
    {
      id: "name",
      label: "Nombre",
      align: "left",
    },
    {
      id: "address",
      label: "Dirección",
      align: "left",
    },
    {
      id: "opens_at",
      label: "Abre",
      align: "center",
      render: (row) => row.opens_at ?? "-",
    },
    {
      id: "closes_at",
      label: "Cierra",
      align: "center",
      render: (row) => row.closes_at ?? "-",
    },
    {
      id: "created_at",
      label: "Fecha alta",
      align: "center",
      render: (row) => (row.created_at ? formatDate(row.created_at) : "-"),
    },
    {
      id: "actions",
      label: "Acciones",
      align: "right",
      render: (row) => (
        <Button
          size="small"
          variant="outlined"
          color="error"
          disabled={isUnenrolling}
          onClick={(e) => {
            e.stopPropagation();
            handleUnenroll(row.id, row.name);
          }}
        >
          Desinscribirme
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ mt: 1 }}>
      <GenericTable
        title="Mis talleres"
        subtitle={
          Array.isArray(workshops) && workshops.length === 0
            ? "No estás inscripto en ningún taller todavía."
            : "Talleres en los que estás actualmente inscripto."
        }
        columns={columns}
        data={Array.isArray(workshops) ? workshops : []}
        isLoading={false}
        isError={false}
        searchFields={null}
        onSearch={() => {}}
        onClear={() => {}}
        pagination={null}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MuiAlert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

MechanicWorkshopsTab.propTypes = {
  workshops: PropTypes.array.isRequired,
  mechanicId: PropTypes.string.isRequired,
  onAfterUnenroll: PropTypes.func,
};
