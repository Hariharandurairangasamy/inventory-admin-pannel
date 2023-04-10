import { configureStore } from '@reduxjs/toolkit'
import sidebar from './features/sidebar'
import authSlice from './authSlice'
import userRegisterData from "./userRegister"
import postSlice from "./prchaseSlice"

export const store = configureStore({
  reducer: {
    sidebar: sidebar,
    auth:authSlice,
   register:userRegisterData,
   getProgressValue:postSlice
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
