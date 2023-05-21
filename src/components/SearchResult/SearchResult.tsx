import { Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import ContentTable from '../ContentTable/ContentTable'
import { searchBooks } from '../../redux/actions/book'

export default function SearchResult() {
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, searchText, searchResult } = useSelector((state: RootState) => state.books)
  const { searchTextParam = '' } = useParams()

  if (searchText !== searchTextParam) {
    // dispatch search if the prosess is not running (reducer state doesnt contain the search parameter)
    // this happens when the search page is reloaded with Ctrl+R, for instance
    dispatch(searchBooks(searchTextParam))
  }

  if (isLoading) {
    return <Typography>Loading books....</Typography>
  }
  return (
    <>
      <Typography>
        Search results for "{searchText}". {searchResult.length} books were found
      </Typography>
      <ContentTable books={searchResult} />
    </>
  )
}
