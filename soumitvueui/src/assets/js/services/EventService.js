import axios from 'axios';
import config from "../../../config";
import NProgress from 'nprogress';


const apiUrl = config.apiUrl;
const apiClient = axios.create({
    baseURL : apiUrl,
    withCredentials: false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(config => {
    NProgress.start();
    return config;
})

apiClient.interceptors.response.use(response => {
    NProgress.done();
    return response;
})

export default apiClient