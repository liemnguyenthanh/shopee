import axios, { AxiosRequestConfig } from 'axios';

const API_URL = 'http://localhost:8080/'

const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };

export {
  axiosClient,
  config
}