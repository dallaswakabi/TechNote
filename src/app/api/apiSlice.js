import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
/*import {setCredentials} from '../../Features/Auth/AuthSlice'

const baseQuery = fetchBaseQuery({
    baseUrl:'http://127.0.0.1:4000',
    credentials:'include',
    prepareHeaders:(headers,{getState})=>{
        const token = getState().auth.token
        if(token){
            headers.set("authorization",`Bearer ${token}`)
        }
         return headers
    }
})

const baseQueryWithReauth = async(args,api,extraOptions)=>{

   // console.log(args) request url,method,body 
   // console.log(api)  signal,dispatch,getState()
   // console.log(extraOptions) custom like {shout:true}

   let result = await baseQuery(args,api,extraOptions)
    
   // if you want,handle other status codes,too

   if(result?.error?.status === 403){
      console.log('sending refresh token')

      // send refresh token to get new access token 
      const refreshResult = baseQuery('/auth/refresh',api,extraOptions)
      if(refreshResult?.data){
        // store the new Token
        api.dispatch(setCredentials({...refreshResult.data}))

        //retry original query with new access token
        result = await baseQuery(args,api,extraOptions)

      }else{
       if(refreshResult?.error?.status === 403){
          refreshResult.error.data.message ="You Login Has Expired"
       }
       return refreshResult
      }
     
   }
   return result
}

export const apiSlice = createApi({
    baseQueryWithReauth,
    tagTypes:['Note','User'],
    endpoints:builder =>({})
})
*/



export const apiSlice  = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://technote-kyob.onrender.com'
    }),
    tagTypes:['User'],
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(credentials)=>({
                url:'/api/admin/auth/login',
                method:'POST',
                body:{...credentials}
            })
        }),
        GetNotes:builder.query({
            query:()=>({
                url:'/api/notes/view',
                method:'GET'
            }),
            validateStatus:(response,result)=>{
                return response.status === 200 && !result.isError
            },
           
        }),
        AddNewNote:builder.mutation({
            query:initialNoteData =>({
             url:'/api/notes/add',
             method:'POST',
             body:{...initialNoteData}
            }),
            invalidatesTags:[
             {type:'Note',id:'LIST'}
            ]
           }),
           GetUsers:builder.query({
            query:()=> ({
                url:'/api/users/view',
                method:'GET'
            }),
            validateStatus:(response,result)=>{
              return response.status === 200 && !result.isError
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
    })
})

export const {
    useLoginMutation,
    useGetUsersQuery,
    useAddNewNoteMutation,
    useGetNotesQuery,
    useAddNewUserMutation
   } = apiSlice