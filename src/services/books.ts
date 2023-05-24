import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/v1/books'

const getAll = () => {
  return axios.get(baseUrl)
}

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

const addBook = (payload: NewBookJson, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios.post(baseUrl, payload, config).catch((err) => err.response)
}

const updateBook = (id: string, payload: UpdatedBookJson, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios.put(`${baseUrl}/${id}`, payload, config).catch((err) => err.response)
}

const removeBook = (id: string, token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  return axios.delete(`${baseUrl}/${id}`, config).catch((err) => err.response)
}

export default {
  getAll,
  getById,
  searchBooks,
  borrowBook,
  returnBook,
  addBook,
  updateBook,
  removeBook
}
