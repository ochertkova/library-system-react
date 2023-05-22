type User = {
  id: number
  name: string
  email: string
  password: string
  loans?: string
}

type LoggedInUserInfo = {
  token: string
  name: string
  role: 'USER' | 'ADMIN'
}

type UserState = {
  loggedInUser?: LoggedInUserInfo
  isAuthenticated: boolean
  isLoggingIn: boolean
  errorMessage?: string | undefined
}

type BooksState = {
  isLoading: boolean
  books: Book[]
  activeBook: Book | undefined
  searchText: string | undefined
  searchResult: Book[]
  loans: Loan[] | undefined
}

type Loan = {
  borrowDate: Date
  returnByDate: Date
  returnedDate?: Date
  book: Book
}

type JsonLoan = {
  borrowDate: string
  returnByDate: string
  returnedDate?: string
  book: JsonBook
}

type Book = {
  id: string
  bookCoverLink?: string
  isbn: string
  title: string
  description: string
  publisher: string
  authors: string
  status: 'AVAILABLE' | 'BORROWED'
  borrowerId?: number
  publishedDate: string
  borrowDate?: Date
  returnByDate?: Date
}

type JsonBook = {
  id: string
  bookCoverLink: string
  isbn: string
  title: string
  description: string
  publisher: string
  authors: string
  status: 'AVAILABLE' | 'BORROWED'
  borrowerId?: number
  publishedDate: string
  borrowDate?: string
  returnByDate?: string
}

type Author = {
  id: string
  name: string
}

type BookAction =
  | ReturnType<typeof fetchBooksResponse>
  | ReturnType<typeof fetchBooksRequest>
  | ReturnType<typeof handleRemove>
  | ReturnType<typeof handleUpdate>
  | ReturnType<typeof handleAdd>
  | ReturnType<typeof handleReturn>
  | ReturnType<typeof handleBorrow>

type UserAction =
  | ReturnType<typeof handleLogin>
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginResponse>
  | ReturnType<typeof loginError>
  | ReturnType<typeof startLogin>
