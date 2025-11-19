// src/api/service.api.js
import { baseApi } from "../base.api";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      providesTags: ["service"],
    }),

    createService: builder.mutation({
      query: (body) => ({
        url: "/services",
        method: "POST",
        body,
      }),
      invalidatesTags: ["service"],
    }),

    // si después querés editar/borrar:
    // updateService: builder.mutation({
    //   query: ({ id, body }) => ({
    //     url: `/services/${id}`,
    //     method: "PATCH",
    //     body,
    //   }),
    //   invalidatesTags: ["service"],
    // }),
    //
    // deleteService: builder.mutation({
    //   query: (id) => ({
    //     url: `/services/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["service"],
    // }),
  }),
  overrideExisting: false,
});

export const {
  useListServicesQuery,
  useCreateServiceMutation,
  // useUpdateServiceMutation,
  // useDeleteServiceMutation,
} = serviceApi;
