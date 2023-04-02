import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";
import { API_SERVICE } from "../Service";
import API_END_POINT from "../Constant/index"
import { AxiosError, AxiosResponse } from 'axios'

interface Pruchase{
    isError: boolean,
    getDatas:any,
    isSuccess: boolean,
    isLoading: boolean,
    message: string,
}

const initialState:Pruchase={
    isError: false,
    getDatas:null,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const getPurchaseDatas = createAsyncThunk("getPurchase",async()=>{
   
     await API_SERVICE.fetchApiData(`${API_END_POINT?.API_END_POINT?.GET_PURCHASE_DATA}`,(res:AxiosResponse)=>{
            console.log("ggggg",res)
           return res
           },(err:AxiosError)=>{
            console.log(err)
           })
 

    
})

export const getPurchaseValues = createSlice({
    name:"getDatas",
    initialState,
    reducers:{
     
    },
    extraReducers: (builder) => {
        builder
          .addCase(getPurchaseDatas.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getPurchaseDatas.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.getDatas = action.payload;
          })
          .addCase(getPurchaseDatas.rejected, (state, action:PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.getDatas = null;
            state.message = action.payload;
          });
      },
})

export default getPurchaseValues.reducer