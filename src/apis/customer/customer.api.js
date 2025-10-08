import { baseApi } from "../base.api";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===== CRUD Customer =====
    viewCustomers: builder.query({
      query: () => ({
        url: `/customers`,
        method: "GET",
      }),
      providesTags: ["customer"],
    }),

    viewCustomer: builder.query({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "GET",
      }),
      providesTags: ["customer"],
    }),

    createCustomer: builder.mutation({
      query: (body) => ({
        url: `/customers`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["customer"],
    }),

    updateCustomer: builder.mutation({
      query: ({ id, body }) => ({
        url: `/customers/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["customer"],
    }),

    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["customer"],
    }),

    // ===== Appointments (Turnos) =====
    customerCreateAppointment: builder.mutation({
      query: ({ customerId, ...body }) => ({
        url: `/customers/${customerId}/appointments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["appointment", "customer"],
    }),

    customerListAppointments: builder.query({
      query: ({ customerId, status, from, to }) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (from) params.append("from", from);
        if (to) params.append("to", to);

        const qs = params.toString();
        return {
          url: `/customers/${customerId}/appointments${qs ? `?${qs}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["appointment"],
    }),

    customerGetAppointment: builder.query({
      query: ({ customerId, appointmentId }) => ({
        url: `/customers/${customerId}/appointments/${appointmentId}`,
        method: "GET",
      }),
      providesTags: ["appointment"],
    }),

    customerUpdateAppointment: builder.mutation({
      query: ({ customerId, appointmentId, ...body }) => ({
        url: `/customers/${customerId}/appointments/${appointmentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["appointment"],
    }),

    customerDeleteAppointment: builder.mutation({
      query: ({ customerId, appointmentId }) => ({
        url: `/customers/${customerId}/appointments/${appointmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["appointment"],
    }),

    // ===== Vehicles (Vehículos) =====
    customerCreateVehicle: builder.mutation({
      query: ({ customerId, ...body }) => ({
        url: `/customers/${customerId}/vehicles`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["vehicle", "customer"],
    }),

    customerListVehicles: builder.query({
      query: ({ customerId }) => ({
        url: `/customers/${customerId}/vehicles`,
        method: "GET",
      }),
      providesTags: ["vehicle"],
    }),

    customerGetVehicle: builder.query({
      query: ({ customerId, vehicleId }) => ({
        url: `/customers/${customerId}/vehicles/${vehicleId}`,
        method: "GET",
      }),
      providesTags: ["vehicle"],
    }),

    customerUpdateVehicle: builder.mutation({
      query: ({ customerId, vehicleId, ...body }) => ({
        url: `/customers/${customerId}/vehicles/${vehicleId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["vehicle"],
    }),

    customerDeleteVehicle: builder.mutation({
      query: ({ customerId, vehicleId }) => ({
        url: `/customers/${customerId}/vehicles/${vehicleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vehicle"],
    }),

    // ===== Services disponibles =====
    customerListServices: builder.query({
      query: () => ({
        url: `/customers/services`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),

    // ===== Repairs del vehículo del customer =====
    customerListVehicleRepairs: builder.query({
      query: ({ customerId, vehicleId }) => ({
        url: `/customers/${customerId}/vehicles/${vehicleId}/repairs`,
        method: "GET",
      }),
      providesTags: ["repair"],
    }),

    // ===== Reviews (Calificar mecánico) =====
    customerRateMechanic: builder.mutation({
      query: ({ customerId, ...body }) => ({
        url: `/customers/${customerId}/mechanic-reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["mechanic-review", "mechanic"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useViewCustomersQuery,
  useViewCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useCustomerCreateAppointmentMutation,
  useCustomerListAppointmentsQuery,
  useCustomerGetAppointmentQuery,
  useCustomerUpdateAppointmentMutation,
  useCustomerDeleteAppointmentMutation,
  useCustomerCreateVehicleMutation,
  useCustomerListVehiclesQuery,
  useCustomerGetVehicleQuery,
  useCustomerUpdateVehicleMutation,
  useCustomerDeleteVehicleMutation,
  useCustomerListServicesQuery,
  useCustomerListVehicleRepairsQuery,
  useCustomerRateMechanicMutation,
} = customerApi;
