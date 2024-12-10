import { getMemberByToken } from "../services/MemberApiService";

export default async function checkLoginStatus() {
  try {
    const response = await getMemberByToken(); // 토큰으로 로그인된 사용자 정보 확인
    if (response && response.data) {
      return response.data; // 로그인된 상태
    }
    return null; // 로그인되지 않은 상태
  } catch (error) {
    console.error("로그인 상태 확인 실패:", error.message);
    return null; // 로그인되지 않은 상태
  }
}
