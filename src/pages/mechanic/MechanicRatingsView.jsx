// src/pages/mechanic/MechanicRatingsView.jsx
import { useSelector } from "react-redux";
import GenericTable from "../../components/common/table/GenericTable.jsx";
import RatingStars from "../../components/common/RatingStars.jsx";
import { useListMyReviewsQuery } from "../../apis/mechanic/mechanic.api.js";

const columns = [
  {
    id: "customer",
    label: "Cliente",
    render: (row) =>
      row.customer
        ? `${row.customer.first_name} ${row.customer.last_name}`
        : "—",
  },
  {
    id: "rating",
    label: "Calificación",
    render: (row) => <RatingStars value={row.rating} />,
  },
  {
    id: "appointment",
    label: "Turno",
    render: (row) =>
      row.appointment
        ? `${row.appointment.scheduled_at?.slice(0, 16)}`
        : "Sin turno",
  },
  {
    id: "service",
    label: "Servicio",
    render: (row) =>
      row.appointment?.service?.name ? row.appointment.service.name : "—",
  },
  {
    id: "workshop",
    label: "Taller",
    render: (row) =>
      row.appointment?.workshop?.name ? row.appointment.workshop.name : "—",
  },
  {
    id: "comment",
    label: "Comentario",
    render: (row) => row.comment || "—",
  },
];

export default function MechanicRatingsView() {
  const user = useSelector((state) => state.workshop_user);
  const mechanicId = user?.id;

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useListMyReviewsQuery(
    { mechanicId },
    {
      skip: !mechanicId,
    },
  );

  return (
    <GenericTable
      title="Mis calificaciones"
      subtitle="Todas las reseñas que los clientes hicieron sobre mis servicios"
      columns={columns}
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      // sin filtros ni paginación por ahora
    />
  );
}
