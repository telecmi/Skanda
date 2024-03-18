import axios from 'axios';

const serverURL = 'http://localhost:4000'; // Your server URL

const axiosInstance = axios.create({
    baseURL: serverURL,
});

export default axiosInstance;