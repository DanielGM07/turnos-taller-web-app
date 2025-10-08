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
  useCreateWorkshopMutation,
  useUpdateWorkshopMutation,
  useDeleteWorkshopMutation,
} = adminApi;
