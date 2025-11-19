// src/apis/appointment/appointment.api.js
import { baseApi } from "../base.api";

export const appointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /appointments/:id
    getAppointmentById: builder.query({
      query: (id) => `/appointments/${id}`,
      providesTags: (result, error, id) => [
        { type: "appointment", id },
        { type: "appointment", id: "LIST" },
      ],
    }),

    // (opcional) listado genérico, por si después lo necesitás
    listAppointments: builder.query({
      query: (params) => {
        // params puede ser { customerId, mechanicId, status, ... }
        const searchParams = new URLSearchParams();

        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              searchParams.append(key, value);
            }
          });
        }

        const queryString = searchParams.toString();
        return queryString ? `/appointments?${queryString}` : "/appointments";
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((a) => ({
                type: "appointment",
                id: a.id,
              })),
              { type: "appointment", id: "LIST" },
            ]
          : [{ type: "appointment", id: "LIST" }],
    }),
  }),
});

export const { useGetAppointmentByIdQuery, useListAppointmentsQuery } =
  appointmentApi;
