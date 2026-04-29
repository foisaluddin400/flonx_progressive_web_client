import { baseApi } from "./baseApi";

const stripeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: "/order/create-order",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["venue"],
    }),

    getMyOrder: builder.query({
      query: ({ status, shift }) => {
        return {
          url: `/order/get-my-orders?status=${status}&shift=${shift}`,
          method: "GET",
        };
      },
      providesTags: ["venue"],
    }),

    getCustomerSavePayment: builder.query({
      query: () => {
        return {
          url: `/customer/payment-methods`,
          method: "GET",
        };
      },
      providesTags: ["venue"],
    }),

    markUnavailable: builder.mutation({
      query: (id) => {
        return {
          url: `/order/mark-as-unavailable/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["venue"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/order/update-status/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["venue"],
    }),

    getSingleOrder: builder.query({
      query: ({ id }) => {
        return {
          url: `/order/get-single-order/${id}`,
          method: "GET",
        };
      },
      providesTags: ["venue"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/order/update-status/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["venue"],
    }),

    createTipToBartender: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/order/tip-to-bartender/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["venue"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrderQuery,
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
  useCreateTipToBartenderMutation,
  useMarkUnavailableMutation,
  useUpdateStatusMutation,
  useGetCustomerSavePaymentQuery,
} = stripeApi;
