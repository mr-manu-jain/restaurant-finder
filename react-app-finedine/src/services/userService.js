import axios from './axiosConfig';

const API_BASE_URL = 'http://springboot-app-finedine-dev.us-east-1.elasticbeanstalk.com';

const userService = {
  checkAndCreateUser: (userData) => axios.post(`${API_BASE_URL}/api/users/checkAndCreateUser`, userData),
};

export default userService;