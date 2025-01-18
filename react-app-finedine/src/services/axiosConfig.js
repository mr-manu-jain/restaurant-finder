import axios from 'axios';

axios.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('msal.id.token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;