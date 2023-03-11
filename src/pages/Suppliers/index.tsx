import React,{useEffect,useCallback, useState} from 'react'
import { Grid, Button, Typography, TextField } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomDataGrid from '../../components/DataGridTable'
import AddIcon from '@mui/icons-material/Add'
import { GridColDef } from '@mui/x-data-grid'
import API_END_POINT from "../../Constant/index"
import DialogModel from '../../components/Model'
import { useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {get} from "lodash"
import { API_SERVICE } from '../../Service'
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { AxiosError, AxiosResponse } from 'axios'


function Suppliers() {
  const [open, setOpen] = React.useState(false)
  const [getSuppliersDatas,setGetSuppliersDatas]=useState<any>()
  const [searchParams, setSearchParams] = useSearchParams()
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    formik.resetForm()
  }

  const getMode = searchParams.get('mode')
  const getId = searchParams.get("id")


const getSuppliersData = useCallback(()=>{
 API_SERVICE.fetchApiData(`${API_END_POINT?.API_END_POINT?.GET_SUPPLIERS_DATA}`,(res:AxiosResponse)=>{
  setGetSuppliersDatas(get(res,"data",[]))
 },(err:AxiosError)=>{
  console.log(err)
 })
},[])

const handleDelete = useCallback((params:any,getData:any)=>{
 
  API_SERVICE.deleteApiData(`${API_END_POINT.API_END_POINT.DETELE_SUPPLIER_DATA}/${params}`,(res:AxiosResponse)=>{
    getSuppliersData()
    toast.success("Data Deleted SuccessFully")
  },(err:AxiosError)=>{
    toast.error("Data Not Deleted")
  },getData) 
  },[])
  

useEffect(()=>{
  if(getId){
  API_SERVICE.fetchApiData(`${API_END_POINT?.API_END_POINT?.GET_UNIQUE_SUPPLIER_DATA}/${getId}`,(res:AxiosResponse)=>{
    formik.setFieldValue("supplierName",get(res,"data.data.supplierName",""))
    formik.setFieldValue("phone",get(res,"data.data.phone",""))
    formik.setFieldValue("email",get(res,"data.data.email",""))
    formik.setFieldValue("address",get(res,"data.data.address",""))
 
    },(err:AxiosError)=>{
     console.log(err)
    }) 
  }
  getSuppliersData()
  },[getId,getSuppliersData])


  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'supplierName',
      headerName: 'SupplierName',
      width: 150,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200,
    },

    {
      field: 'Action',
      headerAlign: 'center',
      width: 240,
      renderCell: (params) => {
        return (
          <Grid container spacing={2} sx={{ ml: 3 }}>
            <Grid xs={4}>
              <VisibilityIcon
                sx={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => {
                  handleOpen(), setSearchParams({ mode: 'View',id:params.row._id  })
                
                }}
              />
            </Grid>
            <Grid xs={4}>
              <EditIcon
                sx={{ color: 'green', cursor: 'pointer' }}
                onClick={() => {
                  handleOpen(), setSearchParams({ mode: 'Edit',id:params.row._id })
                
                }}
              />
            </Grid>
            <Grid xs={4}>
              <DeleteIcon
                sx={{ color: 'red', cursor: 'pointer' }}
                onClick={() => {
                  handleDelete(params.row._id,params.row)
                }}
              />
            </Grid>
          </Grid>
        )
      },
    },
  ]



  const formik = useFormik({
    initialValues: {
      supplierName: '',
      email: '',
      phone: 0,
      address: '',
    },
    validationSchema: Yup.object({
      supplierName: Yup.string()
        .min(2, 'Mininum 2 characters')
        .max(15, 'Maximum 15 characters')
        .required('Required!'),
      email: Yup.string().email('Invalid email format').required('Required!'),
      phone: Yup.string().required('Required!'),
      address: Yup.string().required('Required!'),
    }),
    onSubmit: (values,{resetForm}) => {

      getMode === "Add" || null ?
        API_SERVICE.postApiData(`${API_END_POINT.API_END_POINT.POST_SUPPLIER_DATA}`,(res:AxiosResponse)=>{
          getSuppliersData()
          handleClose()
          toast.success("Data Added SuccessFully")
          resetForm()

        },(err:AxiosError)=>{
          console.error(err)
          toast.error("Data not added")
          resetForm()
        },values)
      :
        API_SERVICE.updateApiData(`${API_END_POINT.API_END_POINT.UPDATE_SUPPLIERS_DATA}/${getId}`,(res:AxiosResponse)=>{
          getSuppliersData()
          handleClose()
          toast.success("Data Updated SuccessFully")
        },(err:AxiosError)=>{
          console.error(err)
          toast.error("Data not Updated")
          resetForm()
        },values
      )
     
    },
  })


  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={10}>
          <Typography variant='h5'>Suppliers</Typography>
        </Grid>
        <Grid xs={2}>
          <Button
            startIcon={<AddIcon />}
            sx={{
              color: 'white',
              backgroundColor: '#0CBABA',
              marginLeft: '10px',
              '&:hover': {
                background: '#0CBABA',
              },
            }}
            onClick={() => {
              handleOpen(), setSearchParams({ mode: 'Add' })
            }}
          >
            Add Suppliers
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={get(getSuppliersDatas,"data",[])}  columns={columns} height={380} />
        </Grid>
      </Grid>
      <DialogModel isOpen={open} handleClose={handleClose}>
        <Grid xs={11}>
          <Typography sx={{ fontSize: '20px', fontWeight: 400, mt: -3 }}>
            {searchParams.get('mode')} Suppliers
          </Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid xs={12}>
              <TextField
                label='Supplier Name'
                variant='outlined'
                size='small'
                fullWidth
                name='supplierName'
                disabled={getMode === "View"?true:false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.supplierName}
                error={formik.touched.supplierName && Boolean(formik.errors.supplierName)}
                helperText={formik.touched.supplierName && formik.errors.supplierName}
                
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label='Phone'
                variant='outlined'
                size='small'
                fullWidth
                type="number"
                sx={{ mt: 2 }}
                disabled={getMode === "View"?true:false}
                name='phone'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label='Email'
                variant='outlined'
                size='small'
                fullWidth
                sx={{ mt: 2 }}
                name='email'
                disabled={getMode === "View"?true:false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label='Address'
                variant='outlined'
                size='small'
                fullWidth
                sx={{ mt: 2 }}
                name='address'
                disabled={getMode === "View"?true:false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
          </Grid>
          {searchParams.get('mode') === 'View' ? null : (
            <Grid xs={12}>
              <Button
                sx={{
                  mt: 2,
                  color: 'white',
                  backgroundColor: '#0CBABA',
                  '&:hover': {
                    background: '#0CBABA',
                  },
                  ml: -2,
                }}
                type='submit'
                disabled={!(formik.isValid && formik.dirty)}
              
              >
                {searchParams.get('mode') === 'Add' ? 'Add' : 'Update'}
              </Button>
            </Grid>
          )}
        </form>
      </DialogModel>
      <ToastContainer position='top-right'/>
    </div>
  )
}
export default Suppliers
