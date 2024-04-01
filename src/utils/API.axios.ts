import axios from 'axios';

export const API = axios.create({
    baseURL: '/api/admin',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('adminToken');
            if (window.location.pathname !== '/admin/login') {
                window.location.pathname = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);
