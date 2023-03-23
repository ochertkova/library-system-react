type User = {
  id: number
  name: string
  isAdmin: boolean
}

type UserState = {
  user?: User
  isAuthenticated: boolean
}
