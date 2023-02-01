import { createSlice } from '@reduxjs/toolkit'

export interface ISideBar {
  setSideBarPosition?: boolean
}
const initialState: ISideBar = {
  setSideBarPosition: true,
}
export const counterSlice = createSlice({
  name: 'sidebarSlice',
  initialState,
  reducers: {
    SET_OPEN_SIDEBAR: (state) => {
      state.setSideBarPosition = true
    },
    SET_CLOSE_SIDEBAR: (state) => {
      state.setSideBarPosition = false
    },
  },
})
export const { SET_CLOSE_SIDEBAR, SET_OPEN_SIDEBAR } = counterSlice.actions
export default counterSlice.reducer
