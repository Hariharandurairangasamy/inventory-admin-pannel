import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";

interface AuthUserData{
    user: any,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string,
  
}
const initialState:AuthUserData={
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  
}

export const addUserData = createAsyncThunk("user/register",async(userData:any,thunkAPI)=>{
    try{
        return await authService.addUsersData(userData)
    }catch(error:any){
        const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
})
export const userRegisterData = createSlice({
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
        localStorage.clear();
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(addUserData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addUserData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(addUserData.rejected, (state, action:PayloadAction<any>) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.user = null;
          state.message = action.payload;
        });
    },
  });
  
  export const { reset, logout } = userRegisterData.actions;
  export default userRegisterData.reducer;
  
  
  