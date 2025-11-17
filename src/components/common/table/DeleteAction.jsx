import PropTypes from "prop-types";
import {
  IconButton,
  Modal,
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import styles from "./DeleteAction.module.css";

// --- Toast global imperativo (solo 'success' | 'error') ---

function EphemeralToast({
  message,
  severity = "success",
  duration = 3000,
  onDone,
}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (_e, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  // clamp por si alguien llama mal
  const sev = severity === "error" ? "error" : "success";

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      // reemplaza TransitionProps (deprecado) por slotProps.transition
      slotProps={{ transition: { onExited: onDone } }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        onClose={handleClose}
        severity={sev}
        variant="filled"
        sx={(theme) => ({
          width: "100%",
          bgcolor:
            sev === "success"
              ? theme.palette.success.dark
              : theme.palette.error.dark,
          color:
            sev === "success"
              ? theme.palette.getContrastText(theme.palette.success.dark)
              : theme.palette.getContrastText(theme.palette.error.dark),
        })}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

function showToastGlobal({ message, severity = "success", duration = 3000 }) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);

  let cleaned = false;
  const deferredCleanup = () => {
    if (cleaned) return;
    cleaned = true;
    const defer =
      window.requestAnimationFrame?.bind(window) || ((fn) => setTimeout(fn, 0));
    defer(() => {
      root.unmount();
      host.remove();
    });
  };

  root.render(
    <EphemeralToast
      message={message}
      severity={severity === "error" ? "error" : "success"}
      duration={duration}
      onDone={deferredCleanup}
    />,
  );
}

// --- Componente principal ---

const DeleteAction = ({
  onDelete,
  itemName,
  itemId,
  successMessage,
  errorMessage,
  onDeleted,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleConfirmDelete = async () => {
    if (!onDelete) return;
    try {
      const res = await onDelete(itemId);
      const ok = typeof res?.success === "boolean" ? res.success : true;

      if (ok) {
        showToastGlobal({
          message: successMessage ?? `Se eliminó correctamente: ${itemName}`,
          severity: "success",
          duration: 3000,
        });
        onDeleted?.(itemId);
      } else {
        showToastGlobal({
          message: errorMessage ?? "Error al eliminar",
          severity: "error",
          duration: 3000,
        });
      }
    } catch {
      showToastGlobal({
        message: errorMessage ?? "Error al eliminar",
        severity: "error",
        duration: 3000,
      });
    } finally {
      setOpenModal(false);
    }
  };

  return (
    <>
      <IconButton
        color="error"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleOpenModal();
        }}
        aria-label={`Eliminar ${itemName}`}
      >
        <Delete />
      </IconButton>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className={styles.modalBox}>
          <Typography variant="h6" component="h2">
            Confirmar eliminación
          </Typography>
          <Typography sx={{ mt: 2 }}>
            ¿Estás seguro de que querés eliminar a <strong>{itemName}</strong>?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseModal();
              }}
              sx={{ mr: 2 }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                handleConfirmDelete();
              }}
            >
              Eliminar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

DeleteAction.propTypes = {
  onDelete: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired,
  itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  onDeleted: PropTypes.func,
};

export default DeleteAction;
