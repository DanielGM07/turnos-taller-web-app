// src/routes/navigation/mechanic.js
const MECHANIC_NAVIGATION = [
  {
    segment: "mechanic", // → /mechanic (index → MechanicRootElement → detail/:id)
    title: "Mi panel",
    icon: "",
  },
  {
    segment: "mechanic/workshops", // → /mechanic/workshops
    title: "Talleres",
    icon: "",
  },
  {
    segment: "mechanic/services", // → /mechanic/services
    title: "Servicios",
    icon: "",
  },
  {
    segment: "mechanic/ratings", // → /mechanic/ratings
    title: "Mis calificaciones",
    icon: "",
  },
];

export default MECHANIC_NAVIGATION;
