import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const registerUser = (payload) => {
  return axios.post(`${API_URL}/register`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const loginUser = (payload) => {
  return axios.post(`${API_URL}/login`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getProfile = () => {
  const token = localStorage.getItem('token')

  return axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}