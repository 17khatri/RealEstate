import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const getUsers = () => {
    const token = localStorage.getItem('token')
    return axios.get(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};