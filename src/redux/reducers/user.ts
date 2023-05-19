import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_RESPONSE, USER_LOGOUT } from '../actions/user'

const initialState = {
  isAuthenticated: false,
  user: undefined,
  isLoggingIn: false,
  errorMessage: undefined
}
export default function userReducer(state: UserState = initialState, action: UserAction) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        isAuthenticated: false,
        isLoggingIn: true,
        user: undefined
      }
    }
    case LOGIN_RESPONSE: {
      return {
        isAuthenticated: true,
        isLoggingIn: false,
        user: action.payload
      }
    }
    case LOGIN_ERROR: {
      return {
        isAuthenticated: true,
        isLoggingIn: false,
        user: undefined,
        errorMessage: action.payload.message
      }
    }
    case USER_LOGOUT: {
      return initialState
    }
    default:
      return state
  }
}
