import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // send cookies (for JWT in httpOnly)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
