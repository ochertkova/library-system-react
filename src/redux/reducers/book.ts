import { plusDays } from '../../utils'
import {
  ADD_BOOK,
  BORROW_BOOK,
  FETCH_BOOKS_RESPONSE,
  FETCH_BOOKS_START,
  REMOVE_BOOK,
  RETURN_BOOK,
  UPDATE_BOOK
} from '../actions/book'

const initialState = { isLoading: false, books: [] }
export default function bookReducer(state: BooksState = initialState, action: BookAction) {
  switch (action.type) {
    case FETCH_BOOKS_START:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_BOOKS_RESPONSE:
      return {
        isLoading: false,
        books: action.payload
      }
    case BORROW_BOOK:
      return {
        isLoading: false,
        books: state.books.map((book) => {
          if (book.id === action.payload.bookId) {
            const borrowDate = new Date()
            const borrowedBook = {
              ...book,
              status: 'borrowed',
              borrowerId: action.payload.userId,
              borrowDate,
              returnDate: plusDays(borrowDate, 14)
            }
            return borrowedBook
          }
          return book
        })
      }
    case RETURN_BOOK:
      return {
        isLoading: false,
        books: state.books.map((book) => {
          if (book.id === action.payload.bookId) {
            const returnedBook = {
              ...book,
              status: 'available',
              borrowerId: null,
              borrowDate: null,
              returnDate: null
            }
            return returnedBook
          }
          return book
        })
      }
    case REMOVE_BOOK:
      const updatedRemoveBooks = state.books.filter((book) => {
        return book.id !== action.payload.id
      })
      console.log(updatedRemoveBooks)
      return {
        isLoading: false,
        books: updatedRemoveBooks
      }
    case ADD_BOOK:
      return {
        isLoading: false,
        books: [action.payload, ...state.books]
      }
    case UPDATE_BOOK:
      const updatedBooks = state.books.map((book) => {
        if (book.id === action.payload.id) {
          return action.payload
        }
        return book
      })
      return {
        isLoading: false,
        books: updatedBooks
      }
    default:
      return state
  }
}
