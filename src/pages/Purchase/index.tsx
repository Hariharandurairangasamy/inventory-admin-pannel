import React, {useState,useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomDataGrid from '../../components/DataGridTable'
import { GridColDef } from '@mui/x-data-grid'
import { AxiosError, AxiosResponse } from 'axios'
import {get} from "lodash"
import { API_SERVICE } from '../../Service'
import API_END_POINT from "../../Constant/index"


function Purchase() {
  const[getPurchaseData,setGetPurchaseData]=useState<any>()
const getPurchasedatas = useCallback(()=>{
  API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_PURCHASE_DATA}`,(res:AxiosResponse)=>{
    setGetPurchaseData(get(res,"data",[]))
  },(err:AxiosError)=>{
    console.log(err)
  })
},[])

useEffect(()=>{
  getPurchasedatas()
},[getPurchasedatas])
  const navigate = useNavigate()
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'date',
      headerName: 'Data',
      width:270,
    },
    {
      field: 'customerName',
      headerName: 'CustomerName',
      width:270,
    },
    {
      field: 'invoiceNumber',
      headerName: 'InvoiceNumber',
      width:270,
    },
    {
      field: 'paidStatus',
      headerName: 'PaidStatus',
      width:270,
    },
    {
      field: 'Action',
      headerAlign: 'center',
      width: 200,
      renderCell: (params) => {
    
        return (
          <Grid container spacing={2} sx={{ ml: 3 }}>
            <Grid xs={4}>
              <VisibilityIcon sx={{ color: 'blue', cursor: 'pointer' }} onClick={()=>{navigate(`/PurchaseForm/view/${get(params?.row,"_id","")}`)}}/>
            </Grid>
            <Grid xs={4}>
              <EditIcon sx={{ color: 'green', cursor: 'pointer' }} onClick={()=>{navigate(`/PurchaseForm/edit/${get(params?.row,"_id","")}`)}}/>
            </Grid>
            <Grid xs={4}>
              <DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} />
            </Grid>
          </Grid>
        )
      },
    },
  ]

  const handleRoute = () => {
    navigate(`/PurchaseForm/${'Add'}/1`)
  }
  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={10}>
          <Typography variant='h5'>Purchase</Typography>
        </Grid>
        <Grid xs={2}>
          <Button
            startIcon={<AddIcon />}
            sx={{
              color: 'white',
              backgroundColor: '#0CBABA',
              marginLeft: '5x',
              '&:hover': {
                background: '#0CBABA',
              },
            }}
            onClick={() => {
              handleRoute()
            }}
          >
            Add Purchase
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={get(getPurchaseData,"data",[])} columns={columns} height={340} />
        </Grid>
      </Grid>
    </div>
  )
}
export default Purchase
