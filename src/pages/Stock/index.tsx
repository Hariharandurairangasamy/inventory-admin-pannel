import React,{useState,useEffect,useCallback} from 'react'
import { Grid, Typography, Autocomplete, TextField, Button } from '@mui/material'
import CustomDataGrid from '../../components/DataGridTable'
import {get,map,find} from "lodash"
import { GridColDef,useGridApiRef  } from '@mui/x-data-grid'
import { API_SERVICE } from '../../Service'
import { ToastContainer,toast } from 'react-toastify'
import API_END_POINT from "../../Constant/index"
import { AxiosError, AxiosResponse } from 'axios'


function Stock() {

const [getStockData,setGetStockData]=useState()
const [getProductName,setgetProductName]=useState<any>()

// API REF
const apiRefs = useGridApiRef ()
  const getPurchaseDatas = useCallback(()=>{
    API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_PURCHASE_DATA}`,(res:AxiosResponse)=>{
      setGetStockData(get(res,"data",[]))
    },(err:AxiosError)=>{
      console.log(err)
    })
  },[])
  useEffect(()=>{
    getPurchaseDatas()

  },[getPurchaseDatas])



  const updateRowDatas=async(cellData:any)=>{
    const updatedRow = { ...cellData, isNew: false };
    setgetProductName(updatedRow)
  }

  const getDatas ={
    qty:get(getProductName,"QTY",""),
    category:get(getProductName?.isPurchaseProducts[0],"category",""),
    productName:get(getProductName?.isPurchaseProducts[0],"productName",""),
    price:get(getProductName?.isPurchaseProducts[0],"price",""),
    gst:get(getProductName?.isPurchaseProducts[0],"gst",""),
    total:get(getProductName?.isPurchaseProducts[0],"total",""),
    _id:get(getProductName?.isPurchaseProducts[0],"_id","")

  }



const onSubmitData=async()=>{
  API_SERVICE.updateApiData(`${API_END_POINT.API_END_POINT.UPDATE_PURCHASE}/${getProductName?._id}`, (res: AxiosResponse) => {
    toast.success("Stock Data Updated")

  }, (err: AxiosError) => {
    console.log(err)
    toast.error("Stock Data Not Updated")
  }, {
    isPurchaseProducts: [getDatas]
  })
}
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
   
    {
      field: 'Category',
     
      width: 300,
      renderCell: (cellValues) => {
        return (
           <>
            {map(cellValues?.row?.isPurchaseProducts,(getValues)=>(
          <Grid container spacing={2} sx={{ ml: 6 }}>
            <Grid xs={12}>
            {getValues?.category}
            </Grid>
          </Grid>
            ))}
         
          </>
        )
      },
    },
    {
      field: 'ProductName',
     
      width: 200,
      renderCell: (cellValues) => {
     
        return (
          <>
          {map(cellValues?.row?.isPurchaseProducts,(getValues)=>(
          <Grid container spacing={2} sx={{ ml: 6 }}>
            <Grid xs={12}>
            {getValues?.productName}
            </Grid>
          </Grid>
            ))}
          </>
        )
      },
    },
    {
      field: 'QTY',
      width: 200,
      editable:true,
    
      renderCell: (cellValues) => {
    
        return (
          <>
          {map(cellValues?.row?.isPurchaseProducts,(getValues)=>(
          <Grid container spacing={2} sx={{ ml: 6 }} >
            <Grid xs={12}>
            {getValues?.qty}
            </Grid>
          </Grid>
            ))}
          </>
        )
      },
    },
  ]

// Get productsData Arrays
const getStockValues = get(getStockData,"data",[])?.map((values:any)=> values?.isPurchaseProducts
)



  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid xs={4}>
          <Typography variant='h5'>Stock</Typography>
        </Grid>
        <Grid xs={4}>
          <Autocomplete
            disablePortal
            sx={{ maxWidth: 340 }}
            options={getStockValues.flat()}
            size='small'
            getOptionLabel={(option: any) => option.category}
            value={find(getStockValues.flat(), (o: any) => o.category )}
            renderInput={(params) => <TextField {...params} name='category' placeholder='Category' />}
          />
        </Grid>
        <Grid xs={4}>
          <Autocomplete
            disablePortal
            sx={{ maxWidth: 340 }}
            options={getStockValues.flat()}
            size='small'
            getOptionLabel={(option: any) => option.productName}
            value={find(getStockValues.flat(), (o: any) => o.productName )}

            renderInput={(params) => <TextField {...params} name='productName' placeholder='ProductName' />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={get(getStockData,"data",[])}  columns={columns} height={330} processRowUpdates={updateRowDatas} />
        </Grid>
        <Grid xs={12} sx={{ mt: 2 }}>
          <Button size='small' fullWidth variant='contained' type='submit' onClick={onSubmitData}>
            Save
          </Button>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  )
}
export default Stock
