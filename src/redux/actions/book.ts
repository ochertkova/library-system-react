import { Omit } from '@reduxjs/toolkit/dist/tsHelpers'

import { AppDispatch, RootState } from '../store'

export const BORROW_BOOK = 'BORROW_BOOK'
export const RETURN_BOOK = 'RETURN_BOOK'
export const ADD_BOOK = 'ADD_BOOK'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const FETCH_BOOKS_START = 'FETCH_BOOKS_START'
export const FETCH_BOOKS_RESPONSE = 'FETCH_BOOKS_RESPONSE'

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
    return dispatch(handleAddComplete({ ...book, id, status: 'available' }))
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
    type: FETCH_BOOKS_START
  }
}
export function fetchBooksResponse(books: JsonBook[]) {
  return {
    type: FETCH_BOOKS_RESPONSE,
    payload: books.map(jsonBookToBook)
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
    const response = await fetch('/data/books.json')
    const data = await response.json()
    console.log('got books', data)
    return dispatch(fetchBooksResponse(data)) //call action creator, show results
  }
}

function bookStatus(status: string): 'available' | 'borrowed' {
  return status === 'available' ? 'available' : 'borrowed'
}

function jsonBookToBook(book: JsonBook): Book {
  return {
    ...book,
    status: bookStatus(book.status),
    borrowDate: book.borrowDate ? new Date(book.borrowDate) : undefined,
    returnDate: book.returnDate ? new Date(book.returnDate) : undefined
  }
}
