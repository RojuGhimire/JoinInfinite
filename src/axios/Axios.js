import axios from "axios";
import { Base_Url } from "../constants/Base_Url";

export const axiosInstance = axios.create({
  baseURL: Base_Url,
  headers: {
    "Content-Type": "application/json",
  },
});


export const authorizationAxiosInstance = axios.create({
  baseURL: Base_Url,
});


authorizationAxiosInstance.interceptors.request.use((config) => {
  const auth_token = localStorage.getItem("access_token");

  if (auth_token) {
    config.headers["Authorization"] = `Bearer ${auth_token}`;
  }
  return config;
});


authorizationAxiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      try {
        const response = await axiosInstance.post("/users/refresh-token", {
          refresh_token: refreshToken,
        });
 
        const access_token = await response.data.access_token;
        localStorage.setItem("access_token", access_token);

        return authorizationAxiosInstance.request(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export const adminauthorizationAxiosInstance = axios.create({
  baseURL: Base_Url,
});


adminauthorizationAxiosInstance.interceptors.request.use((config) => {
  const auth_token = localStorage.getItem("access_token");

  if (auth_token) {
    config.headers["Authorization"] = `Bearer ${auth_token}`;
  }
  return config;
});


adminauthorizationAxiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      try {
        const response = await axiosInstance.post("/users/refresh-token", {
          refresh_token: refreshToken,
        });
 
        const access_token = await response.data.access_token;
        localStorage.setItem("access_token", access_token);

        return authorizationAxiosInstance.request(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);




