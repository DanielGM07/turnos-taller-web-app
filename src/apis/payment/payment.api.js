// src/apis/payment/payment.api.js
import { baseApi } from "../base.api";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (body) => ({
        url: "/payments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["payment", "appointment"],
    }),

    // para el listado por customer lo usamos en el punto 4
    listCustomerPayments: builder.query({
      query: ({ customerId }) => `/customers/${customerId}/payments`,
      providesTags: ["payment"],
    }),
  }),
});

export const { useCreatePaymentMutation, useListCustomerPaymentsQuery } =
  paymentApi;
