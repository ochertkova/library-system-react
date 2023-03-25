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

type BooksState = Book[]

type Book = {
  id: number
  cover: string
  ISBN: number
  title: string
  description: string
  publisher: string
  authors: string
  status: 'available' | 'borrowed'
  borrowerId: number
  publishedDate: Date
  borrowDate: Date
  returnDate: Date
}

type JsonBook = {
  id: number
  cover: string
  ISBN: number
  title: string
  description: string
  publisher: string
  authors: string
  status: string
  borrowerId: number
  publishedDate: string
  borrowDate: string
  returnDate: string
}
