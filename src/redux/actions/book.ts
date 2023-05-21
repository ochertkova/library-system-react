import { Omit } from '@reduxjs/toolkit/dist/tsHelpers'

import { AppDispatch, RootState } from '../store'
import books from '../../services/books'

export const BORROW_BOOK = 'BORROW_BOOK'
export const RETURN_BOOK = 'RETURN_BOOK'
export const ADD_BOOK = 'ADD_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST'
export const FETCH_BOOKS_RESPONSE = 'FETCH_BOOKS_RESPONSE'
export const FETCH_BOOK_BY_ID_REQUEST = 'FETCH_BOOK_BY_ID_REQUEST'
export const FETCH_BOOK_BY_ID_RESPONSE = 'FETCH_BOOK_BY_ID_RESPONSE'
export const SEARCH_BOOKS_REQUEST = 'SEARCH_BOOKS_REQUEST'
export const SEARCH_BOOKS_RESPONSE = 'SEARCH_BOOKS_RESPONSE'

export function handleBorrow(userId: number, bookId: number) {
  return {
    type: BORROW_BOOK,
    payload: { userId, bookId }
  }
}
export function handleReturn(userId: number, bookId: number) {
  return {
    type: RETURN_BOOK,
    payload: { userId, bookId }
  }
}
export function handleAdd(book: Omit<Book, 'id' | 'status'>) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const books = getState().books.books
    const id = books.slice(-1)[0].id + 1
    return dispatch(handleAddComplete({ ...book, id, status: 'AVAILABLE' }))
  }
}
export function handleAddComplete(book: Book) {
  return { type: ADD_BOOK, payload: book }
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
export function initBooks() {
  // action creator
  return (dispatch: AppDispatch, getState: () => RootState) => {
    //thunk function
    const { books } = getState()
    if (books.books.length === 0) {
      return dispatch(getAllBooks())
    }
    return Promise.resolve()
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
    return dispatch(fetchBooksResponse(data)) //call action creator, show results
  }
}

export const getBookById = (id: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    //thunk function
    dispatch(fetchBookByIdRequest()) // call action creator, start loading
    const response = await books.getById(id)
    const { data } = response
    console.log('got book by id', id, data)
    return dispatch(fetchBookByIdResponse(data)) //call action creator, show results
  }
}

export const searchBooks = (search: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(searchBooksRequest(search))
    const response = await books.searchBooks(search)
    const { data } = response
    return dispatch(searchBooksResponse(data))
  }
}

function jsonBookToBook(book: JsonBook): Book {
  return {
    ...book,
    publishedDate: book.publishedDate.slice(0, 4),
    borrowDate: book.borrowDate ? new Date(book.borrowDate) : undefined,
    returnByDate: book.returnByDate ? new Date(book.returnByDate) : undefined
  }
}
