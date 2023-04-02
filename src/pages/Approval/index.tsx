import React,{useEffect,useState,useCallback} from 'react'
import { Grid, Typography, Autocomplete, TextField, Button } from '@mui/material'
import {get} from "lodash"
import { API_SERVICE } from '../../Service'
import { ToastContainer,toast } from 'react-toastify'
import API_END_POINT from "../../Constant/index"
import { AxiosError, AxiosResponse } from 'axios'
import CustomDataGrid from '../../components/DataGridTable'
import { GridColDef } from '@mui/x-data-grid'
function Approval() {
const [getpurchaseState,setGetPurchaseState]=useState()

  const getPurchaseDatas = useCallback(()=>{
    API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_PURCHASE_DATA}`,(res:AxiosResponse)=>{
      setGetPurchaseState(get(res,"data",[]))
    },(err:AxiosError)=>{
      console.log(err)
    })
  },[])
  useEffect(()=>{
    getPurchaseDatas()
  },[getPurchaseDatas])

  const handleUpdateStatus=(data:any)=>{
    const ID:string = data?._id
    const currentPaidStatus:string = data?.paidStatus === "nonPaid"?data["paidStatus"]="paid":data?.paidStatus
    API_SERVICE.updateApiData(`${API_END_POINT.API_END_POINT.UPDATE_PURCHASE}/${ID}`,(res:AxiosResponse)=>{
      toast.success("Paid Status Updated")
    },(err:AxiosError)=>{
      console.log(err)
      toast.error("Purchase Data Not Updated")
    },{paidStatus:currentPaidStatus})
  }

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'customerName',
      headerName: 'First name',
      width: 150,
    },
    {
      field: 'invoiceNumber',
      headerName: 'Invoice',
      width: 150,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 140,
    },


    {
      field: 'Action',
      headerAlign: 'center',
      width: 200,
      renderCell: (cellValues) => {
     
        return (
          <Grid container spacing={2} sx={{ ml: 6 }}>
            <Grid xs={12}>
              <Button variant='contained' id={get(cellValues,"row._id","")} onClick={()=>handleUpdateStatus(get(cellValues,"row",""))} disabled={cellValues.row.paidStatus === "paid"?true:false}>{get(cellValues,"row.paidStatus","")}</Button>
            </Grid>
          </Grid>
        )
      },
    },
  ]


  const top100Films = [{ label: 'Pending' }, { label: 'Paid' }]



  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={10}>
          <Typography variant='h5'>Approvals</Typography>
        </Grid>
        <Grid xs={2}>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            size='small'
            options={top100Films}
            renderInput={(params) => <TextField {...params} label='Status' />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={get(getpurchaseState,"data",[])} columns={columns} height={340} />
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  )
}
export default Approval
