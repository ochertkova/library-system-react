import { Box, TextField, Button, Stack, FormControl } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { handleUpdate } from '../../redux/actions/book'
import { AppDispatch, RootState } from '../../redux/store'

const UpdateBook = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const bookId = Number(useParams().id)
  const { isLoading, books } = useSelector((state: RootState) => state.books)

  const bookForUpdate: Book = books.find((book: Book) => book.id === bookId)

  const formik = useFormik({
    initialValues: {
      ISBN: bookForUpdate.ISBN,
      title: bookForUpdate.title,
      authors: bookForUpdate.authors,
      publisher: bookForUpdate.publisher,
      publishedDate: bookForUpdate.publishedDate,
      description: bookForUpdate.description
    },
    onSubmit: (values: Omit<Book, 'id' | 'status'>) => {
      const valuesWithIdStatus = {
        ...values,
        id: bookForUpdate.id,
        status: bookForUpdate.status,
        cover: bookForUpdate.bookCoverLink
      }

      navigate(`/bookInfo/${bookForUpdate.id}`)
      return dispatch(handleUpdate(valuesWithIdStatus))
    },
    validationSchema: Yup.object({
      ISBN: Yup.string().min(6, 'Must be at least 6 characters').required('ISBN is required'),
      title: Yup.string().required('Title is required'),
      authors: Yup.string().required('Authors is required'),
      publisher: Yup.string().required('Publisher is required'),
      publishedDate: Yup.string().required('Published date is required'),
      description: Yup.string().required('Description is required')
    })
  })
  return (
    <Stack spacing={2}>
      <Box>Edit book</Box>
      <Box padding={3} component="form" onSubmit={formik.handleSubmit}>
        <Stack spacing={2} sx={{ width: 0.75 }}>
          <FormControl>
            <TextField
              id="ISBN"
              label="ISBN"
              variant="outlined"
              {...formik.getFieldProps('ISBN')}
              error={Boolean(formik.errors.ISBN && formik.touched.ISBN)}
              helperText={formik.touched.ISBN && formik.errors.ISBN}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              {...formik.getFieldProps('title')}
              error={Boolean(formik.errors.title && formik.touched.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="authors"
              label="Authors"
              variant="outlined"
              {...formik.getFieldProps('authors')}
              error={Boolean(formik.errors.authors && formik.touched.authors)}
              helperText={formik.touched.authors && formik.errors.authors}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="publisher"
              label="Publisher"
              variant="outlined"
              {...formik.getFieldProps('publisher')}
              error={Boolean(formik.errors.publisher && formik.touched.publisher)}
              helperText={formik.touched.publisher && formik.errors.publisher}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="publishedDate"
              label="Published Date"
              variant="outlined"
              {...formik.getFieldProps('publishedDate')}
              error={Boolean(formik.errors.publishedDate && formik.touched.publishedDate)}
              helperText={formik.touched.publishedDate && formik.errors.publishedDate}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              {...formik.getFieldProps('description')}
              error={Boolean(formik.errors.description && formik.touched.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </FormControl>
          <Button variant="contained" type="submit">
            Save changes
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default UpdateBook
