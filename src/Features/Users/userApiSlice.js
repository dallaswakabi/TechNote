import { createSelector,createEntityAdapter, } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:builder => ({
        GetUsers:builder.query({
          query:()=> '/api/users/view',
          validateStatus:(response,result)=>{
            return response.status === 200 && !result.isError
          },
          transformResponse:responseData =>{
            const loadedUsers = responseData.map(user=>{
                user.id = user._id
                return user
            })
            return usersAdapter.setAll(initialState,loadedUsers)
          },
          providesTags:(result,error,arg)=>{
            if(result?.id){
                return [
                    {type:'User',id:'LIST'},
                    ...result.ids.map(id =>({type:'User',id}))
                ]
            }else return [{type:'User',id:'LIST'}]
          }
        }),
        AddNewUser:builder.mutation({
         query:initialUserData =>({
          url:'/api/users/create',
          method:'POST',
          body:{...initialUserData}
         }),
         invalidatesTags:[
          {type:'User',id:'LIST'}
         ]
        }),
        updateUser:builder.mutation({
          query:initialUserData =>({
            url:'/users',
            method:'PATCH',
            body:{...initialUserData}
          }),
          invalidatesTags:(result,error,args)=>[
            {
              type:'User',id:args.id
            }
          ]
        }),
        deleteUser:builder.mutation({
          query:({id})=>({
            url:'/users',
            method:'DELETE',
            body:{id}
          }),
          invalidatesTags:(result,error,args)=>[
            {
              type:'User',id:args.id
            }
          ]
        })
    }),
})

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation
} = usersApiSlice
// returns the query result object

export const selectUsersResult = usersApiSlice.endpoints.GetUsers.select()

// create memoized selector
export const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data
)

export const{
  selectAll:selectAllUsers,
  selectById:selectUsersById,
  selectIds:selectUsersIds
} = usersAdapter.getSelectors(state =>selectUsersData(state)?? initialState)