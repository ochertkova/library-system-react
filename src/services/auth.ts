import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/v1/auth'

// const create = (newObject) => {
//   return axios.post(baseUrl, newObject)
// }

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject)
// }

const login = (username: string, password: string) => {
  const payload = { username, password }
  return axios.post(`${baseUrl}/signin`, payload).catch((err) => err.response)
}
export default {
  login
}
