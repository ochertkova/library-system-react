import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/v1/books'

const getAll = () => {
  return axios.get(baseUrl)
}

// const create = (newObject) => {
//   return axios.post(baseUrl, newObject)
// }

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject)
// }

const getById = (id: String) => {
  return axios.get(`${baseUrl}/${id}`)
}

const searchBooks = (search: string) => {
  return axios.get(baseUrl, { params: { search } })
}

export default {
  getAll,
  getById,
  searchBooks
}
