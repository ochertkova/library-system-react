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

const getById = (id: string) => {
  return axios.get(`${baseUrl}/${id}`)
}

const searchBooks = (search: string) => {
  return axios.get(baseUrl, { params: { search } })
}

const borrowBook = (id: string, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios.post(`${baseUrl}/${id}/borrow`, {}, config).catch((err) => err.response)
}
const returnBook = (id: string, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios.post(`${baseUrl}/${id}/return`, {}, config).catch((err) => err.response)
}

export default {
  getAll,
  getById,
  searchBooks,
  borrowBook,
  returnBook
}
