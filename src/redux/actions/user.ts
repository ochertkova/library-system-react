import axios from 'axios'
import auth from '../../services/auth'
import { AppDispatch, RootState } from '../store'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE'
export const LOGIN_ERROR = 'LOGIN_RESPONSE'

export function handleLogin(payload: LoggedInUserInfo) {
  return {
    type: USER_LOGIN,
    payload
  }
}
export function handleLogout() {
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
      dispatch(loginResponse(response.data))
    } else {
      dispatch(loginError(response.data))
    }
  }
}
