import { Box, TextField, Button, Stack, FormControl, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import authors from '../../services/authors'
import { useState } from 'react'

const AddAuthor = () => {
  const userState = useSelector((state: RootState) => state.user)
  const [message, setMessage] = useState('')
  const { loggedInUser } = userState

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: async (values) => {
      const response = await authors.addOne(values, loggedInUser.token)
      if (response.status === 200) {
        setMessage(`Author ${response.data.name} added`)
      } else {
        console.log(response)
        setMessage(response.data.message)
      }
    }
  })
  return (
    <Stack
      sx={{
        alignItems: 'center',
        p: 3
      }}>
      <Box>
        <Typography variant="h5">Add author</Typography>
      </Box>
      {message.length > 0 && <Typography>{message}</Typography>}
      <Box padding={3} component="form" onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <TextField
              id="name"
              label="Author's name"
              variant="outlined"
              {...formik.getFieldProps('name')}
              error={Boolean(formik.errors.name && formik.touched.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </FormControl>
          <Button variant="contained" type="submit">
            Add author
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default AddAuthor
