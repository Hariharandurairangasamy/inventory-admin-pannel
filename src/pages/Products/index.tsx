import React from 'react'
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
import { find, get } from 'lodash'
import * as Yup from 'yup'

function Products() {
  const [open, setOpen] = React.useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
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
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid xs={12}>
          <CustomDataGrid rows={rows} columns={columns} height={340} />
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
                options={top100Films}
                value={find(top100Films, (o: any) => o.label === formik.values.supplierName)}
                getOptionLabel={(option: any) => option.label}
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
                  formik.setFieldValue('supplierName', get(value, 'label'))
                }}
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 1 }}>
              <Autocomplete
                disablePortal
                id='category'
                size='small'
                style={{ width: '100%' }}
                options={top100Films}
                value={find(top100Films, (o: any) => o.label === formik.values.unitName)}
                getOptionLabel={(option: any) => option.label}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='UnitName'
                    name='unitName'
                    error={formik.touched.unitName && Boolean(formik.errors.unitName)}
                    helperText={formik.touched.unitName && formik.errors.unitName}
                    onBlur={formik.handleBlur}
                  />
                )}
                onChange={(e, value) => {
                  formik.setFieldValue('unitName', get(value, 'label'))
                }}
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 1 }}>
              <Autocomplete
                disablePortal
                id='category'
                size='small'
                style={{ width: '100%' }}
                options={top100Films}
                value={find(top100Films, (o: any) => o.label === formik.values.categoryName)}
                getOptionLabel={(option: any) => option.label}
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
                  formik.setFieldValue('categoryName', get(value, 'label'))
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
    </div>
  )
}
export default Products
