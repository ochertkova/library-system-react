import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/v1/myaccount'

const myLoans = (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  return axios.get(`${baseUrl}/loans`, config).catch((err) => err.response)
}

export default {
  myLoans
}
