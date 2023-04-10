
import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import SERVER from "../Config";
import API_END_POINT from "../Constant/index"

// Define async thunk
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${SERVER.BACKEND_HOST_URL}/${API_END_POINT?.API_END_POINT?.GET_ALL_PROGRESS_VALUE}`);
  return response.data;
});

// Define Redux slice
const postsSlice = createSlice({
  name: "posts",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export default postsSlice.reducer;