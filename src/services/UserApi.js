
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userAPi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://heliverse-backend-tde1.onrender.com/api/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({page,domain,available,gender,name}) => `get-all-users?page=${page}&domain=${domain}&available=${available}&gender=${gender}&name=${name}`,
      providesTags:["User"]
    }),
    getSingleUser:builder.query({
        query:(userId)=> `single-user/${userId}`,
        providesTags:["User"]
    }),
    updateSingleUser:builder.mutation({
      query({id,userData}) {
        //console.log("From Body",id)
        //console.log("From Body",userData)

        return {
          url: `update-single-user/${id}`,
          method: 'PUT',
          body:userData,
        }
      },
      invalidatesTags: ['User'],
    }),
    createSingleUser:builder.mutation({
      query(body){
         return{
          url:"create-user",
          method:"POST",
          body
         }

      },
      invalidatesTags:["User"]
    })
  }),
  
})

export const teamsApi = createApi({
    reducerPath:"teamApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://heliverse-backend-tde1.onrender.com/api/team"}),
    endpoints:(builder)=>({
        getDomains:builder.query({
            query:()=>"/get-domains"
        }),
        getTeams:builder.query({
          query:()=>"/get-teams",
          providesTags:["Teams"]
        }),
        getSingleTeam:builder.query({
          query:(id)=>`/get-team/${id}`,
          providesTags:["Teams"]
        }),
        createTeam:builder.mutation({
          query(body){
            return{
              url:"/create-team",
              method:"POST",
              body
            }
          },
          invalidatesTags:["Teams"]
        })
    })
})


export const { useGetUsersQuery,useGetSingleUserQuery,useUpdateSingleUserMutation,useCreateSingleUserMutation } = userAPi
export const {useGetDomainsQuery,useGetTeamsQuery,useGetSingleTeamQuery,useCreateTeamMutation}=teamsApi