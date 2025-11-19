// src/pages/admin/mechanic-detail/components/MechanicReviews.jsx

import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Avatar,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import RatingStars from "../../../../components/common/RatingStars.jsx";
import useAdminMechanicReviews from "../hooks/useAdminMechanicReviews";

export default function MechanicReviews({ mechanicId }) {
  const { reviews, isLoading } = useAdminMechanicReviews(mechanicId);

  if (isLoading) return null;

  const average =
    reviews.length === 0
      ? 0
      : reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;

  return (
    <Card>
      <CardContent>
        {/* ENCABEZADO */}
        <Typography variant="h6" sx={{ mb: 1 }}>
          Rating promedio
        </Typography>

        <RatingStars value={average} />

        <Divider sx={{ my: 2 }} />

        {reviews.length === 0 && (
          <Typography color="text.secondary">No hay reviews.</Typography>
        )}

        {/* LISTA DE REVIEWS */}
        <Stack spacing={2}>
          {reviews.map((rev) => (
            <Card key={rev.id} variant="outlined">
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  {/* Avatar de usuario */}
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    <PersonIcon />
                  </Avatar>

                  {/* Contenido del review */}
                  <Box sx={{ flex: 1 }}>
                    {/* Cliente */}
                    <Typography fontWeight="bold">
                      {rev.customer
                        ? `${rev.customer.first_name} ${rev.customer.last_name}`
                        : "Cliente desconocido"}
                    </Typography>

                    {/* Estrellas de la review */}
                    <RatingStars value={rev.rating} />

                    {/* Información del turno */}
                    <Box sx={{ mt: 1 }}>
                      {rev.appointment && (
                        <>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Fecha:</strong>{" "}
                            {rev.appointment.scheduled_at?.slice(0, 16)}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            <strong>Taller:</strong>{" "}
                            {rev.appointment.workshop?.name || "—"}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            <strong>Servicio:</strong>{" "}
                            {rev.appointment.service?.name || "—"}
                          </Typography>
                        </>
                      )}
                    </Box>

                    {/* Comentario */}
                    <Typography sx={{ mt: 1 }}>
                      {rev.comment || "(Sin comentario)"}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
