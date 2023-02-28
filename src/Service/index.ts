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
    updateApiData:(EndPoint:string,values:any,successCalBack:any,errorCallBack:any)=>{
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
    deleteApiData:(EndPoint:string,successCalBack:any,errorCallBack:any)=>{
        Axios.delete(`${SERVER?.BACKEND_HOST_URL}/${EndPoint}`,{
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Origin":"*",
            }
        }).then((response)=>{
            successCalBack && successCalBack(response)
        }).catch((error)=>{
            errorCallBack && errorCallBack(error)
        })
    }
}