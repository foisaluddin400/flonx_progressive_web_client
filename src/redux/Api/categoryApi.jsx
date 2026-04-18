import { baseApi } from "./baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: ({ id }) => {
        return {
          url: `/category/venue-categories/${id}`,
          method: "GET",
        };
      },
      providesTags: ["videos"],
    }),


  }),
});

export const { useGetCategoryQuery} = settingApi;
