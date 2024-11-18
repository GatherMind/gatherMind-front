import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

const api = axios.create({
  baseURL: API_URL,
});

// 요청 인터셉터: Authorization 헤더에 JWT 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // JWT 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 Unauthorized 에러 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token"); // 토큰 삭제
      alert("Session expired. Please log in again.");
      window.location.href = "/login"; // 로그인 페이지로 리디렉션
    }
    return Promise.reject(error);
  }
);

export default api;
