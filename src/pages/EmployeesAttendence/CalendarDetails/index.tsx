import React from 'react'
import { Grid, Button, Typography, TextField, Autocomplete } from '@mui/material'
import { useFormik } from 'formik'
import { find, get } from 'lodash'
import * as Yup from 'yup'
import CustomCalendar from '../../../components/Calender'

function EmployeesDetails() {
  const formik = useFormik({
    initialValues: {
      EmployeeName: '',
      Designation: '',
    },
    validationSchema: Yup.object({}),
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
        <Grid xs={5}>
          <Typography variant='h5'>Employees Attendance</Typography>
        </Grid>
        <Grid xs={2}>
          <Autocomplete
            disablePortal
            id='EmployeeName'
            size='small'
            style={{ width: '100%' }}
            options={top100Films}
            value={find(top100Films, (o: any) => o.label === formik.values.EmployeeName)}
            getOptionLabel={(option: any) => option.label}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='EmployeeName'
                name='EmployeeName'
                error={formik.touched.EmployeeName && Boolean(formik.errors.EmployeeName)}
                helperText={formik.touched.EmployeeName && formik.errors.EmployeeName}
                onBlur={formik.handleBlur}
              />
            )}
            onChange={(e, value) => {
              formik.setFieldValue('supplierName', get(value, 'label'))
            }}
          />
        </Grid>
        <Grid xs={2}>
          <Autocomplete
            disablePortal
            id='Designation'
            size='small'
            style={{ width: '100%', marginLeft: '50px' }}
            options={top100Films}
            value={find(top100Films, (o: any) => o.label === formik.values.Designation)}
            getOptionLabel={(option: any) => option.label}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Designation'
                name='Designation'
                error={formik.touched.Designation && Boolean(formik.errors.Designation)}
                helperText={formik.touched.Designation && formik.errors.Designation}
                onBlur={formik.handleBlur}
              />
            )}
            onChange={(e, value) => {
              formik.setFieldValue('Designation', get(value, 'label'))
            }}
          />
        </Grid>
        <Grid xs={2}>
          <Autocomplete
            disablePortal
            id='Export'
            size='small'
            style={{ width: '100%', marginLeft: '80px' }}
            options={top100Films}
            value={find(top100Films, (o: any) => o.label === formik.values.Designation)}
            getOptionLabel={(option: any) => option.label}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Export'
                name='Export'
                error={formik.touched.Designation && Boolean(formik.errors.Designation)}
                helperText={formik.touched.Designation && formik.errors.Designation}
                onBlur={formik.handleBlur}
              />
            )}
            onChange={(e, value) => {
              formik.setFieldValue('Designation', get(value, 'label'))
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid xs={12}>
          <CustomCalendar />
        </Grid>
      </Grid>
    </div>
  )
}
export default EmployeesDetails
