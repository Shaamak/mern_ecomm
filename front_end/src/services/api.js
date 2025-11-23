import axios from 'axios'

// The 'proxy' in package.json will automatically prefix
// this with 'http://localhost:5000' in development
const API_BASE_URL = '/api'

// Tell axios to send credentials (like cookies) with every request
axios.defaults.withCredentials = true

const api = axios.create({
  baseURL: API_BASE_URL,
})

export default api