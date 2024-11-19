import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";
import { loginMember } from "../services/MemberApiService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(null);

  const { login } = useAuth();

  // 유효성 검사 함수
  const validate = () => {
    const newErrors = {};

    // memberId 유효성 검사
    if (!memberId) {
      newErrors.memberId = "아이디를 입력해주세요.";
    } else if (!/^[a-z0-9]{8,30}$/.test(memberId)) {
      newErrors.memberId =
        "아이디는 8~30자의 영문 소문자와 숫자만 사용할 수 있습니다.";
    }

    // password 유효성 검사
    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
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
    const lowercaseValue = e.target.value.toLowerCase();
    setMemberId(lowercaseValue);
  };

  // 로그인 요청 함수
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const response = await loginMember(memberId, password);

      // localStorage.setItem("token", response.data.token); // 토큰 저장
      login(response.data.token);
      navigate("/main"); // 로그인 후 마이페이지로 이동
    } catch (error) {
      setLoginError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <main>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={memberId}
              onChange={handleMemberIdChange}
              autoComplete="off"
              placeholder="아이디"
              className="login-input"
            />
            {errors.memberId && (
              <p className="error-message">{errors.memberId}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              placeholder="비밀번호"
              className="login-input"
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          {loginError && <p className="login-confirm-error-message">{loginError}</p>}
          <button className="login-button" type="submit">
            로그인
          </button>
        </form>
      </main>
      <footer>
        <p>GATHER MIND가 처음이신가요?</p>
        <p>
          <span onClick={() => navigate("/signup")}>여기</span>를 눌러 다양한
          스터디를 둘러보세요!
        </p>
      </footer>
    </div>
  );
};

export default Login;
