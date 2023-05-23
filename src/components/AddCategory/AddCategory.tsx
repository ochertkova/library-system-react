import { Box, TextField, Button, Stack, FormControl, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useState } from 'react'
import categories from '../../services/categories'

const AddCategory = () => {
  const userState = useSelector((state: RootState) => state.user)
  const [message, setMessage] = useState('')
  const { loggedInUser } = userState

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: async (values) => {
      const response = await categories.addOne(values, loggedInUser.token)
      if (response.status === 200) {
        setMessage(`Category ${response.data.name} added`)
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
        <Typography variant="h5">Add category</Typography>
      </Box>
      {message.length > 0 && <Typography>{message}</Typography>}
      <Box padding={3} component="form" onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <TextField
              id="name"
              label="Category's name"
              variant="outlined"
              {...formik.getFieldProps('name')}
              error={Boolean(formik.errors.name && formik.touched.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </FormControl>
          <Button variant="contained" type="submit">
            Add category
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default AddCategory
