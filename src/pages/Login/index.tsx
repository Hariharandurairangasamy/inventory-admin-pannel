import React from 'react'
import { TextField, Grid, Button, Typography } from '@mui/material'
import { login } from '../../redux/authSlice'
import {  useAppDispatch } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string().min(2, 'Mininum 2 characters').required('Required!'),
      password: Yup.string().min(2, 'Mininum 2 characters').required('Required!'),
    }),
    onSubmit: (values) => {
     dispatch(login(values)).then(()=>{
      navigate("/Home")
     }).catch(()=>{
      navigate("/")
     })
      
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
              name='userName'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
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
