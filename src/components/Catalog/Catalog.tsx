import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/store'
import ContentTable from '../ContentTable/ContentTable'

export default function Catalog() {
  const { isLoading, books } = useSelector((state: RootState) => state.books)
  if (isLoading) {
    return <Typography>Loading books....</Typography>
  }
  return <ContentTable books={books} />
}
