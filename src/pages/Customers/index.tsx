import React,{useState,useEffect,useCallback} from 'react'
import { Grid, Button, Typography, TextField } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomDataGrid from '../../components/DataGridTable'
import AddIcon from '@mui/icons-material/Add'
import { GridColDef } from '@mui/x-data-grid'
import DialogModel from '../../components/Model'
import { useSearchParams } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import { API_SERVICE } from '../../Service'
import {get} from "lodash"
import API_END_POINT from "../../Constant/index"
import SERVER from '../../Config'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AxiosError, AxiosResponse } from 'axios'

function Customers() {
  const [open, setOpen] = React.useState(false)
  const [getCustomersData,setGetCustomersData]=useState<any>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [getUploadImage,setGetUploadUImage]=useState<any>()
  const [getImagesEditMode,setGetImagesEditMode]=useState<any>()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const getMode = searchParams.get("mode")
  const getId = searchParams.get("id")

const handleGetCustomersData = useCallback(()=>{
  API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_CUSTOMERS_DATA}`,(res:AxiosResponse)=>{
    setGetCustomersData(get(res,"data",[]))
  },(err:AxiosError)=>{
    console.log(err)
  })
},[])

const handleDelete=(id:any,values:any)=>{
  API_SERVICE.deleteApiData(`${API_END_POINT.API_END_POINT.DELETE_CUSTOMER_DATA}/${id}`,(res:AxiosResponse)=>{
    toast.success("Data Deleted SuccessFully")
    handleGetCustomersData()
  },(err:AxiosError)=>{
    toast.error("Data Not Deleted SuccessFully")
  },values)
}

useEffect(()=>{
  if(getId){
    API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_UNIQUE_CUSTOMER_DATA}/${getId}`,(res:AxiosResponse)=>{
      setGetImagesEditMode(get(res,"data.data.customerPicture",""))
      formik.setFieldValue("customerName",get(res,"data.data.customerName",""))
      formik.setFieldValue("phone",get(res,"data.data.phone",""))
      formik.setFieldValue("email",get(res,"data.data.email",""))
      formik.setFieldValue("address",get(res,"data.data.address",""))

    },(err:AxiosError)=>{
      console.log(err)
    })
  }
  handleGetCustomersData()
},[handleGetCustomersData,getId])



  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'customerName',
      headerName: 'Customer Name',
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
      width: 100,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 160,
    },
    {
      field: 'images',
      headerName: 'Images',
      type: 'number',
      width: 110,
      renderCell:(data)=>{
      
        return(
          <div>
            <img src={get(data?.row,"customerPicture","")} alt="customerData" />
          </div>
        )
      }
    },
    {
      field: 'Action',
      headerAlign: 'center',
      width: 200,
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
                  handleDelete(params.row._id,params.row),
                 setSearchParams({ mode: 'Delete' })
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
      customerName: '',
      email: '',
      phone: '',
      address: '',
      cloudineryId: getUploadImage,
    },
    validationSchema: Yup.object({
      customerName: Yup.string()
        .required('Required!'),
      email: Yup.string().email('Invalid email format').required('Required!'),
      phone: Yup.string().required('Required!'),
      address: Yup.string().required('Required!'),
  
    }),
    onSubmit: (values) => {
    const formData =new FormData()
    formData.append("customerName",values?.customerName)
    formData.append("email",values?.email)
    formData.append("phone",values?.phone)
    formData.append("address",values?.address)
    formData.append("cloudineryId",getUploadImage)
      getMode === "Add" || null ? API_SERVICE.PostRequest(`${SERVER?.BACKEND_HOST_URL}/${API_END_POINT.API_END_POINT.POST_CUSTOMER_DATA}`,(res:AxiosResponse)=>{
        formik.resetForm()
        handleClose()
        toast.success("Data Added SuccessFully")
        handleGetCustomersData()
      },(err:AxiosError)=>{
        toast.error("Data Not Added")
        console.log(err)
      },formData)
      : API_SERVICE.PatchRequest(`${SERVER?.BACKEND_HOST_URL}/${API_END_POINT.API_END_POINT.UPDATE_CUSTOMER_DATA}/${getId}`,(res:AxiosResponse)=>{
        formik.resetForm()
        toast.success("Data Updatad SuccessFully")
        handleClose()
        handleGetCustomersData()
      },(err:AxiosError)=>{
        console.log(err)
        toast.error("Data Not Updataed")
      },formData)
    },
  })


  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={10}>
          <Typography variant='h5'>Customers</Typography>
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
              handleOpen(), setSearchParams({ mode: 'Add' })
            }}
          >
            Add Customers
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={get(getCustomersData,"data",[])} columns={columns} height={380} />
        </Grid>
      </Grid>
      <DialogModel isOpen={open} handleClose={handleClose}>
        <Grid xs={11}>
          <Typography sx={{ fontSize: '20px', fontWeight: 400, mt: -3 }}>
            {searchParams.get('mode')} Customers
          </Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid xs={12}>
              <TextField
                label='Customer Name'
                variant='outlined'
                size='small'
                fullWidth
                name='customerName'
                disabled={getMode === "View"?true:false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.customerName}
                error={formik.touched.customerName && Boolean(formik.errors.customerName)}
                helperText={formik.touched.customerName && formik.errors.customerName}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label='Phone'
                variant='outlined'
                size='small'
                fullWidth
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
                onChange={formik.handleChange}
                disabled={getMode === "View"?true:false}
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
                onChange={formik.handleChange}
                disabled={getMode === "View"?true:false}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid xs={12}>
              <div style={{paddingTop:"10px"}}>
            <input
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              onChange={(e:any)=> setGetUploadUImage(e.target.files[0])}
            />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary"   disabled={getMode === "View"?true:false} component="span" endIcon={<UploadFileIcon />}>
                  Image
                </Button>
              </label>
              </div>
              {searchParams.get("mode") === "Edit" || searchParams.get("mode") === "View" ?( <img src={getImagesEditMode} style={{width:"100px",height:"100px"}}/>): null}

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
               type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                {searchParams.get('mode') === 'Add' ? 'Add' : 'Update'}
              </Button>
            </Grid>
          )}
        </form>
      </DialogModel>
      <ToastContainer />
    </div>
  )
}
export default Customers
