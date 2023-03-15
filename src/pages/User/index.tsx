import React,{useState,useEffect,useCallback} from 'react'
import { Grid, Button, Typography, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomDataGrid from '../../components/DataGridTable'
import AddIcon from '@mui/icons-material/Add'
import { GridColDef } from '@mui/x-data-grid'
import DialogModel from '../../components/Model'
import { useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik'
import {find,get,map} from "lodash"
import Autocomplete from '@mui/material/Autocomplete';
import { addUserData } from '../../redux/userRegister'
import {  useAppDispatch } from '../../hooks'
import * as Yup from 'yup'
import API_END_POINT from "../../Constant/index"
import { API_SERVICE } from '../../Service'
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { AxiosError, AxiosResponse } from 'axios'



function Users() {
  const [open, setOpen] = React.useState(false)
  const [getUsersData,setGetUsersData]=useState()
  const [searchParams, setSearchParams] = useSearchParams()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const dispatch = useAppDispatch()


  const getUserData = useCallback(()=>{
    API_SERVICE.fetchApiData(`${API_END_POINT?.API_END_POINT?.GET_USE_DATA}`,(res:AxiosResponse)=>{
      setGetUsersData(get(res,"data",[]))
    },(err:AxiosError)=>{
     console.log(err)
    })
   },[])

   const handleDelete = useCallback((params:any,getData:any)=>{
 
    API_SERVICE.deleteApiData(`${API_END_POINT.API_END_POINT.DELETE_USER_DATA}/${params}`,(res:AxiosResponse)=>{
      getUserData()
      toast.success("Data Deleted SuccessFully")
    },(err:AxiosError)=>{
      toast.error("Data Not Deleted")
    },getData) 
    },[])
    

   useEffect(()=>{
    getUserData()
   },[getUserData])

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'userName',
      headerName: 'UserName',
      width: 370,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 370,
    },

    {
      field: 'Action',
      headerAlign: 'center',
      width: 200,
      renderCell: (params) => {
        return (
          <Grid container spacing={2} sx={{ ml: 3 }}>
    
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
      userName: '',
      password:'',
      role:'',
      isPermission:[""]
   
    },
    validationSchema: Yup.object({
        userName: Yup.string().required(),
        password: Yup.string().required(),
        role: Yup.string().required(),
      

    }),
    onSubmit: (values) => {
    
      dispatch(addUserData(values)).then(()=>{
        formik.resetForm()
        getUserData()
        toast.success("User Added SuccessFully")
        handleClose()
      }).catch((err)=>{
        toast.error("Data not Added")
        console.log(err)
      })
    },
  })
  const top100Films:any = [
    { title: 'Read', year: 1994 },
    { title: 'Write', year: 1972 },
    { title: 'Edit', year: 1974 },]
  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={10}>
          <Typography variant='h5'>Users</Typography>
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
            Add Users
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={get(getUsersData,"data",[])} columns={columns} height={380} />
        </Grid>
      </Grid>
      <DialogModel isOpen={open} handleClose={handleClose}>
        <Grid xs={11}>
          <Typography sx={{ fontSize: '20px', fontWeight: 400, mt: -3 }}>
            {searchParams.get('mode')} Users
          </Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid xs={24} >
              <TextField
                label='Name'
                variant='outlined'
                size='small'
                fullWidth
                name='userName'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
              />
            </Grid>
            <Grid xs={24} sx={{mt:2}}>
              <TextField
                label='Password'
                variant='outlined'
                size='small'
                fullWidth
                name='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid xs={24} sx={{mt:2}}>
            <TextField
                label='Role'
                variant='outlined'
                size='small'
                fullWidth
                name='role'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              />
            </Grid>

            <Grid xs={24} sx={{mt:2}}>
            <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={top100Films}
      value={find(top100Films, (o: any) => o.title === formik.values.role)}
      getOptionLabel={(option: any) => option.title}
      disableCloseOnSelect
      size='small'
   
      renderOption={(props, option) => (
        <li {...props}>
        
          {option.title}
        </li>
      )}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label="Permission" name='isPermission'
        error={formik.touched.isPermission && Boolean(formik.errors.isPermission)}
        helperText={formik.touched.isPermission && formik.errors.isPermission}
        onBlur={formik.handleBlur}/>
        
      )}
      onChange={(e, value) => {
        formik.setFieldValue('isPermission', map(value,(val)=> val?.title))
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
      <ToastContainer position='top-right'/>

    </div>
  )
}
export default Users
