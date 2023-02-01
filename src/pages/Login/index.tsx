import React from 'react'
import { TextField, Grid, Button, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().min(2, 'Mininum 2 characters').required('Required!'),
      password: Yup.string().min(2, 'Mininum 2 characters').required('Required!'),
    }),
    onSubmit: (values) => {
      console.log('collectData', values)
    },
  })
  return (
    <div style={{ backgroundImage: 'linear-gradient(to bottom right,#232526 85%,#414345)',height:"100vh" }}>
      <Grid spacing={2} style={{ textAlign: 'center', padding: '230px' }}>
        <Grid>
          <Typography variant='h5' sx={{ color: 'white', paddingRight: '330px' }}>
            Login
          </Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <Grid md={12}>
            <TextField
              id='outlined-basic'
              size='small'
              label='Email'
              variant='outlined'
              sx={{ width: '60vh', mt: 2, color: 'white' }}
              color='secondary'
              focused
              name='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid md={12}>
            <TextField
              id='outlined-basic'
              size='small'
              label='Password'
              variant='outlined'
              sx={{ width: '60vh', mt: 2 }}
              color='secondary'
              focused
              name='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Typography sx={{ paddingLeft: '240px', color: 'white',cursor:"pointer" }}>
              Forget Password...?
            </Typography>
          </Grid>
          <Grid md={12}>
            <Button
              sx={{ mt: 1, backgroundColor: '#753a88', color: 'white', width: '30vh' }}
              type='submit'
              disabled={!(formik.isValid && formik.dirty)}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
    </div>
  )
}
export default Login
