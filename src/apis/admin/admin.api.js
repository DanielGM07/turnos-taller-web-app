// src/api/admin/admin.api.js
import { baseApi } from "../base.api";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // === CRUD Admin ===
    viewAdmins: builder.query({
      query: () => ({
        url: "/admin",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    viewAdmin: builder.query({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    createAdmin: builder.mutation({
      query: (body) => ({
        url: "/admin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["admin"],
    }),

    updateAdmin: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["admin"],
    }),

    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),

    // === WORKSHOPS ===
    viewWorkshops: builder.query({
      query: () => ({
        url: "/admin/workshops",
        method: "GET",
      }),
      providesTags: ["workshop"],
    }),

    // 🔹 obtener 1 taller
    viewWorkshop: builder.query({
      query: (workshopId) => ({
        url: `/admin/workshops/${workshopId}`,
        method: "GET",
      }),
      providesTags: ["workshop"],
    }),

    createWorkshop: builder.mutation({
      query: (body) => ({
        url: "/admin/workshops",
        method: "POST",
        body,
      }),
      invalidatesTags: ["workshop"],
    }),

    updateWorkshop: builder.mutation({
      query: ({ workshopId, body }) => ({
        url: `/admin/workshops/${workshopId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["workshop"],
    }),

    deleteWorkshop: builder.mutation({
      query: (workshopId) => ({
        url: `/admin/workshops/${workshopId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["workshop"],
    }),

    // 🔹 turnos de un taller (ADMIN)
    // → requiere endpoint backend: GET /admin/workshops/:workshopId/appointments
    viewWorkshopAppointments: builder.query({
      query: (workshopId) => ({
        url: `/admin/workshops/${workshopId}/appointments`,
        method: "GET",
      }),
      providesTags: ["appointment"],
    }),

    // === MECHANICS PARA ADMIN ===

    viewMechanics: builder.query({
      query: () => ({
        url: "/admin/mechanics",
        method: "GET",
      }),
      providesTags: ["mechanic"],
    }),

    viewMechanic: builder.query({
      query: (mechanicId) => ({
        url: `/admin/mechanics/${mechanicId}`,
        method: "GET",
      }),
      providesTags: ["mechanic"],
    }),

    updateMechanic: builder.mutation({
      query: ({ mechanicId, body }) => ({
        url: `/admin/mechanics/${mechanicId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["mechanic"],
    }),

    deleteMechanic: builder.mutation({
      query: (mechanicId) => ({
        url: `/admin/mechanics/${mechanicId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["mechanic"],
    }),

    // === REVIEWS DE MECÁNICO (ADMIN mira las reviews)
    // viewMechanicReviews: builder.query({
    //   query: (mechanicId) => ({
    //     url: `/mechanic-review/mechanic/${mechanicId}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["mechanic-review"],
    // }),

    viewMechanicReviews: builder.query({
      query: (mechanicId) => ({
        url: `/admin/mechanics/${mechanicId}/reviews`,
        method: "GET",
      }),
      providesTags: ["mechanic-review"],
    }),

    // === Turnos de un mecánico (visto desde admin, pero usando el endpoint de Mechanic) ===
    viewMechanicAppointments: builder.query({
      query: (mechanicId) => ({
        url: `/mechanic/${mechanicId}/appointments`,
        method: "GET",
      }),
      providesTags: ["appointment"],
    }),

    // === DASHBOARD ADMIN ===
    dashboardStats: builder.query({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
      providesTags: [
        "admin",
        "appointment",
        "customer",
        "mechanic",
        "workshop",
        "service",
        "mechanic-review",
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useViewAdminsQuery,
  useViewAdminQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,

  useViewWorkshopsQuery,
  useViewWorkshopQuery,
  useCreateWorkshopMutation,
  useUpdateWorkshopMutation,
  useDeleteWorkshopMutation,

  useViewWorkshopAppointmentsQuery,

  useViewMechanicsQuery,
  useViewMechanicQuery,
  useUpdateMechanicMutation,
  useDeleteMechanicMutation,

  useViewMechanicReviewsQuery,

  useViewMechanicAppointmentsQuery,

  useDashboardStatsQuery,
} = adminApi;
