import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 서버의 기본 URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 공백을 추가하여 Bearer와 토큰 사이 구분
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
