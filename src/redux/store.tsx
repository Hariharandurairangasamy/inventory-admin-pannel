import { configureStore } from '@reduxjs/toolkit'
import sidebar from './features/sidebar'
import authSlice from './authSlice'
import userRegisterData from "./userRegister"
import getPurchasedata from "./prchaseSlice"

export const store = configureStore({
  reducer: {
    sidebar: sidebar,
    auth:authSlice,
   register:userRegisterData,
   getPrigressValue:getPurchasedata
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
