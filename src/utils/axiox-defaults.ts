import axios from 'axios';

// Setup a default axios instance with a base url and a timeout
const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
  headers: {
    'User-Agent': 'GE-profit-proxyification',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
