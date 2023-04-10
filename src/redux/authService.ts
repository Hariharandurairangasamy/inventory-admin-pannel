import axios from "axios";
import SERVER from "../Config";
import {get} from "lodash"
import API_END_POINT from "../Constant/index"


const login = async (userData:any) => {

    const response = await axios.post(`${SERVER.BACKEND_HOST_URL}/${API_END_POINT?.API_END_POINT?.POST_USER_LOGIN}`, userData);
    if (response.data) {
 
      localStorage.setItem('token', JSON.stringify(get(response.data.data,"token")));
      localStorage.setItem("username",JSON.stringify(get(response.data.data,"userName")))
      localStorage.setItem("role",JSON.stringify(get(response.data.data,"role")))
      localStorage.setItem("permission",JSON.stringify(get(response.data.data,"permission")))
    }
  
    return response.data 
  
  };

  const addUsersData= async(AddUserData:any)=>{
const getResponce = await axios.post(`${SERVER.BACKEND_HOST_URL}/${API_END_POINT?.API_END_POINT?.POST_REGISTER_DATA}`, AddUserData)
return getResponce.data
  }

  const getPurchaseData = async()=>{
    const responceData = await axios.get(`${SERVER.BACKEND_HOST_URL}/${API_END_POINT.API_END_POINT.GET_ALL_PROGRESS_VALUE}`)
    return responceData.data
  }


  
  const authService = {
    login,
    addUsersData,
    getPurchaseData
  };
  
  export default authService;
  
    