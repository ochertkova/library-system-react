import auth from '../../services/auth'
import { AppDispatch, RootState } from '../store'
import { myLoans } from './book'

export const USER_LOGOUT = 'USER_LOGOUT'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_RESPONSE = 'SIGNUP_RESPONSE'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'

export function initUser() {
  // action creator
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    //thunk function
    const loggedUserJSON = window.localStorage.getItem('loggedInLibraryUser')
    if (loggedUserJSON) {
      const storedUserInfo = JSON.parse(loggedUserJSON)
      const userinfoResponse = await auth.checkToken(storedUserInfo.token)
      if (userinfoResponse.status === 200) {
        const { data } = userinfoResponse
        dispatch(loginResponse(data.body))
        return dispatch(myLoans())
      }
    }
    return Promise.resolve()
  }
}

export function handleLogout() {
  window.localStorage.removeItem('loggedInLibraryUser')
  return {
    type: USER_LOGOUT
  }
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}

export function loginResponse(payload: LoggedInUserInfo) {
  return {
    type: LOGIN_RESPONSE,
    payload
  }
}

export function loginError(payload: object) {
  return {
    type: LOGIN_ERROR,
    payload
  }
}

export function signupRequest() {
  return {
    type: SIGNUP_REQUEST
  }
}

export function signupResponse(payload: LoggedInUserInfo) {
  return {
    type: SIGNUP_RESPONSE,
    payload
  }
}

export function signupError(payload: object) {
  return {
    type: SIGNUP_ERROR,
    payload
  }
}
export function startLogin(username: string, password: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(loginRequest())
    const response = await auth.login(username, password)
    if (response.status == 200) {
      window.localStorage.setItem('loggedInLibraryUser', JSON.stringify(response.data))
      dispatch(loginResponse(response.data))
    } else {
      dispatch(loginError(response.data))
    }
  }
}

export function startSignUp(name: string, username: string, email: string, password: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(signupRequest())
    const signupresponse = await auth.signUp(name, username, email, password)
    if (signupresponse.status == 200) {
      dispatch(startLogin(username, password))
    } else {
      dispatch(signupError(signupresponse.data))
    }
  }
}
