import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "./constant";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
