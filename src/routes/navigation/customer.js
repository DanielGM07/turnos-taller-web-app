// src/routes/navigation/customer.js
const CUSTOMER_NAVIGATION = [
  {
    segment: "customer", // → /customer (después redirige a /customer/detail/<id>)
    title: "Mi cuenta",
    icon: "",
  },
  {
    segment: "customer/create-vehicle", // → /customer (después redirige a /customer/detail/<id>)
    title: "Registrar vehiculo",
    icon: "",
  },
];

export default CUSTOMER_NAVIGATION;
