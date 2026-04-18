import { baseApi } from "./baseApi";

const faq = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     /** Setting APIs */
     getFaq: builder.query({
        query: () => {
            return {
                url: '/manage/get-faq',
                method: 'GET'
            }
        },
        providesTags: ['videos']
    }),

    
    getAbout: builder.query({
        query: () => {
          return {
            url: "/manage/get-about-us",
            method: "GET",
          };
        },
        providesTags: ["videos"],
      }),

  
      getUser: builder.query({
        query: () => ({
          url: '/user/get-my-profile',
          method: "GET",
        }),
        providesTags: ["videos"],
      }),


      updateProfilee: builder.mutation({
        query: (data) => {
          return {
            url: "/normal-user/update-profile",
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["videos"],
      }),
    
      changePassword: builder.mutation({
        query: (data) => {
          return {
            url: "/auth/change-password",
            method: "POST",
            body: data,
          };
        },
      }),

      getprivecyConditions: builder.query({
        query: () => {
          return {
            url: "/manage/get-privacy-policy",
            method: "GET",
          };
        },
        providesTags: ["videos"],
      }),

      getLaw: builder.query({
        query: () => {
          return {
            url: "/manage/get-law-form",
            method: "GET",
          };
        },
        providesTags: ["videos"],
      }),


      getTermsContuct: builder.query({
        query: () => {
          return {
            url: "/manage/get-terms-conditions",
            method: "GET",
          };
        },
        providesTags: ["videos"],
      }),

      

      postFeedback: builder.mutation({
        query: (data) => {
          return {
            url: "/feedback/create-feedback",
            method: "POST",
            body: data,
          };
        },
      }),


      getNotification: builder.query({
        query: () => {
          return {
            url: "/notification/get-notifications",
            method: "GET",
          };
        },
        providesTags: ["videos"],
      }),

      
  }),
});

export const {
useGetFaqQuery,
useGetAboutQuery,
useGetUserQuery,
useUpdateProfileeMutation,
useChangePasswordMutation,
useGetprivecyConditionsQuery,
useGetTermsContuctQuery,
usePostFeedbackMutation,
useGetNotificationQuery,
useGetLawQuery
} = faq;