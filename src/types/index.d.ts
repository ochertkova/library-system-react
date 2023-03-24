type User = {
  id: number
  name: string
  isAdmin: boolean
}

type UserState = {
  user?: User
  isAuthenticated: boolean
}

type Book = {
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
