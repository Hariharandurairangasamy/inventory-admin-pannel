import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_END_POINT from "../Constant/index"
import { RootState } from "./store";
import axios from "axios";


interface AuthUserData{
data:any,
loading:false,
error:string | null
}
const initialState:AuthUserData={
  data:null,
  loading:false,
  error:null 
}

// Define async thunk
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${API_END_POINT.API_END_POINT.GET_ALL_PROGRESS_VALUE}`);
  console.log("response",response)
  return response.data;
});

// Define Redux slice
const getPurchasedata = createSlice({
  name: "getPurchasedata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
       
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export default getPurchasedata.reducer;
