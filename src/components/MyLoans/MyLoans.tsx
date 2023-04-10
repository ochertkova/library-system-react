import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/store'
import ContentTable from '../ContentTable/ContentTable'

export default function MyLoans() {
  const { isLoading, books } = useSelector((state: RootState) => state.books)
  const { user } = useSelector((state: RootState) => state.user)

  if (isLoading) {
    return <Typography>Loading books....</Typography>
  }

  const myBooks = books.filter((book: Book) => book.borrowerId === user?.id)
  return (
    <>
      <Typography sx={{ m: 1 }}>You have {myBooks.length} books on loan</Typography>
      <ContentTable books={myBooks} />
    </>
  )
}
