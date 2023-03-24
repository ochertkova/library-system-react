import { Box, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import bookData from '../../../public/data/books.json'
import { RootState } from '../../redux/store'

const books = bookData

const BookInfo = () => {
  const { id } = useSelector((state: RootState) => state.view.parameters)

  const book = books.find((b) => b.id === id)

  return (
    <Grid container direction="row" spacing={1}>
      <Grid item xs={1} md={1}>
        <Box>xs=6 md=8</Box>
      </Grid>
      {book?.title}
      <Grid item xs={2} md={1}>
        <Box>xs=6 md=4</Box>
      </Grid>
      <Grid item xs={7} md={8}>
        <Box>
          <Grid container direction="column">
            <Grid item xs={6} md={6}>
              <Box>{book?.title}</Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box>xs=6 md=8</Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={1} md={1}>
        <Box>xs=6 md=8</Box>
      </Grid>
    </Grid>
  )
}

export default BookInfo
