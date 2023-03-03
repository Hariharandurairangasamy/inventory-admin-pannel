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

function Units() {
  const [open, setOpen] = React.useState(false)
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
    { _id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { _id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { _id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { _id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { _id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { _id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { _id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { _id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]
  const formik = useFormik({
    initialValues: {
      units: '',
    },
    validationSchema: Yup.object({
      units: Yup.string()
        .min(2, 'Mininum 2 characters')
        .max(15, 'Maximum 15 characters')
        .required('Required!'),
    }),
    onSubmit: (values) => {
      console.log('collectData', values)
    },
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
          <CustomDataGrid rows={rows} columns={columns} height={340} />
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
                name='units'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.units}
                error={formik.touched.units && Boolean(formik.errors.units)}
                helperText={formik.touched.units && formik.errors.units}
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
export default Units
