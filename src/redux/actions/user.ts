export const USER_LOGIN = 'USER_LOG'
export const USER_LOGOUT = 'USER_LOGOUT'

export function handleLogin(id: number) {
  return {
    type: USER_LOGIN,
    payload: { id }
  }
}
export function handleLogout() {
  return {
    type: USER_LOGOUT
  }
}
