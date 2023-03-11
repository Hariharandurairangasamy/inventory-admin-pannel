import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";

const userData:any = localStorage.getItem('user');

const user = JSON.parse(userData)

interface AuthUserData{
    user: any,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string,
  
}
const initialState:AuthUserData={
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  
}

export const login = createAsyncThunk('auth/login', async (userData:any, thunkAPI) => {
 
    try {
      return await authService.login(userData);
    } catch (error:any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });

  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      reset: (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = '';
      },
      logout: (state) => {
        localStorage.removeItem('user');
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action:PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.user = null;
          state.message = action.payload;
        });
    },
  });
  
  export const { reset, logout } = authSlice.actions;
  export default authSlice.reducer;
  
  
  