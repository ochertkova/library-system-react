import { Box, Button, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { handleBorrow, handleReturn } from '../../redux/actions/book'

function getFunctions(userState: UserState, book: Book) {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = userState
  if (!isAuthenticated) return () => <></>

  if (user?.isAdmin) {
    return () => (
      <>
        {book.status === 'borrowed' && (
          <>
            <Box>
              <>Borrowed: {book?.borrowDate.toDateString()}</>
            </Box>
            <Box>
              <>Borrower: {book?.borrowerId}</>
            </Box>
            <Box>
              <>Return by date: {book?.returnDate.toDateString()}</>
            </Box>
          </>
        )}
        <Button onClick={() => alert('moi')}>Test</Button>
      </>
    )
  }
  return () => (
    <>
      {book.status === 'available' && (
        <>
          <Button onClick={() => dispatch(handleBorrow(user.id, book.id))}>Borrow</Button>
        </>
      )}

      <>
        {book.status === 'borrowed' && book.borrowerId === user?.id && (
          <>
            <Button onClick={() => dispatch(handleReturn(user.id, book.id))}>Return</Button>
          </>
        )}
      </>
    </>
  )
}

const BookInfo = () => {
  const { id } = useSelector((state: RootState) => state.view.parameters)
  const userState = useSelector((state: RootState) => state.user)
  const booksState = useSelector((state: RootState) => state.books)

  const book = booksState.books.find((b: Book) => b.id === id)

  const ExtraFunctions = getFunctions(userState, book)

  return (
    <Typography>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={1} md={1}></Grid>
        <Grid item xs={2} md={1}>
          <Box
            component="img"
            sx={{
              height: 150,
              maxHeight: { xs: 100, md: 120 }
            }}
            alt="Book cover"
            src={book?.cover}
          />
        </Grid>
        <Grid item xs={7} md={8}>
          <Box>
            <Grid container direction="column" spacing={1}>
              <Grid item xs={12} md={12}>
                <Box>{book?.title}</Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box>{book?.authors}</Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box>ISBN:{book?.ISBN}</Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box>
                  <>
                    Publisher:
                    {book?.publisher}
                    {book?.publishedDate}
                  </>
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
    </Typography>
  )
}

export default BookInfo
