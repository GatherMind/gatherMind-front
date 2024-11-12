// src/components/Login.js
import React, { useState } from "react";
import api from "../api"; // 생성한 Axios 인스턴스 import
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);

  // 유효성 검사 함수
  const validate = () => {
    const newErrors = {};

    if (!memberId) {
      newErrors.memberId = "아이디는 필수 입력 항목입니다.";
    } else if (!/^[a-z0-9]{8,30}$/.test(memberId)) {
      newErrors.memberId = "아이디는 8~30자의 영문 소문자와 숫자만 사용할 수 있습니다.";
    }

    if (!password) {
      newErrors.password = "비밀번호는 필수 입력 항목입니다.";
    } else if (password.length < 8 || password.length > 255) {
      newErrors.password = "비밀번호는 8자 이상 255자 이하로 입력해야 합니다.";
    } else if (/\s/.test(password)) {
      newErrors.password = "비밀번호에는 공백을 사용할 수 없습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // memberId를 소문자로 변환하는 함수
  const handleMemberIdChange = (e) => {
    setMemberId(e.target.value.toLowerCase());
  };

  // 로그인 요청 함수
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(null); // 새로운 로그인 시도 시 이전 오류 메시지 초기화

    if (!validate()) return;

    try {
      const response = await api.post("/api/members/login", {
        memberId,
        password,
      });
      localStorage.setItem("token", response.data.token); // 토큰 저장
      navigate("/mypage"); // 로그인 후 마이페이지로 이동
    } catch (error) {
      console.error("로그인 실패:", error); // 디버깅용 콘솔 로그 추가

      // 오류 메시지 설정
      const message =
        error.response?.data?.message ||
        "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";
      setLoginError(message);
    }
  };

  return (
    <div className="login-container">
      <header>
        <Header />
      </header>
      <main>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>아이디</label>
            <input
              type="text"
              value={memberId}
              onChange={handleMemberIdChange}
              autoComplete="off"
            />
            {errors.memberId && <p className="error-message">{errors.memberId}</p>}
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          {loginError && <p className="error-message">{loginError}</p>}
          <button type="submit">로그인</button>
        </form>
      </main>
      <footer>
        <p>GATHER MIND가 처음이신가요?</p>
        <p>
          <button onClick={() => navigate("/signup")}>여기</button>를 눌러
          다양한 스터디를 둘러보세요!
        </p>
      </footer>
    </div>
  );
};

export default Login;
