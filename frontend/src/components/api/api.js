import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/', // Adjust the base URL to match your backend server
  headers: {
    'Content-Type': 'application/json',
  },
})


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api
