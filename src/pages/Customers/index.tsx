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
import * as Yup from 'yup'

function Customers() {
  const [open, setOpen] = React.useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'Customer Name',
      headerName: 'First name',
      width: 150,
    },
    {
      field: 'Supplier Phone',
      headerName: 'Phone',
      width: 150,
    },
    {
      field: ' email',
      headerName: 'Email',
      type: 'number',
      width: 100,
    },
    {
      field: 'Address',
      headerName: 'Supplier Address',
      type: 'number',
      width: 160,
    },
    {
      field: 'images',
      headerName: 'Images',
      type: 'number',
      width: 110,
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
      customerName: '',
      email: '',
      phone: '',
      address: '',
      imageUpload: '',
    },
    validationSchema: Yup.object({
      customerName: Yup.string()
        .min(2, 'Mininum 2 characters')
        .max(15, 'Maximum 15 characters')
        .required('Required!'),
      email: Yup.string().email('Invalid email format').required('Required!'),
      phone: Yup.string().required('Required!'),
      address: Yup.string().required('Required!'),
      imageUpload: Yup.string().required('Required!'),
    }),
    onSubmit: (values) => {
      console.log('collectData', values)
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
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={rows} columns={columns} height={340} />
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
                onBlur={formik.handleBlur}
                value={formik.values.address}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                variant='outlined'
                type='file'
                size='small'
                fullWidth
                sx={{ mt: 2 }}
                name='imageUpload'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.imageUpload}
                error={formik.touched.imageUpload && Boolean(formik.errors.imageUpload)}
                helperText={formik.touched.imageUpload && formik.errors.imageUpload}
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
export default Customers
