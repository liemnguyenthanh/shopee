import axios, { AxiosRequestConfig } from 'axios';

//const API_URL = 'http://localhost:8080/'
const API_URL = 'https://liemnguyenthanh-psychic-space-umbrella-5546jpqqgrvh4pvw-8080.preview.app.github.dev/'
export const SOCKET_URL = 'https://liemnguyenthanh-psychic-space-umbrella-5546jpqqgrvh4pvw-1612.preview.app.github.dev/';

const axiosClient = axios.create({ baseURL: API_URL });
const config: AxiosRequestConfig = { withCredentials: true };

export {
  axiosClient,
  config
}