import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const config: AxiosRequestConfig = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  baseURL: 'http://localhost:4000',
  timeout: 10000,
  responseType: 'json',
  validateStatus: (status: number) => status >= 200 && status < 300,
  maxRedirects: 5,
};

const instance: AxiosInstance = axios.create(config);

// const handleResponse = (response: AxiosResponse) => {
//   console.log(response.data);
//   console.log(response.status);
//   console.log(response.statusText);
//   console.log(response.headers);
//   console.log(response.config);
// };

// const handleError = (error: AxiosError) => {
//   if (error.response) {
//     console.log(error.response.data);
//     console.log(error.response.status);
//     console.log(error.response.headers);
//   } else {
//     console.log(error.message);
//   }
// };

export default instance;
