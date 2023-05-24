import { plusDays } from '../../utils'
import {
  ADD_BOOK_REQUEST,
  ADD_BOOK_RESPONSE,
  ADD_BOOK_ERROR,
  FETCH_BOOKS_RESPONSE,
  FETCH_BOOKS_REQUEST,
  FETCH_BOOK_BY_ID_REQUEST,
  FETCH_BOOK_BY_ID_RESPONSE,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_RESPONSE,
  UPDATE_BOOK_ERROR,
  SEARCH_BOOKS_REQUEST,
  SEARCH_BOOKS_RESPONSE,
  MY_LOANS_REQUEST,
  MY_LOANS_RESPONSE,
  BORROW_ERROR,
  REMOVE_BOOK_ERROR
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
    case REMOVE_BOOK_ERROR:
      return {
        ...state,
        errorMessage: action.payload.message
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
    case UPDATE_BOOK_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case UPDATE_BOOK_RESPONSE:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_BOOK_ERROR:
      return {
        ...state,
        errorMessage: action.payload.message
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
