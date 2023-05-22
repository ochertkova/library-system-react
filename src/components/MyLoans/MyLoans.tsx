import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import ContentTable from '../ContentTable/ContentTable'
import { myLoans } from '../../redux/actions/book'

export default function MyLoans() {
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, loans } = useSelector((state: RootState) => state.books)

  if (!isLoading && loans == undefined) {
    dispatch(myLoans())
    return <Typography>Loading books....</Typography>
  }

  if (isLoading) {
    return <Typography>Loading books....</Typography>
  }

  return (
    <>
      <Typography>You have {loans.length} books on loan</Typography>
      <ContentTable books={loans.map((e: Loan) => e.book)} />
    </>
  )
}
