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
import {get} from "lodash"
import { useFormik } from 'formik'
import { API_SERVICE } from '../../Service'
import API_END_POINT from "../../Constant/index"
import { ToastContainer,toast } from 'react-toastify'
import * as Yup from 'yup'
import { AxiosError, AxiosResponse } from 'axios'

function Categories() {
  const [open, setOpen] = React.useState(false)
  const [getCategoriesDatas,setGetCategoriesData]=useState()
  const [searchParams, setSearchParams] = useSearchParams()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const getMode = searchParams.get("mode")
  const getId = searchParams.get("id")
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 300 },
    {
      field: 'categoriesName',
      headerName: 'CategoriesName',
      width: 600,
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
                  handleDelete(params.row._id,params.row),setSearchParams({ mode: 'Delete',id:params.row._id })
                }}
              />
            </Grid>
          </Grid>
        )
      },
    },
  ]

  const getCategoriesData = useCallback(()=>{
    API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_CATEGORIES_DATA}`,(res:AxiosResponse)=>{
      setGetCategoriesData(get(res,"data",[]))
    },(err:AxiosError)=>{
      console.log(err)
    })
  },[])

 
  const handleDelete = useCallback((id:any,value:any)=>{
    API_SERVICE.deleteApiData(`${API_END_POINT.API_END_POINT.DELETE_CATEGORIES_DATA}/${id}`,(res:AxiosResponse)=>{
      toast.success("Data Deleted SuccessFully")
      getCategoriesData()
    },(err:AxiosError)=>{
      toast.error("Data Not Deleted")
    },value)
  },[])

  useEffect(()=>{

    if(getId){
      API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_UNIQUE_CATEGORIES_DATA}/${getId}`,(res:AxiosResponse)=>{
       formik.setFieldValue("categoriesName",get(res,"data.getCategoriesData.categoriesName",""))
      },(err:AxiosError)=>{
        console.log(err)
      })
    }
    getCategoriesData()
    
  },[getId,getCategoriesData])


  const formik = useFormik({
    initialValues: {
      categoriesName: '',
    },
    validationSchema: Yup.object({
      categoriesName: Yup.string()
       .required('Required!'),
    }),
    onSubmit: (values,{resetForm}) => {
      getMode === "Add" || null ? API_SERVICE.postApiData(`${API_END_POINT.API_END_POINT.POST_CATEGORIES_DATA}`,(res:AxiosResponse)=>{
        resetForm()
        handleClose()
        toast.success("Data added Successfully")
        getCategoriesData()
      },(err:AxiosError)=>{
        console.log(err)
        toast.error("Data not Added")
      },values) : API_SERVICE.updateApiData(`${API_END_POINT.API_END_POINT.UPDATE_CATEGORIES_DATA}/${getId}`,(res:AxiosResponse)=>{
        resetForm()
        handleClose()
        toast.success("Data Updated Successfully")
        getCategoriesData()
      },(err:AxiosError)=>{
        toast.error("Data Not Updated")
      },values)
    }
  })
  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={10}>
          <Typography variant='h5'>Category</Typography>
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
            Add Category
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={get(getCategoriesDatas,"data",[])} columns={columns} height={340} />
        </Grid>
      </Grid>
      <DialogModel isOpen={open} handleClose={handleClose}>
        <Grid xs={11}>
          <Typography sx={{ fontSize: '20px', fontWeight: 400, mt: -3 }}>
            {searchParams.get('mode')} Category
          </Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid xs={12}>
              <TextField
                label='CategoryName'
                variant='outlined'
                size='small'
                fullWidth
                name='categoriesName'
                onChange={formik.handleChange}
                disabled={getMode==="View"?true:false}
                onBlur={formik.handleBlur}
                value={formik.values.categoriesName}
                error={formik.touched.categoriesName && Boolean(formik.errors.categoriesName)}
                helperText={formik.touched.categoriesName && formik.errors.categoriesName}
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
export default Categories
