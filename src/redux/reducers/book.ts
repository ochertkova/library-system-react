import { ADD, BORROW, FETCH_BOOKS_RESPONSE, FETCH_BOOKS_START, RETURN } from '../actions/book'

const initialState = { isLoading: false, books: [] }
export default function bookReducer(state: BooksState = initialState, action: any) {
  switch (action.type) {
    case FETCH_BOOKS_START:
      return {
        isLoading: true,
        books: []
      }
    case FETCH_BOOKS_RESPONSE:
      return {
        isLoading: false,
        books: action.payload
      }
    case BORROW:
      return {
        isLoading: false,
        books: state.books.map((book) => {
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
      }
    case RETURN:
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
    case ADD:
      return state
    default:
      return state
  }
}
