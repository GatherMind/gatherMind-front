import axios from "axios";

// API 기본 URL 설정
const API_URL = process.env.REACT_APP_API_URL + "/oauth2";

if (!API_URL) {
  throw new Error("API URL is not defined.");
}

// OAuth2 로그인 성공 시 토큰 처리
export const processOAuth2LoginSuccess = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/login-success`, {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
      },
    });
    console.log("서버 응답 데이터:", response.data);
    return response.data; // 서버로부터 받은 사용자 데이터 반환
  } catch (error) {
    if (error.response) {
      console.error("서버 응답 오류:", error.response.data);
      throw new Error(
        `서버 오류: ${error.response.data.message || "알 수 없는 오류"}`
      );
    } else if (error.request) {
      console.error("서버 응답이 없습니다. 요청: ", error.request);
      throw new Error("서버 응답이 없습니다. 네트워크를 확인해 주세요.");
    } else {
      console.error("요청 설정 오류: ", error.message);
      throw new Error("요청 설정 중 오류가 발생했습니다.");
    }
  }
};
