import React,{useState,useCallback,useEffect} from 'react'
import { Grid, Button, Typography, TextField } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomDataGrid from '../../components/DataGridTable'
import AddIcon from '@mui/icons-material/Add'
import { GridColDef } from '@mui/x-data-grid'
import DialogModel from '../../components/Model'
import { API_SERVICE } from '../../Service'
import API_END_POINT from "../../Constant/index"
import { useSearchParams } from 'react-router-dom'
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {  AxiosError, AxiosResponse } from 'axios'
import { get } from 'lodash'

function Units() {
  const [open, setOpen] = React.useState(false)
  const[getUniteData,setGetUnitsData]=useState()
  const [searchParams, setSearchParams] = useSearchParams()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const getMode = searchParams.get('mode')
  const getId = searchParams.get("id")

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 300 },
    {
      field: 'unitsName',
      headerName: 'Units',
      width: 500,
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


  const getUnitData= useCallback(()=>{
    API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_UNIT_DATA}`,(res:AxiosResponse)=>{
      setGetUnitsData(get(res,"data",[]))
    },(err:AxiosError)=>{
      console.log(err)
    })

  },[])

const handleDelete=(params:string,getRowsData:any)=>{
API_SERVICE.deleteApiData(`${API_END_POINT.API_END_POINT.DELETE_UNIT_DATA}/${params}`,(res:AxiosResponse)=>{
  getUnitData()
  toast.success("Data Deleted SuccessFully")
},(err:AxiosError)=>{
  toast.success("Data not Deleted")
},getRowsData)
}

  useEffect(()=>{
    if(getId){
      API_SERVICE.fetchApiData(`${API_END_POINT.API_END_POINT.GET_UNIT_UNIQUE_DATA}/${getId}`,(res:AxiosResponse)=>{
          formik.setFieldValue("unitsName",get(res,"data.data.unitsName",""))
      },(err:AxiosError)=>{
        console.log(err)
      })
    }
    getUnitData()
   
  },[getUnitData,getId])
  
  const formik = useFormik({
    initialValues: {
      unitsName: '',
    },
    validationSchema: Yup.object({
      unitsName: Yup.string()
        .required('Required!'),
    }),
    onSubmit: (values,{resetForm}) => {
      getMode == "Add" || null ? API_SERVICE.postApiData(`${API_END_POINT.API_END_POINT.POST_UNIT_DATA}`,(res:AxiosResponse)=>{
        getUnitData()
        handleClose()
        toast.success("Data Added SuccessFully")
        resetForm()
      },(err:AxiosError)=>{
        console.error(err)
      toast.error("Data Not Added")
      resetForm()
      },values): API_SERVICE.updateApiData(`${API_END_POINT?.API_END_POINT?.UPDATE_UNIT_DATA}/${getId}`,(res:AxiosResponse)=>{
        getUnitData()
        handleClose()
        resetForm()
      toast.success("Data Updated Succesfully")
      },(err:AxiosError)=>{
        console.log(err)
       toast.error("Data not Updated")
      },values)

    } 
  })
  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={10}>
          <Typography variant='h5'>Units</Typography>
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
            Add Units
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={get(getUniteData,"data",[])} columns={columns} height={340} />
        </Grid>
      </Grid>
      <DialogModel isOpen={open} handleClose={handleClose}>
        <Grid xs={11}>
          <Typography sx={{ fontSize: '20px', fontWeight: 400, mt: -3 }}>
            {searchParams.get('mode')} Units
          </Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid xs={12}>
              <TextField
                label='Units'
                variant='outlined'
                size='small'
                fullWidth
                name='unitsName'
                disabled={getMode === "View" ? true:false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.unitsName}
                error={formik.touched.unitsName && Boolean(formik.errors.unitsName)}
                helperText={formik.touched.unitsName && formik.errors.unitsName}
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
export default Units
