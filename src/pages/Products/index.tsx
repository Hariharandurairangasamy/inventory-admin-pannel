import React,{useState,useEffect,useCallback} from 'react'
import { Grid, Button, Typography, TextField, Autocomplete } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomDataGrid from '../../components/DataGridTable'
import AddIcon from '@mui/icons-material/Add'
import { GridColDef } from '@mui/x-data-grid'
import DialogModel from '../../components/Model'
import { useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { ToastContainer,toast } from 'react-toastify'
import { API_SERVICE } from '../../Service'
import API_END_POINT from "../../Constant/index"
import { find, get } from 'lodash'
import * as Yup from 'yup'
import { AxiosError, AxiosResponse } from 'axios'

function Products() {
  const [open, setOpen] = React.useState(false)
  const [getUnitsData,setGetUnitsData]=useState<any>()
  const [getSuppliersData,setGetSuppliersData]=useState<any>()
  const [getCategoriesData,setGetCategoriesData]=useState<any>()
  const [getProductsDatas,setGetProductsDatas]=useState<any>()
  const [searchParams, setSearchParams] = useSearchParams()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const getMode =searchParams.get("mode")
  const getId = searchParams.get("id")

const getAutoCompleteValuesData= useCallback(()=>{
  API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_CATEGORIES_DATA}`,(res:AxiosResponse)=>{
    setGetCategoriesData(get(res,"data.data",[]))
  },(err:AxiosError)=>{
    console.log(err)
  })
  API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_SUPPLIERS_DATA}`,(res:AxiosResponse)=>{
    setGetSuppliersData(get(res,"data.data",[]))
  },(err:AxiosError)=>{
    console.log(err)
  })
  API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_UNIT_DATA}`,(res:AxiosResponse)=>{
    setGetUnitsData(get(res,"data.data",[]))
  },(err:AxiosError)=>{
    console.log(err)
  })

  // Get Products Data

  API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_PRODUCTS_DATA}`,(res:AxiosResponse)=>{
    setGetProductsDatas(get(res,"data",[]))
  },(err:AxiosError)=>{
    console.log(err)
  })

},[])

const handleDelete=(id:any,values:any)=>{
  API_SERVICE.deleteApiData(`${API_END_POINT.API_END_POINT.DELETE_PRODUCTS_DATA}/${id}`,(res:AxiosResponse)=>{
    toast.success("Data Deleted SuccessFully")
  },(err:AxiosError)=>{
    toast.error("Data is Not Deleted")
  },values)
}

useEffect(()=>{
  if(getId){
    API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_UNIQUE_PRODUCTS_DATA}/${getId}`,(res:AxiosResponse)=>{ 
      formik.setFieldValue("productName",get(res,"data.data.productName",""))
      formik.setFieldValue("supplierName",get(res,"data.data.supplierName","")) 
      formik.setFieldValue("unitName",get(res,"data.data.unitName",""))
      formik.setFieldValue("categoryName",get(res,"data.data.categoryName",""))
    },(err:AxiosError)=>{
      console.log(err)
    })
  }
  getAutoCompleteValuesData()
},[getAutoCompleteValuesData,getId])


  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'categoryName',
      headerName: 'categoryName',
      width: 270,
    },
    {
      field: 'unitName',
      headerName: 'unitName',
      width: 270,
    },

    {
      field: 'productName',
      headerName: 'productName',
      width: 270,
    },

    {
      field: 'supplierName',
      headerName: 'supplierName',
      width: 270,
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
                  handleOpen(), setSearchParams({ mode: 'View',id:params.row._id })
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
               setSearchParams({ mode: 'Delete',id:params.row._id })
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
      productName: '',
      supplierName: '',
      unitName: '',
      categoryName: '',
    },
    validationSchema: Yup.object({
      productName: Yup.string().min(2, 'Mininum 2 characters').required('Required!'),
      supplierName: Yup.string().min(2, 'Mininum 2 characters').required('Required!'),
      unitName: Yup.string().min(2, 'Mininum 2 characters').required('Required!'),
      categoryName: Yup.string().min(2, 'Mininum 2 characters').required('Required!'),
    }),
    onSubmit: (values,{resetForm}) => {
    
      getMode === "Add" || null ? API_SERVICE.postApiData(`${API_END_POINT.API_END_POINT.POST_PRODUCTS_DATA}`,(res:AxiosResponse)=>{
        toast.success(" Data added SuccessFully")
        getAutoCompleteValuesData()
        handleClose()
        resetForm()
      },(err:AxiosError)=>{
        console.log(err)
        toast.error("Products Not Added")
      },values)
      : API_SERVICE.updateApiData(`${API_END_POINT.API_END_POINT.UPDATE_PRODUCTS_DATA}/${getId}`,(res:AxiosResponse)=>{
        toast.success("Products Data Updated")
        getAutoCompleteValuesData()
        handleClose()
        resetForm()
      },(err:AxiosError)=>{
        console.log(err)
        toast.error("Products Data Not Updated")
      },values)
    },
  })

  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={10}>
          <Typography variant='h5'>Products</Typography>
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
            Add Products
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={get(getProductsDatas,"data",[])} columns={columns} height={380} />
        </Grid>
      </Grid>
      <DialogModel isOpen={open} handleClose={handleClose}>
        <Grid xs={11}>
          <Typography sx={{ fontSize: '20px', fontWeight: 400, mt: -3 }}>
            {searchParams.get('mode')} Products
          </Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid xs={12}>
              <TextField
                label='productName'
                variant='outlined'
                size='small'
                fullWidth
                name='productName'
                onChange={formik.handleChange}
                disabled={getMode==="View" ? true:false}
                onBlur={formik.handleBlur}
                value={formik.values.productName}
                error={formik.touched.productName && Boolean(formik.errors.productName)}
                helperText={formik.touched.productName && formik.errors.productName}
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 1 }}>
              <Autocomplete
                disablePortal
                id='category'
                size='small'
                style={{ width: '100%' }}
                disabled={getMode==="View" ? true:false}
                options={getSuppliersData}
                value={find(getSuppliersData, (o: any) => o.supplierName === formik.values.supplierName)}
                getOptionLabel={(option: any) => option.supplierName}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='SupplierName'
                    name='supplierName'
                    error={formik.touched.supplierName && Boolean(formik.errors.supplierName)}
                    helperText={formik.touched.supplierName && formik.errors.supplierName}
                    onBlur={formik.handleBlur}
                  />
                )}
                onChange={(e, value) => {
                  formik.setFieldValue('supplierName', get(value, 'supplierName'))
                }}
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 1 }}>
       
              <Autocomplete
                disablePortal
                id='category'
                size='small'
                style={{ width: '100%' }}
                options={getUnitsData}
                disabled={getMode==="View" ? true:false}
                value={find(getUnitsData, (o: any) => o.unitsName === formik.values.unitName)}
                getOptionLabel={(option: any) => option.unitsName}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='unitsName'
                    name='unitName'
                    error={formik.touched.unitName && Boolean(formik.errors.unitName)}
                    helperText={formik.touched.unitName && formik.errors.unitName}
                    onBlur={formik.handleBlur}
                  />
                )}
                onChange={(e, value) => {
                  
                  formik.setFieldValue('unitName', get(value, 'unitsName',""))
                }}
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 1 }}>
              <Autocomplete
                disablePortal
                id='category'
                size='small'
                style={{ width: '100%' }}
                options={getCategoriesData}
                disabled={getMode==="View" ? true:false}
                value={find(getCategoriesData, (o: any) => o.categoriesName === formik.values.categoryName)}
                getOptionLabel={(option: any) => option.categoriesName}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='categoryName'
                    name='categoryName'
                    error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
                    helperText={formik.touched.categoryName && formik.errors.categoryName}
                    onBlur={formik.handleBlur}
                  />
                )}
                onChange={(e, value) => {
                  formik.setFieldValue('categoryName', get(value, 'categoriesName'))
                }}
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
      <ToastContainer />
    </div>
  )
}
export default Products
