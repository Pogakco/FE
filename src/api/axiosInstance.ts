import axios, {AxiosRequestConfig} from 'axios';
const axiosInstance = axios.create({
    baseURL: "",
    timeout: 10000,
    headers : {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
      return Promise.reject(error);
    }
);

export default axiosInstance
