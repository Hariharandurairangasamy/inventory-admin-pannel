import React from 'react'
import { Grid, Button, Typography, TextField } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomDataGrid from '../../components/DataGridTable'
import AddIcon from '@mui/icons-material/Add'
import { GridColDef } from '@mui/x-data-grid'
import DialogModel from '../../components/Model'
import { useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { get } from 'lodash'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import * as Yup from 'yup'

function Employees() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'units',
      headerName: 'Units',
      width: 670,
    },

    {
      field: 'Action',
      headerAlign: 'center',
      width: 200,
      renderCell: (cellValues) => {
        return (
          <Grid container spacing={2} sx={{ ml: 3 }}>
            <Grid xs={4}>
              <VisibilityIcon
                sx={{ color: 'blue', cursor: 'pointer' }}
                onClick={() => {
                  handleOpen(), setSearchParams({ mode: 'View' })
                }}
              />
            </Grid>
            <Grid xs={4}>
              <EditIcon
                sx={{ color: 'green', cursor: 'pointer' }}
                onClick={() => {
                  handleOpen(), setSearchParams({ mode: 'Edit' })
                }}
              />
            </Grid>
            <Grid xs={4}>
              <DeleteIcon
                sx={{ color: 'red', cursor: 'pointer' }}
                onClick={() => {
                  handleOpen(), setSearchParams({ mode: 'Delete' })
                }}
              />
            </Grid>
          </Grid>
        )
      },
    },
  ]

  const rows = [
    { _id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
   
  ]
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      disrict: '',
      DOJ: '',
      BloodGroup: '',
      Designation: '',
      photo: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      phone: Yup.string().required(),
      email: Yup.string().required(),
      address1: Yup.string().required(),
      address2: Yup.string().required(),
      city: Yup.string().required(),
      disrict: Yup.string().required(),
      DOJ: Yup.string().required(),
      BloodGroup: Yup.string().required(),
      Designation: Yup.string().required(),
      photo: Yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log('collectData', values)
    },
  })
  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={10}>
          <Typography variant='h5'>Employees</Typography>
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
            Add Employees
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={rows} columns={columns} height={340} />
        </Grid>
      </Grid>
      <DialogModel isOpen={open} handleClose={handleClose}>
        <Grid xs={11}>
          <Typography sx={{ fontSize: '20px', fontWeight: 400, mt: -3 }}>
            {searchParams.get('mode')} Employees
          </Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid xs={6}>
              <TextField
                label='Name'
                variant='outlined'
                size='small'
                fullWidth
                name='name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                label='Phone'
                variant='outlined'
                size='small'
                fullWidth
                sx={{ ml: 1 }}
                name='phone'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                label='Email'
                variant='outlined'
                size='small'
                fullWidth
                name='email'
                sx={{ mt: 2 }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                label='Address1'
                variant='outlined'
                size='small'
                fullWidth
                sx={{ mt: 2, ml: 1 }}
                name='address1'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address1}
                error={formik.touched.address1 && Boolean(formik.errors.address1)}
                helperText={formik.touched.address1 && formik.errors.address1}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                label='Address2'
                variant='outlined'
                size='small'
                fullWidth
                sx={{ mt: 2 }}
                name='address2'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address2}
                error={formik.touched.address2 && Boolean(formik.errors.address2)}
                helperText={formik.touched.address2 && formik.errors.address2}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                label='City'
                variant='outlined'
                size='small'
                fullWidth
                name='city'
                sx={{ mt: 2, ml: 1 }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                label='District'
                variant='outlined'
                size='small'
                fullWidth
                sx={{ mt: 2 }}
                name='disrict'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.disrict}
                error={formik.touched.disrict && Boolean(formik.errors.disrict)}
                helperText={formik.touched.disrict && formik.errors.disrict}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                variant='outlined'
                type='file'
                size='small'
                fullWidth
                sx={{ mt: 2, ml: 1 }}
                name='photo'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.photo}
                error={formik.touched.photo && Boolean(formik.errors.photo)}
                helperText={formik.touched.photo && formik.errors.photo}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                label='Blood Group'
                variant='outlined'
                size='small'
                fullWidth
                sx={{ mt: 2 }}
                name='BloodGroup'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.BloodGroup}
                error={formik.touched.BloodGroup && Boolean(formik.errors.BloodGroup)}
                helperText={formik.touched.BloodGroup && formik.errors.BloodGroup}
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                label='Designation'
                variant='outlined'
                size='small'
                fullWidth
                sx={{ mt: 2, ml: 1 }}
                name='Designation'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Designation}
                error={formik.touched.Designation && Boolean(formik.errors.Designation)}
                helperText={formik.touched.Designation && formik.errors.Designation}
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Date'
                  onChange={(e, value) => {
                    formik.setFieldValue('DOJ', e)
                  }}
                  value={formik.values.DOJ}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={formik.touched.DOJ && Boolean(formik.errors.DOJ)}
                      helperText={formik.touched.DOJ && formik.errors.DOJ}
                      sx={{
                        '& .MuiInputBase-input': {
                          width: 495,
                          height: '10px',
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
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
    </div>
  )
}
export default Employees
