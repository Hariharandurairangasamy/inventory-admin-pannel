import React,{useState,useEffect} from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import {get} from "lodash"
import { Grid } from '@mui/material'
import ProgressCard from '../../components/ProgressCard'
import { API_SERVICE } from '../../Service'
import API_END_POINT from "../../Constant/index"

function CardDataCount() {

  const [getAllValues,setGetValues]=useState<any>()
  useEffect(()=>{
    API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_ALL_PROGRESS_VALUE}`,(res:AxiosResponse)=>{
      setGetValues(get(res,"data.data",[]))
  
    },(err:AxiosError)=>{
      console.log(err)
    })
  },[])
  console.log("getAllValues",getAllValues)
  
  return (
    <div>
      <Grid container spacing={1} sx={{ mt: 3 }}>
        <Grid xs={3}>
          <ProgressCard count={getAllValues?.length} color='red' title='Purchase' />
        </Grid>
        <Grid xs={3}>
          <ProgressCard count={get(getAllValues?.[0],"salseData")?.length} color='blue' title='Sales' />
        </Grid>
        <Grid xs={3}>
          <ProgressCard count={get(getAllValues?.[0],"customersData")?.length} color='green' title='Customers' />
        </Grid>
        <Grid xs={3}>
          <ProgressCard count={48} color='red' title='Payments' />
        </Grid>
      </Grid>
    </div>
  )
}
export default CardDataCount
