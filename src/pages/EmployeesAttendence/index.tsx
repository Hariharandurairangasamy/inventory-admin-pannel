import React from 'react'
import { Grid, Button, Typography, TextField, Autocomplete } from '@mui/material'
import { Input } from 'antd'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomDataGrid from '../../components/DataGridTable'
import { find, get } from 'lodash'
import AddIcon from '@mui/icons-material/Add'
import { GridColDef } from '@mui/x-data-grid'
import DialogModel from '../../components/Model'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import * as Yup from 'yup'

function EmployeesAttendence() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()
  const { TextArea } = Input
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
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
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]
  const formik = useFormik({
    initialValues: {
      name: '',
      designation: '',
      date: '',
      status: '',
      details: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required!'),
      designation: Yup.string().required('Required!'),
      date: Yup.string().required('Required!'),
      status: Yup.string().required('Required!'),
    }),
    onSubmit: (values) => {
      console.log('collectData', values)
    },
  })
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
  ]
  return (
    <div>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={8}>
          <Typography variant='h5'>Attendance</Typography>
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
            onClick={() => navigate('/EmployeesDetails/Add')}
          >
            Unique Details
          </Button>
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
            Add Attendance
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={rows} columns={columns} height={340} />
        </Grid>
      </Grid>
      <DialogModel isOpen={open} handleClose={handleClose}>
        <Grid xs={11}>
          <Typography sx={{ fontSize: '20px', fontWeight: 400, mt: -3 }}>
            {searchParams.get('mode')} Attendance
          </Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid xs={12}>
              <Autocomplete
                disablePortal
                id='category'
                size='small'
                style={{ width: '100%' }}
                options={top100Films}
                value={find(top100Films, (o: any) => o.label === formik.values.name)}
                getOptionLabel={(option: any) => option.label}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Name'
                    name='name'
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    onBlur={formik.handleBlur}
                  />
                )}
                onChange={(e, value) => {
                  formik.setFieldValue('name', get(value, 'label'))
                }}
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 1 }}>
              <Autocomplete
                disablePortal
                id='designation'
                size='small'
                style={{ width: '100%' }}
                options={top100Films}
                value={find(top100Films, (o: any) => o.label === formik.values.designation)}
                getOptionLabel={(option: any) => option.label}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Designation'
                    name='designation'
                    error={formik.touched.designation && Boolean(formik.errors.designation)}
                    helperText={formik.touched.designation && formik.errors.designation}
                    onBlur={formik.handleBlur}
                  />
                )}
                onChange={(e, value) => {
                  formik.setFieldValue('designation', get(value, 'label'))
                }}
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Date'
                  onChange={(e, value) => {
                    formik.setFieldValue('date', e)
                  }}
                  value={formik.values.date}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={formik.touched.date && Boolean(formik.errors.date)}
                      helperText={formik.touched.date && formik.errors.date}
                      sx={{
                        '& .MuiInputBase-input': {
                          width: 490,
                          height: '10px',
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={12} sx={{ mt: 1 }}>
              <Autocomplete
                disablePortal
                id='status'
                size='small'
                style={{ width: '100%' }}
                options={top100Films}
                value={find(top100Films, (o: any) => o.label === formik.values.status)}
                getOptionLabel={(option: any) => option.label}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Status'
                    name='status'
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                    onBlur={formik.handleBlur}
                  />
                )}
                onChange={(e, value) => {
                  formik.setFieldValue('status', get(value, 'label'))
                }}
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 1 }}>
              <TextArea
                rows={4}
                placeholder=''
                maxLength={6}
                onChange={formik.handleChange}
                name='details'
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
    </div>
  )
}
export default EmployeesAttendence
