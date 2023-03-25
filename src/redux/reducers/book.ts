import { ADD, BORROW } from '../actions/book'
import booksData from '../../../public/data/books.json'

function bookStatus(status: string): 'available' | 'borrowed' {
  return status === 'available' ? 'available' : 'borrowed'
}

function withStatus(book: JsonBook): Book {
  return {
    ...book,
    status: bookStatus(book.status),
    publishedDate: new Date(book.publishedDate),
    borrowDate: new Date(book.borrowDate),
    returnDate: new Date(book.returnDate)
  }
}

const books: Book[] = booksData.map(withStatus)
const initialState = books
export default function bookReducer(state: BooksState = initialState, action: any) {
  switch (action.type) {
    case BORROW:
      return books.map((book) => {
        if (book.id === action.payload.bookId) {
          const borrowedBook = {
            ...book,
            status: 'borrowed',
            borrowerId: action.payload.userId,
            borrowDate: new Date(),
            returnDate: new Date()
          }
          return borrowedBook
        }
        return book
      })
    case ADD:
      return state
    default:
      return state
  }
}
