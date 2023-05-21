import { plusDays } from '../../utils'
import {
  ADD_BOOK,
  BORROW_BOOK,
  FETCH_BOOKS_RESPONSE,
  FETCH_BOOKS_REQUEST,
  FETCH_BOOK_BY_ID_REQUEST,
  FETCH_BOOK_BY_ID_RESPONSE,
  REMOVE_BOOK,
  RETURN_BOOK,
  UPDATE_BOOK,
  SEARCH_BOOKS_REQUEST,
  SEARCH_BOOKS_RESPONSE
} from '../actions/book'

const initialState = {
  isLoading: false,
  books: [],
  activeBook: undefined,
  searchText: undefined,
  searchResult: []
}
export default function bookReducer(state: BooksState = initialState, action: BookAction) {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_BOOKS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        books: action.payload
      }
    case FETCH_BOOK_BY_ID_REQUEST:
      return {
        ...state,
        activeBook: undefined,
        isLoading: true
      }
    case FETCH_BOOK_BY_ID_RESPONSE:
      return {
        ...state,
        isLoading: false,
        activeBook: action.payload
      }
    case BORROW_BOOK:
      return {
        ...state,
        isLoading: false,
        books: state.books.map((book) => {
          if (book.id === action.payload.bookId) {
            const borrowDate = new Date()
            const borrowedBook = {
              ...book,
              status: 'BORROWED',
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
        ...state,
        isLoading: false,
        books: state.books.map((book) => {
          if (book.id === action.payload.bookId) {
            const returnedBook = {
              ...book,
              status: 'AVAILABLE',
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
        ...state,
        isLoading: false,
        books: updatedRemoveBooks
      }
    case ADD_BOOK:
      return {
        ...state,
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
        ...state,
        isLoading: false,
        books: updatedBooks
      }
    case SEARCH_BOOKS_REQUEST:
      return {
        ...state,
        isLoading: true,
        searchResult: [],
        searchText: action.payload
      }
    case SEARCH_BOOKS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        searchResult: action.payload
      }
    default:
      return state
  }
}
