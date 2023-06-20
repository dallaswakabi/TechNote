import {apiSlice} from '../../app/api/apiSlice'
import {logout, setCredentials} from './AuthSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        login:builder.mutation({
            query: credential => ({
                url:'/auth',
                method:'POST',
                body:{...credential}
            })
        }),
        sendLogout:builder.mutation({
            query:()=>({
                url:'/auth/logout',
                method:'POST',
            }),
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try {
                    const {data} = await queryFulfilled
                    console.log(data)
                     dispatch(logout())
                     setTimeout(()=>{
                        dispatch(apiSlice.util.resetApiState())
                     },1000)
                    

                } catch (error) {
                    console.log(error);
                }
            }
        }),
        refresh:builder.mutation({
            query:()=>({
                url:'/auth/refresh',
                method:'GET'
            }),
            async onQueryStarted(args,{dispatch,queryFulfilled}){
                try {
                    const {data} = await queryFulfilled
                    console.log(data)
                    const {accessToken} = data
                    dispatch(setCredentials({accessToken}))
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation
} = authApiSlice