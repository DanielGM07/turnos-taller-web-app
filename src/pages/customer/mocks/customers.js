export const customers = [
  {
    id: "1",
    dni: "30111222",
    first_name: "Juan",
    last_name: "Pérez",
    birth_date: "1990-05-14",
    email: "juan.perez@example.com",
  },
  {
    id: "2",
    dni: "28999888",
    first_name: "María",
    last_name: "Gómez",
    birth_date: "1987-11-02",
    email: "maria.gomez@example.com",
  },
];

export const vehiclesByCustomer = {
  1: [
    {
      id: "v1",
      plate: "ABC123",
      brand: "Toyota",
      model: "Corolla",
      year: 2018,
      color: "Blanco",
    },
    {
      id: "v2",
      plate: "XYZ789",
      brand: "Ford",
      model: "Fiesta",
      year: 2015,
      color: "Negro",
    },
  ],
  2: [
    {
      id: "v3",
      plate: "HJK456",
      brand: "Volkswagen",
      model: "Gol Trend",
      year: 2019,
      color: "Gris",
    },
  ],
};
