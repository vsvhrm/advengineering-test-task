import axios from 'axios';

const API_URL = 'http://localhost:3000';

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
  instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export default instance;
