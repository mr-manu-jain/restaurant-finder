import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

export default axiosInstance;