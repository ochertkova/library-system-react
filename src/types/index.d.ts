type User = {
  id: number
  name: string
  isAdmin: boolean
}

type UserState = {
  user?: User
  isAuthenticated: boolean
}

type ViewState = {
  activeView: string
  parameters: object
}

type BooksState = {
  isLoading: boolean
  books: Book[]
}

type Book = {
  id: number
  cover?: string
  ISBN: string
  title: string
  description: string
  publisher: string
  authors: string
  status: 'available' | 'borrowed'
  borrowerId?: number
  publishedDate: string
  borrowDate?: Date
  returnDate?: Date
}

type JsonBook = {
  id: number
  cover: string
  ISBN: string
  title: string
  description: string
  publisher: string
  authors: string
  status: string
  borrowerId?: number
  publishedDate: string
  borrowDate?: string
  returnDate?: string
}

type BookAction =
  | ReturnType<typeof fetchBooksResponse>
  | ReturnType<typeof fetchBooksRequest>
  | ReturnType<typeof handleRemove>
  | ReturnType<typeof handleUpdate>
  | ReturnType<typeof handleAdd>
  | ReturnType<typeof handleReturn>
  | ReturnType<typeof handleBorrow>
