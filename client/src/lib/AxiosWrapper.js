import { logout } from "@/features/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

const axiosInstance = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
  timeout: 1000,
});

const handleSuccess = (response) => response;

const handleError = (error) => {
  if (error.response && error.response.status === 401) {
    dispatch(logout());
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(handleSuccess, handleError);

const GET = (url, config = {}) => axiosInstance.get(url, config);
const POST = (url, data, config = {}) => axiosInstance.post(url, data, config);
const PUT = (url, data, config = {}) => axiosInstance.put(url, data, config);
const DELETE = (url, config = {}) => axiosInstance.delete(url, config);

export default {
  GET,
  POST,
  PUT,
  DELETE,
};
