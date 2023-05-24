import axios from 'axios'
const baseUrl = 'https://ancient-scrubland-05068.herokuapp.com/api/v1/auth'

// const create = (newObject) => {
//   return axios.post(baseUrl, newObject)
// }

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject)
// }

const checkToken = (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  return axios.get(`${baseUrl}/userinfo`, config).catch((err) => err.response)
}

const login = (username: string, password: string) => {
  const payload = { username, password }
  return axios.post(`${baseUrl}/signin`, payload).catch((err) => err.response)
}

const signUp = (name: string, username: string, email: string, password: string) => {
  const payload = { name, username, email, password }
  return axios.post(`${baseUrl}/signup`, payload).catch((err) => err.response)
}

export default {
  login,
  checkToken,
  signUp
}
