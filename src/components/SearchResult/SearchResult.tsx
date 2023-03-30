import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../redux/store'
import ContentTable from '../ContentTable/ContentTable'

function bookMatches(book: Book, searchText: string | undefined) {
  if (!searchText) return false
  const searchTextLowerCase = searchText.toLowerCase()

  if (book.title.toLowerCase().includes(searchTextLowerCase)) return true
  if (book.authors.toLowerCase().includes(searchTextLowerCase)) return true
  if (book.ISBN.includes(searchTextLowerCase)) return true
  if (book.description.includes(searchTextLowerCase)) return true
  if (book.publisher.includes(searchTextLowerCase)) return true

  return false
}

export default function SearchResult() {
  const { isLoading, books } = useSelector((state: RootState) => state.books)

  const { searchText } = useParams()
  if (isLoading) {
    return <Typography>Loading books....</Typography>
  }

  const myBooks = books.filter((book: Book) => bookMatches(book, searchText))
  return (
    <>
      <Typography>
        Search results for "{searchText}". {myBooks.length} books were found
      </Typography>
      <ContentTable books={myBooks} />
    </>
  )
}
