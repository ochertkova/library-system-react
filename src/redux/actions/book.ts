export const BORROW = 'BORROW'
export const RETURN = 'RETURN'
export const ADD = 'ADD'
export const UPDATE = 'UPDATE'
export const REMOVE = 'REMOVE'
export const FETCH_BOOKS_START = 'FETCH_BOOKS_START'
export const FETCH_BOOKS_RESPONSE = 'FETCH_BOOKS_RESPONSE'

export function handleBorrow(userId: number, bookId: number) {
  return {
    type: BORROW,
    payload: { userId, bookId }
  }
}

export function handleReturn(userId: number, bookId: number) {
  return {
    type: RETURN,
    payload: { userId, bookId }
  }
}

export function handleAdd(id: number) {
  return {
    type: ADD,
    payload: { id }
  }
}
export function handleUpdate(id: number) {
  return {
    type: UPDATE,
    payload: { id }
  }
}
export function handleRemove(id: number) {
  return {
    type: REMOVE,
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
  return (dispatch, getState) => {
    const { books } = getState()
    if (books.books.length === 0) {
      return dispatch(getAllBooks())
    }
    return Promise.resolve()
  }
}

export const getAllBooks = () => {
  //action creator
  return async (dispatch, getState) => {
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
    publishedDate: new Date(book.publishedDate),
    borrowDate: new Date(book.borrowDate),
    returnDate: new Date(book.returnDate)
  }
}
