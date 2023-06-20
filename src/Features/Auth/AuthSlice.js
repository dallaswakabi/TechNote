import {createSlice} from '@reduxjs/toolkit'


const AuthSlice = createSlice({
    name:'auth',
    initialState:{token:null},
    reducers:{
        setCredentials:(state,action)=>{
            const {accessToken} = action.payload
            state.token = accessToken
       },
    logout:(state,action)=>{
        state.token = null
    }      
    }
})

export const{setCredentials,logout} = AuthSlice.actions
export default AuthSlice.reducer
export const selectCurrentToken = (state) => state.auth.token