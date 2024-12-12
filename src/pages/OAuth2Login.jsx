import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { processOAuth2LoginSuccess } from "../services/OAuth2ApiService"; // 백엔드 검증 함수
import { loginMember } from "../services/AuthApiService"; // 토큰 저장 함수

const OAuth2Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    console.log("Extracted Token:", token); // 토큰 확인용

    if (token) {
      // 토큰 저장 및 백엔드 추가 처리
      processOAuth2LoginSuccess(token)
        .then((response) => {
          console.log("로그인 성공:", response);

          // localStorage에 토큰 저장
          loginMember(token);

          // 메인 페이지 또는 마이페이지로 이동
          navigate("/mypage");
        })
        .catch((error) => {
          console.error("OAuth2 로그인 처리 실패:", error);
          navigate("/login");
        });
    } else {
      console.error("토큰이 없습니다.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>로그인 처리 중...</h2>
      <p>잠시만 기다려 주세요...</p>
    </div>
  );
};

export default OAuth2Login;
