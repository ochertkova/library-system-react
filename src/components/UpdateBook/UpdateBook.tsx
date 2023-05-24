import { Box, TextField, Button, Stack, FormControl, Typography } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { getBookById, handleUpdate } from '../../redux/actions/book'
import { AppDispatch, RootState } from '../../redux/store'
import { useEffect } from 'react'

const UpdateBook = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const { isLoading, activeBook: book } = useSelector((state: RootState) => state.books)
  const formik = useFormik({
    initialValues: {
      isbn: book?.isbn,
      title: book?.title,
      authors: book?.authors,
      publisher: book?.publisher,
      publishedDate: book?.publishedDate,
      description: book?.description,
      bookCoverLink: book?.bookCoverLink,
      category: book?.category
    },
    onSubmit: (values: UpdateBookFormValues) => {
      const updateWithStatus: UpdateBookFormValuesWithStatus = {
        ...values,
        status: book.status // this causes problem if other user is borrowing the book while I update
      }
      navigate(`/bookInfo/${book.id}`)
      return dispatch(handleUpdate(book.id, updateWithStatus))
    },
    validationSchema: Yup.object({
      isbn: Yup.string().min(6, 'Must be at least 6 characters').required('ISBN is required'),
      title: Yup.string().required('Title is required'),
      authors: Yup.string().required('Authors is required'),
      publisher: Yup.string().required('Publisher is required'),
      publishedDate: Yup.string().required('Published date is required'),
      description: Yup.string().required('Description is required'),
      bookCoverLink: Yup.string(),
      category: Yup.string()
    })
  })

  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Edit book
        </Typography>
      </Box>
      <Box padding={3} component="form" onSubmit={formik.handleSubmit}>
        <Stack spacing={2} sx={{ width: 0.75 }}>
          <FormControl>
            <TextField
              id="isbn"
              label="ISBN"
              variant="outlined"
              {...formik.getFieldProps('isbn')}
              error={Boolean(formik.errors.isbn && formik.touched.isbn)}
              helperText={formik.touched.isbn && formik.errors.isbn}
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
          <FormControl>
            <TextField
              id="bookCoverLink"
              label="Book cover link"
              variant="outlined"
              {...formik.getFieldProps('bookCoverLink')}
              error={Boolean(formik.errors.description && formik.touched.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </FormControl>
          <FormControl>
            <TextField
              id="category"
              label="Category"
              variant="outlined"
              {...formik.getFieldProps('category')}
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
