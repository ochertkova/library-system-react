import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
  USER_LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_RESPONSE,
  SIGNUP_ERROR
} from '../actions/user'

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
        ...state,
        isAuthenticated: false,
        isLoggingIn: true,
        user: undefined
      }
    }
    case LOGIN_RESPONSE: {
      return {
        ...state,
        isAuthenticated: true,
        isLoggingIn: false,
        user: action.payload
      }
    }
    case LOGIN_ERROR: {
      return {
        isAuthenticated: false,
        isLoggingIn: false,
        user: undefined,
        errorMessage: action.payload.message
      }
    }
    case USER_LOGOUT: {
      return initialState
    }
    case SIGNUP_ERROR: {
      return {
        ...state,
        errorMessage: action.payload.message
      }
    }
    default:
      return state
  }
}
