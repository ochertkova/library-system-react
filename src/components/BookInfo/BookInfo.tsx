import { Box, Button, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import { handleBorrow, handleRemove, handleReturn } from '../../redux/actions/book'

function getFunctions(userState: UserState, book: Book, dispatch: AppDispatch) {
  const { isAuthenticated, user } = userState
  const onClickRemove = () => dispatch(handleRemove(book))

  if (!isAuthenticated || !user) return () => <></>

  if (user?.isAdmin) {
    return () => (
      <>
        {book.status === 'borrowed' && (
          <>
            <Box>
              <>Borrowed: {book?.borrowDate?.toDateString()}</>
            </Box>
            <Box>
              <>Borrower: {book?.borrowerId}</>
            </Box>
            <Box>
              <>Return by date: {book?.returnDate?.toDateString()}</>
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
  const onClickBorrow = () => dispatch(handleBorrow(user.id, book.id))
  const onClickReturn = () => dispatch(handleReturn(user.id, book.id))

  return () => (
    <>
      {book.status === 'available' && (
        <>
          <Button variant="contained" sx={{ marginTop: 2 }} onClick={onClickBorrow}>
            Borrow
          </Button>
        </>
      )}
      {book.status === 'borrowed' && book.borrowerId === user?.id && (
        <>
          <Box>
            <>Borrowed: {book?.borrowDate?.toDateString()}</>
          </Box>
          <Box>
            <>Return by date: {book?.returnDate?.toDateString()}</>
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
  const booksState = useSelector((state: RootState) => state.books)
  const dispatch: AppDispatch = useDispatch()
  const bookId = Number(useParams().id)

  const book = booksState.books.find((b: Book) => b.id === bookId)

  const ExtraFunctions = getFunctions(userState, book, dispatch)

  return (
    <Grid container direction="row" spacing={1} sx={{ p: 3 }}>
      <Grid item xs={1} md={1}></Grid>
      <Grid item xs={2} md={1}>
        <Box
          component="img"
          sx={{
            height: 150,
            marginTop: 3,
            maxHeight: { xs: 100, md: 120 },
            display: { xs: 'none', md: 'block' }
          }}
          alt="Book cover"
          src={book?.cover}
        />
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
              <Box>{book?.authors}</Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box>ISBN:{book?.ISBN}</Box>
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
