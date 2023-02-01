import { configureStore } from '@reduxjs/toolkit'
import sidebar from './features/sidebar'
export const store = configureStore({
  reducer: {
    sidebar: sidebar,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
