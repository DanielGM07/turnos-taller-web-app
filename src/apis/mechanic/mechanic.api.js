import { baseApi } from "../base.api";

export const mechanicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===== CRUD Mechanic =====
    viewMechanics: builder.query({
      query: () => ({
        url: `/mechanic`,
        method: "GET",
      }),
      providesTags: ["mechanic"],
    }),

    viewMechanic: builder.query({
      query: (id) => ({
        url: `/mechanic/${id}`,
        method: "GET",
      }),
      providesTags: ["mechanic"],
    }),

    createMechanic: builder.mutation({
      query: (body) => ({
        url: `/mechanic`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["mechanic"],
    }),

    updateMechanic: builder.mutation({
      query: ({ id, body }) => ({
        url: `/mechanic/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["mechanic"],
    }),

    deleteMechanic: builder.mutation({
      query: (id) => ({
        url: `/mechanic/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["mechanic"],
    }),

    // ===== Relación con Workshops =====
    linkWorkshop: builder.mutation({
      query: ({ mechanicId, workshopId }) => ({
        url: `/mechanic/${mechanicId}/workshops/${workshopId}`,
        method: "POST",
      }),
      invalidatesTags: ["workshop", "mechanic"],
    }),

    unlinkWorkshop: builder.mutation({
      query: ({ mechanicId, workshopId }) => ({
        url: `/mechanic/${mechanicId}/workshops/${workshopId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["workshop", "mechanic"],
    }),

    // ===== Turnos del mecánico =====
    listMyAppointments: builder.query({
      query: ({ mechanicId, status, from, to }) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (from) params.append("from", from);
        if (to) params.append("to", to);

        const qs = params.toString();
        return {
          url: `/mechanic/${mechanicId}/appointments${qs ? `?${qs}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["appointment"],
    }),

    updateMyAppointment: builder.mutation({
      query: ({ mechanicId, appointmentId, ...body }) => ({
        url: `/mechanic/${mechanicId}/appointments/${appointmentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["appointment"],
    }),

    deleteMyAppointment: builder.mutation({
      query: ({ mechanicId, appointmentId }) => ({
        url: `/mechanic/${mechanicId}/appointments/${appointmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["appointment"],
    }),

    // ===== Customers =====
    listAllCustomers: builder.query({
      query: () => ({
        url: `/mechanic/customers`,
        method: "GET",
      }),
      providesTags: ["customer"],
    }),

    listAssignedCustomers: builder.query({
      query: ({ mechanicId }) => ({
        url: `/mechanic/${mechanicId}/customers`,
        method: "GET",
      }),
      providesTags: ["customer"],
    }),

    // ===== Workshops =====
    listAllWorkshops: builder.query({
      query: () => ({
        url: `/mechanic/workshops`,
        method: "GET",
      }),
      providesTags: ["workshop"],
    }),

    listMyWorkshops: builder.query({
      query: ({ mechanicId }) => ({
        url: `/mechanic/${mechanicId}/workshops`,
        method: "GET",
      }),
      providesTags: ["workshop"],
    }),

    enrollWorkshop: builder.mutation({
      query: ({ mechanicId, workshopId }) => ({
        url: `/mechanic/${mechanicId}/workshops/${workshopId}/enroll`,
        method: "POST",
      }),
      invalidatesTags: ["workshop"],
    }),

    unenrollWorkshop: builder.mutation({
      query: ({ mechanicId, workshopId }) => ({
        url: `/mechanic/${mechanicId}/workshops/${workshopId}/unenroll`,
        method: "DELETE",
      }),
      invalidatesTags: ["workshop"],
    }),

    // ===== Mis calificaciones =====
    listMyReviews: builder.query({
      query: ({ mechanicId }) => ({
        url: `/mechanic-review/mechanic/${mechanicId}`,
        method: "GET",
      }),
      providesTags: ["mechanic-review"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useViewMechanicsQuery,
  useViewMechanicQuery,
  useCreateMechanicMutation,
  useUpdateMechanicMutation,
  useDeleteMechanicMutation,
  useLinkWorkshopMutation,
  useUnlinkWorkshopMutation,
  useListMyAppointmentsQuery,
  useUpdateMyAppointmentMutation,
  useDeleteMyAppointmentMutation,
  useListAllCustomersQuery,
  useListAssignedCustomersQuery,
  useListAllWorkshopsQuery,
  useListMyWorkshopsQuery,
  useEnrollWorkshopMutation,
  useUnenrollWorkshopMutation,
  useListMyReviewsQuery, // 👈 nuevo hook
} = mechanicApi;
