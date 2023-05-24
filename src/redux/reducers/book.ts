import { plusDays } from '../../utils'
import {
  ADD_BOOK_REQUEST,
  ADD_BOOK_RESPONSE,
  ADD_BOOK_ERROR,
  BORROW_BOOK,
  FETCH_BOOKS_RESPONSE,
  FETCH_BOOKS_REQUEST,
  FETCH_BOOK_BY_ID_REQUEST,
  FETCH_BOOK_BY_ID_RESPONSE,
  REMOVE_BOOK,
  RETURN_BOOK,
  UPDATE_BOOK,
  SEARCH_BOOKS_REQUEST,
  SEARCH_BOOKS_RESPONSE,
  MY_LOANS_REQUEST,
  MY_LOANS_RESPONSE,
  BORROW_ERROR
} from '../actions/book'

const initialState = {
  isLoading: false,
  books: [],
  activeBook: undefined,
  searchText: undefined,
  searchResult: [],
  loans: undefined
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
    case ADD_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case ADD_BOOK_RESPONSE:
      return {
        ...state,
        isLoading: false
      }
    case ADD_BOOK_ERROR:
      return {
        ...state,
        errorMessage: action.payload.message
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
    case MY_LOANS_REQUEST:
      return {
        ...state,
        isLoading: true,
        loans: undefined
      }
    case MY_LOANS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        loans: action.payload
      }
    case BORROW_ERROR:
      return {
        ...state,
        errorMessage: action.payload.message
      }
    default:
      return state
  }
}
