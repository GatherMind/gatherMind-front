import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { createMember } from "./../services/MemberApiService";
import { duplicationCheck } from "./../services/ValidateApiService";
import "../styles/Signup.css";
import axios from "axios";

const SignUp = () => {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessages, setSuccessMessages] = useState({});
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  // 유효성 검사 함수
  const validate = async () => {
    const newErrors = {};
    const newSuccessMessages = {};

    // 아이디 유효성 검사 및 중복 확인
    if (!memberId) {
      newErrors.memberId = "아이디를 입력해주세요.";
    } else if (!/^[a-z0-9]{8,30}$/.test(memberId)) {
      newErrors.memberId =
        "아이디는 8~30자 이내의 영문 소문자와 숫자만 조합하여 입력해주세요.";
    } else {
      try {
        const response = await duplicationCheck("memberId", memberId);
        if (response.data.isUnique) {
          newSuccessMessages.memberId = "사용할 수 있는 아이디입니다.";
        } else {
          newErrors.memberId = "이미 사용 중인 아이디입니다.";
        }
      } catch (error) {
        console.error("아이디 중복 확인 오류:", error);
      }
    }

    // 이메일 유효성 검사 및 중복 확인
    if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else {
      try {
        const response = await duplicationCheck("email", email);
        if (response.data.isUnique) {
          newSuccessMessages.email = "사용할 수 있는 이메일입니다.";
        } else {
          newErrors.email = "이미 사용 중인 이메일입니다.";
        }
      } catch (error) {
        console.error("이메일 중복 확인 오류:", error);
      }
    }

    // 닉네임 유효성 검사 및 중복 확인
    if (!nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    } else if (nickname.length < 2 || nickname.length > 20) {
      newErrors.nickname = "닉네임은 2자에서 20자 사이여야 합니다.";
    } else {
      try {
        const response = await duplicationCheck("nickname", nickname);
        if (response.data.isUnique) {
          newSuccessMessages.nickname = "사용할 수 있는 닉네임입니다.";
        } else {
          newErrors.nickname = "이미 사용 중인 닉네임입니다.";
        }
      } catch (error) {
        console.error("닉네임 중복 확인 오류:", error);
      }
    }

    // 비밀번호 유효성 검사
    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (password.length < 8 || password.length > 255) {
      newErrors.password = "비밀번호는 8자 이상 255자 이하로 입력해주세요.";
    } else if (/\s/.test(password)) {
      newErrors.password = "비밀번호에는 공백을 사용할 수 없습니다.";
    }

    // 비밀번호 확인
    if (!confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    setSuccessMessages(newSuccessMessages);

    return Object.keys(newErrors).length === 0;
  };

  // memberId를 소문자로 변환하는 함수
  const handleMemberIdChange = (e) => {
    const lowercaseValue = e.target.value.toLowerCase();
    setMemberId(lowercaseValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!(await validate())) return;

    try {
      await axios.post("/api/member/signup", {
        memberId,
        password,
        email,
        nickname,
      });
      setSignUpSuccess(true);
      setTimeout(() => navigate("/login"), 3000); // 3초 후 로그인 페이지로 이동
    } catch (error) {
      setErrors({ form: "회원가입에 실패했습니다. 다시 시도해주세요." });
    }
  };

  return (
    <div className="signup-container">
      <main>
        <h2>회원가입</h2>
        {signUpSuccess ? (
          <p>회원가입이 성공적으로 완료되었습니다! 로그인 해주세요.</p>
        ) : (
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <div className="signup-input-wrap">
                <input
                  type="text"
                  value={memberId}
                  onChange={handleMemberIdChange}
                  autoComplete="off"
                  placeholder="아이디"
                  className="option-duplicated"
                />
                {errors.memberId && (
                  <p className="error-message">{errors.memberId}</p>
                )}
                {successMessages.memberId && (
                  <p className="success-message">{successMessages.memberId}</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                placeholder="비밀번호"
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
                placeholder="비밀번호 재입력"
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                placeholder="이메일"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
              {successMessages.email && (
                <p className="success-message">{successMessages.email}</p>
              )}
            </div>

            <div className="form-group">
              <div className="signup-input-wrap">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  autoComplete="off"
                  placeholder="닉네임"
                  className="option-duplicated"
                />
                {errors.nickname && (
                  <p className="error-message">{errors.nickname}</p>
                )}
                {successMessages.nickname && (
                  <p className="success-message">{successMessages.nickname}</p>
                )}
              </div>
            </div>

            {errors.form && <p className="error-message">{errors.form}</p>}
            <button className="signup-button" type="submit">
              회원가입
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default SignUp;
