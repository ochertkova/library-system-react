import auth from '../../services/auth'
import { AppDispatch, RootState } from '../store'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE'
export const LOGIN_ERROR = 'LOGIN_ERROR'

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
        return dispatch(loginResponse(data.body))
      }
    }
    return Promise.resolve()
  }
}

/*
export function handleLogin(payload: LoggedInUserInfo) {
  return {
    type: USER_LOGIN,
    payload
  }
} */
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
