import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import AuthReducer from '../Features/Auth/AuthSlice'

export const store = configureStore({
    reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer ,
    Auth:AuthReducer
    },
    middleware:getDefaultMiddleware =>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:false
})

setupListeners(store.dispatch)