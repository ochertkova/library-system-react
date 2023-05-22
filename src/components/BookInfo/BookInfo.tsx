import { Box, Button, Grid, Typography } from '@mui/material'
import BookIcon from '@mui/icons-material/Book'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import {
  fetchBookByIdRequest,
  getBookById,
  handleBorrow,
  handleRemove,
  handleReturn
} from '../../redux/actions/book'

function getFunctions(userState: UserState, book: Book, dispatch: AppDispatch) {
  const { isAuthenticated, loggedInUser: user } = userState
  const onClickRemove = () => dispatch(handleRemove(book))

  if (!isAuthenticated || !user) return () => <></>

  if (user?.role === 'ADMIN') {
    return () => (
      <>
        {book.status === 'BORROWED' && (
          <>
            <Box>
              <>Borrowed: {book?.borrowDate?.toDateString()}</>
            </Box>
            <Box>
              <>Borrower: {book?.borrowerId}</>
            </Box>
            <Box>
              <>Return by date: {book?.returnByDate?.toDateString()}</>
            </Box>
          </>
        )}
        <Link to={`/updateBook/${book.id}`} style={{ textDecoration: 'none' }}>
          <Button sx={{ marginTop: 2, marginRight: 2 }} variant="contained">
            Update Book
          </Button>
        </Link>
        <Link to="/catalog" style={{ textDecoration: 'none' }}>
          <Button sx={{ marginTop: 2 }} variant="contained" onClick={onClickRemove}>
            Remove Book
          </Button>
        </Link>
      </>
    )
  }
  // const onClickBorrow = () => dispatch(handleBorrow(user.id, book.id))
  // const onClickReturn = () => dispatch(handleReturn(user.id, book.id))

  const onClickBorrow = () => console.log('borrowing book', book.id)
  const onClickReturn = () => console.log('returning book', book.id)

  return () => (
    <>
      {book.status === 'AVAILABLE' && (
        <>
          <Button variant="contained" sx={{ marginTop: 2 }} onClick={onClickBorrow}>
            Borrow
          </Button>
        </>
      )}
      {book.status === 'BORROWED' && book.borrowerId === user?.id && (
        <>
          <Box>
            <>Borrowed: {book?.borrowDate?.toDateString()}</>
          </Box>
          <Box>
            <>Return by date: {book?.returnByDate?.toDateString()}</>
          </Box>
          <Button variant="contained" sx={{ marginTop: 2 }} onClick={onClickReturn}>
            Return
          </Button>
        </>
      )}
    </>
  )
}

const BookInfo = () => {
  const userState = useSelector((state: RootState) => state.user)
  const { id = '' } = useParams()
  const [isLoading, book] = useSelector((state: RootState) => [
    state.books.isLoading,
    state.books.activeBook
  ])
  const dispatch: AppDispatch = useDispatch()

  if (isLoading) {
    return <Typography>Loading book...</Typography>
  } else if (book === undefined) {
    dispatch(getBookById(id))
    return <Typography>Loading book...</Typography>
  }

  let cover = <BookIcon sx={{ fontSize: '80px', color: 'grey' }} />
  if (book.bookCoverLink) {
    cover = (
      <Box
        component="img"
        sx={{
          height: 150,
          marginTop: 3,
          maxHeight: { xs: 100, md: 120 },
          display: { xs: 'none', md: 'block' }
        }}
        alt="Book cover"
        src={book?.bookCoverLink}
      />
    )
  }

  const ExtraFunctions = getFunctions(userState, book, dispatch)

  return (
    <Grid container direction="row" spacing={1} sx={{ p: 3 }}>
      <Grid item xs={1} md={1}></Grid>
      <Grid item xs={2} md={1}>
        {cover}
      </Grid>
      <Grid item xs={7} md={8}>
        <Box>
          <Grid container direction="column" spacing={1}>
            <Grid item xs={12} md={12}>
              <Box
                component="img"
                sx={{
                  height: 150,
                  maxHeight: { xs: 100, md: 120 },
                  display: { xs: 'block', md: 'none' }
                }}
                alt="Book cover"
                src={book?.cover}
              />
              <Grid item xs={12} md={12}>
                <Box>
                  <h3>{book?.title}</h3>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box>{book?.authors.map((author: Author) => author.name)}</Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box>ISBN:{book?.isbn}</Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box>
                <>{`Publisher: ${book?.publisher}, ${book?.publishedDate}`}</>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box>{book?.description}</Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box>Status: {book?.status}</Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <ExtraFunctions />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={1} md={1}></Grid>
    </Grid>
  )
}

export default BookInfo
