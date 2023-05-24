import { Omit } from '@reduxjs/toolkit/dist/tsHelpers'

import { AppDispatch, RootState } from '../store'
import books from '../../services/books'
import myAccount from '../../services/myAccount'

export const BORROW_BOOK = 'BORROW_BOOK'
export const BORROW_ERROR = 'BORROW_ERROR'
export const RETURN_BOOK = 'RETURN_BOOK'
export const RETURN_ERROR = 'RETURN_ERROR'
export const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST'
export const ADD_BOOK_RESPONSE = 'ADD_BOOK_RESPONSE'
export const ADD_BOOK_ERROR = 'ADD_BOOK_ERROR'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST'
export const FETCH_BOOKS_RESPONSE = 'FETCH_BOOKS_RESPONSE'
export const FETCH_BOOK_BY_ID_REQUEST = 'FETCH_BOOK_BY_ID_REQUEST'
export const FETCH_BOOK_BY_ID_RESPONSE = 'FETCH_BOOK_BY_ID_RESPONSE'
export const SEARCH_BOOKS_REQUEST = 'SEARCH_BOOKS_REQUEST'
export const SEARCH_BOOKS_RESPONSE = 'SEARCH_BOOKS_RESPONSE'
export const MY_LOANS_REQUEST = 'MY_LOANS_REQUEST'
export const MY_LOANS_RESPONSE = 'MY_LOANS_RESPONSE'

export function handleBorrow(book: Book) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().user.loggedInUser
    const response = await books.borrowBook(book.id, token)
    if (response.status == 200) {
      dispatch(myLoans())
      dispatch(getBookById(book.id))
    } else {
      dispatch(borrowError(response.data))
    }
  }
}

export function handleReturn(book: Book) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { token } = getState().user.loggedInUser
    const response = await books.returnBook(book.id, token)
    if (response.status == 200) {
      dispatch(myLoans())
      dispatch(getBookById(book.id))
    } else {
      dispatch(returnError(response.data))
    }
  }
}
/*
export function handleAdd(book: Omit<Book, 'id' | 'status'>) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const books = getState().books.books
    const id = books.slice(-1)[0].id + 1
    return dispatch(handleAddComplete({ ...book, id, status: 'AVAILABLE' }))
  }
}
export function handleAddComplete(book: Book) {
  return { type: ADD_BOOK, payload: book }
} */

export function handleAdd(values: NewBookFormValues) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(addBookRequest())
    const { token } = getState().user.loggedInUser
    const payload: NewBookJson = {
      ...values,
      status: 'AVAILABLE',
      authors: values.authors.split(',').map((s) => s.trim())
    }

    const addBookresponse = await books.addBook(payload, token)
    if (addBookresponse.status == 200) {
      dispatch(addBookResponse())
      dispatch(getAllBooks())
    } else {
      dispatch(addBookError(addBookresponse.data))
    }
  }
}
export function handleUpdate(book: Book) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    return dispatch(handleUpdateComplete(book))
  }
}
export function handleUpdateComplete(book: Book) {
  return {
    type: UPDATE_BOOK,
    payload: book
  }
}
export function handleRemove(book: Book) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    return dispatch(handleRemoveComplete(book))
  }
}
export function handleRemoveComplete(book: Book) {
  return {
    type: REMOVE_BOOK,
    payload: book
  }
}
export function fetchBooksRequest() {
  return {
    type: FETCH_BOOKS_REQUEST
  }
}
export function fetchBooksResponse(books: JsonBook[]) {
  return {
    type: FETCH_BOOKS_RESPONSE,
    payload: books.map(jsonBookToBook)
  }
}

export function fetchBookByIdRequest() {
  return {
    type: FETCH_BOOK_BY_ID_REQUEST
  }
}
export function fetchBookByIdResponse(book: JsonBook) {
  return {
    type: FETCH_BOOK_BY_ID_RESPONSE,
    payload: jsonBookToBook(book)
  }
}

export function searchBooksRequest(searchText: string) {
  return {
    type: SEARCH_BOOKS_REQUEST,
    payload: searchText
  }
}
export function searchBooksResponse(searchResult: JsonBook[]) {
  return {
    type: SEARCH_BOOKS_RESPONSE,
    payload: searchResult.map(jsonBookToBook)
  }
}

export function myLoansRequest() {
  return {
    type: MY_LOANS_REQUEST
  }
}
export function myLoansResponse(jsonLoans: JsonLoan[]) {
  return {
    type: MY_LOANS_RESPONSE,
    payload: jsonLoans.map(jsonLoanToLoan)
  }
}
export function initBooks() {
  // action creator
  return (dispatch: AppDispatch, getState: () => RootState) => {
    //thunk function
    const { books } = getState()
    if (books.books.length === 0) {
      return dispatch(getAllBooks())
    }
  }
}
export const getAllBooks = () => {
  //action creator
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    //thunk function
    dispatch(fetchBooksRequest()) // call action creator, start loading
    const response = await books.getAll()
    const { data } = response
    console.log('got books', data)
    dispatch(fetchBooksResponse(data)) //call action creator, show results
  }
}

export const getBookById = (id: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    //thunk function
    dispatch(fetchBookByIdRequest()) // call action creator, start loading
    const response = await books.getById(id)
    const { data } = response
    console.log('got book by id', id, data)
    dispatch(fetchBookByIdResponse(data)) //call action creator, show results
  }
}

export const searchBooks = (search: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(searchBooksRequest(search))
    const response = await books.searchBooks(search)
    const { data } = response
    dispatch(searchBooksResponse(data))
  }
}

export const myLoans = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(myLoansRequest())
    const { token } = getState().user.loggedInUser
    const response = await myAccount.myLoans(token)
    const { data } = response
    dispatch(myLoansResponse(data))
  }
}

export function borrowError(payload: object) {
  return {
    type: BORROW_ERROR,
    payload
  }
}
export function returnError(payload: object) {
  return {
    type: RETURN_ERROR,
    payload
  }
}

export function addBookRequest() {
  return {
    type: ADD_BOOK_REQUEST
  }
}

export function addBookResponse() {
  return {
    type: ADD_BOOK_RESPONSE
  }
}
export function addBookError(payload: object) {
  return {
    type: ADD_BOOK_ERROR,
    payload
  }
}

function jsonBookToBook(book: JsonBook): Book {
  return {
    ...book,
    authors: book.authors.join(', '),
    publishedDate: book.publishedDate.slice(0, 4),
    borrowDate: book.borrowDate ? new Date(book.borrowDate) : undefined,
    returnByDate: book.returnByDate ? new Date(book.returnByDate) : undefined
  }
}
function jsonLoanToLoan(jsonLoan: JsonLoan): Loan {
  return {
    book: jsonBookToBook(jsonLoan.book),
    borrowDate: new Date(jsonLoan.borrowDate),
    returnByDate: new Date(jsonLoan.returnByDate),
    returnedDate: jsonLoan.returnedDate ? new Date(jsonLoan.returnedDate) : undefined
  }
}
