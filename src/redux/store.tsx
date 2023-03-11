import { configureStore } from '@reduxjs/toolkit'
import sidebar from './features/sidebar'
import authSlice from './authSlice'
export const store = configureStore({
  reducer: {
    sidebar: sidebar,
    auth:authSlice,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
