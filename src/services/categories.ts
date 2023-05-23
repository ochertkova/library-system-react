import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/v1/categories'

const getAll = () => {
  return axios.get(baseUrl)
}

const addOne = (payload: object, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios.post(baseUrl, payload, config).catch((err) => err.response)
}

export default {
  getAll,
  addOne
}
