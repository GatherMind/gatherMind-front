import axios from "axios";

const fetchData = async () => {
  try {
    const token = "your_jwt_token_here"; // 로그인 시 받은 JWT 토큰
    const response = await axios.get("/api/member/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error("데이터 요청 중 오류:", error);
  }
};
