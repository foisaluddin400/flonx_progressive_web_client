import { baseApi } from "./baseApi";

const venueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVenue: builder.query({
      query: ({ searchTerm, page, limit, lat, lng, maxDistance }) => ({
        url: `/venue/get-all`,
        method: "GET",
        params: {
          page,
          limit,
          searchTerm: searchTerm || undefined,
          lat: lat || undefined,
          lng: lng || undefined,
          maxDistance: maxDistance || 5,
        },
      }),
      providesTags: ["venue"],
    }),

    getSingleVenue: builder.query({
      query: ({ id }) => {
        return {
          url: `/venue/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["venue"],
    }),

    getSingleVenueProducts: builder.query({
      query: ({ id, category, searchTerm, page, limit }) => ({
        url: `/product/venue-products/${id}`,
        method: "GET",
        params: {
          category,
          searchTerm,
           page,
          limit,
        },
      }),
    }),

    addToCart: builder.mutation({
      query: (data) => {
        return {
          url: "/cart/add-to-cart",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["venue"],
    }),




    getCurrentShift: builder.query({
      query: () => {
        return {
          url: `/shift/current-shift`,
          method: "GET",
        };
      },
      providesTags: ["venue"],
    }),


    getViewCart: builder.query({
      query: () => {
        return {
          url: `/cart/view-cart`,
          method: "GET",
        };
      },
      providesTags: ["venue"],
    }),

    updateToCart: builder.mutation({
      query: (data) => {
        return {
          url: "/cart/update-quantity",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["venue"],
    }),

    deleteAllCart: builder.mutation({
      query: () => {
        return {
          url: `/cart/delete-cart`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["venue"],
    }),



    RemoveToCart: builder.mutation({
      query: (data) => {
        return {
          url: "/cart/remove-cart-item",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["venue"],
    }),



  }),
});

export const {
  useGetVenueQuery,
  useGetSingleVenueQuery,
  useGetSingleVenueProductsQuery,
  useAddToCartMutation,
  useGetViewCartQuery,
  useUpdateToCartMutation,
  useDeleteAllCartMutation,
  useRemoveToCartMutation,
  
  useGetCurrentShiftQuery,
} = venueApi;
