import { baseApi } from "./baseApi";

const stripeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // =========================
    // ORDER CREATE
    // =========================
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/create-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),

  
    getMyOrder: builder.query({
      query: ({ status }) => ({
        url: `/order/get-my-orders?status=${status}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

 
    getSingleOrder: builder.query({
      query: ({ id }) => ({
        url: `/order/get-single-order/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleOrder"],
    }),

   
    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/update-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Orders", "SingleOrder"],
    }),

    updateStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/update-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Orders", "SingleOrder"],
    }),

   
    markUnavailable: builder.mutation({
      query: (id) => ({
        url: `/order/mark-as-unavailable/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Orders"],
    }),


    createTipToBartender: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/tip-to-bartender/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders", "SingleOrder"],
    }),

 
    getCustomerSavePayment: builder.query({
      query: () => ({
        url: `/customer/payment-methods`,
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrderQuery,
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
  useUpdateStatusMutation,
  useCreateTipToBartenderMutation,
  useMarkUnavailableMutation,
  useGetCustomerSavePaymentQuery,
} = stripeApi;