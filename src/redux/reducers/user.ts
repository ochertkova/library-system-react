import { USER_LOGIN, USER_LOGOUT } from '../actions/user'
import usersData from '../../../public/data/users.json'

const users: User[] = usersData

const initialState = { isAuthenticated: false, user: undefined }
export default function userReducer(state: UserState = initialState, action: BookAction) {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        isAuthenticated: true,
        user: users.find((user) => user.id === action.payload.id)
      }
    }
    case USER_LOGOUT: {
      return initialState
    }
    default:
      return state
  }
}
