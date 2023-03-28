import { Omit } from '@reduxjs/toolkit/dist/tsHelpers'
import { AppDispatch, RootState } from '../store'
import { openView } from './view'

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
    //in the future id assignment to the book will be implemented on the server
    dispatch(openView('catalog'))
    //const id = await fetch('/api/books', { method: 'POST' }, book)
    const books = getState().books.books
    const id = books.slice(-1)[0].id + 1
    return dispatch(handleAddComplete({ ...book, id, status: 'available' }))
  }
}

export function handleAddComplete(book: Book) {
  return { type: ADD_BOOK, payload: book }
}
export function handleUpdate(id: number) {
  return {
    type: UPDATE_BOOK,
    payload: { id }
  }
}
export function handleRemove(id: number) {
  return {
    type: REMOVE_BOOK,
    payload: { id }
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
