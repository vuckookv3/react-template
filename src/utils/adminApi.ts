import axios from 'axios';

export const adminApi = axios.create({
    baseURL: '/api/admin',
});

adminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
