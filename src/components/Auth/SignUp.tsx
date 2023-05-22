import { Box, TextField, Button, Stack, FormControl, Typography } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import { startLogin, startSignUp } from '../../redux/actions/user'

const SignUp = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoggingIn, errorMessage] = useSelector((state: RootState) => [
    state.user.isLoggingIn,
    state.user.errorMessage
  ])

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    },

    /*onSubmit: (values) => {
      dispatch(startLogin(values.username, values.password))
      },*/
    onSubmit: (values) => {
      return dispatch(startSignUp(values.name, values.username, values.email, values.password))
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, 'Must be at least 3 characters').required('Name is required'),
      username: Yup.string()
        .min(4, 'Must be at least 4 characters')
        .required('Username is required'),
      email: Yup.string().email().required('Email is required'),
      password: Yup.string()
        .min(4, 'Must be at least 4 characters')
        .required('Password is required')
    })
  })

  if (formik.isSubmitting) {
    return <Typography>Sign up in progress</Typography>
  }

  return (
    <Stack
      sx={{
        alignItems: 'center'
      }}>
      <Box>Sign up</Box>
      {errorMessage && <Typography color={'red'}>{errorMessage}</Typography>}
      <Box padding={3} component="form" onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              {...formik.getFieldProps('name')}
              error={Boolean(formik.errors.username && formik.touched.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              {...formik.getFieldProps('username')}
              error={Boolean(formik.errors.username && formik.touched.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              {...formik.getFieldProps('email')}
              error={Boolean(formik.errors.username && formik.touched.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </FormControl>
          <FormControl>
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              {...formik.getFieldProps('password')}
              error={Boolean(formik.errors.password && formik.touched.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </FormControl>
          <Button variant="contained" type="submit">
            Sign up
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default SignUp
