import axios from "axios";

const apiClient = () => {
  const instance = axios.create({
    // baseURL: "http://localhost:8000/api/v1",
    baseURL: "https://api.exotix.id/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  instance.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return instance;
};
export default apiClient;
