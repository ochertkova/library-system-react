import { Box, TextField, Button, Stack, FormControl, Typography } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import { startLogin } from '../../redux/actions/user'

const SignIn = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoggingIn, errorMessage] = useSelector((state: RootState) => [
    state.user.isLoggingIn,
    state.user.errorMessage
  ])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (values) => {
      dispatch(startLogin(values.username, values.password))
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, 'Must be at least 4 characters')
        .required('Username is required'),
      password: Yup.string()
        .min(4, 'Must be at least 4 characters')
        .required('Password is required')
    })
  })

  if (isLoggingIn) {
    return <Typography>Logging in in progress</Typography>
  }

  return (
    <Stack
      sx={{
        alignItems: 'center'
      }}>
      <Box>
        <Typography>Log in</Typography>
      </Box>
      {errorMessage && <Typography color={'red'}>{errorMessage}</Typography>}
      <Box padding={3} component="form" onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
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
            Log in
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default SignIn
