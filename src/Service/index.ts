import Axios, { AxiosError, AxiosResponse } from "axios"
import SERVER from "../Config"

export const API_SERVICE={
    fetchApiData:(EndPoint:string,successCallBack:any,errorCallBack:any)=>{
        Axios.get(`${SERVER?.BACKEND_HOST_URL}/${EndPoint}`,{headers:{
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"*",
        }}).then((responce)=>{
            successCallBack && successCallBack(responce)
        }).catch((error)=>{
            errorCallBack && errorCallBack(error)
        })

    },
    postApiData:(EndPoint:string,successCallBack:any,errorCallBack:any,values:any)=>{
        Axios.post(`${SERVER?.BACKEND_HOST_URL}/${EndPoint}`,values,{
            headers:{
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
            },
        }).then((responce)=>{
            successCallBack && successCallBack(responce)
        }).catch((error)=>{
            errorCallBack && errorCallBack(error)
        })
    },
    updateApiData:(EndPoint:string,successCalBack:any,errorCallBack:any,values:any)=>{
        Axios.patch(`${SERVER?.BACKEND_HOST_URL}/${EndPoint}`,values,{
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin":"*",
            }
        }).then((response)=>{
            successCalBack && successCalBack(response)
        }).catch((error)=>{
            errorCallBack && errorCallBack(error)
        })
    },
    deleteApiData:(EndPoint:string,successCalBack:any,errorCallBack:any,values:any)=>{
        Axios.delete(`${SERVER?.BACKEND_HOST_URL}/${EndPoint}`,{
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            data:{...values},
        }).then((response)=>{
            successCalBack && successCalBack(response)
        }).catch((error)=>{
            errorCallBack && errorCallBack(error)
        })
    },
    PostRequest: (
        EndPoint: string,
        sucessCallback: any,
        errorCallback: any,
        values: any,
        contentType?: string,
        token?: string
      ) => {
        Axios
          .post(EndPoint, values, {
            headers: {
              'Content-Type': contentType || 'multipart/form-data',
              'Access-Control-Allow-Origin': '*',
            },
          })
          .then((resp) => {
            sucessCallback && sucessCallback(resp)
          })
          .catch((err) => {
            errorCallback && errorCallback(err)
          })
      },
      PatchRequest: (
        EndPoint: string,
        sucessCallback: any,
        errorCallback: any,
        values: any,
        contentType?: string,
        token?: string
      ) => {
        Axios
          .patch(EndPoint, values, {
            headers: {
              'Content-Type': contentType || 'multipart/form-data',
              'Access-Control-Allow-Origin': '*',
            },
          })
          .then((resp) => {
            sucessCallback && sucessCallback(resp)
          })
          .catch((err) => {
            errorCallback && errorCallback(err)
          })
      },
    
}