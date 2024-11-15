import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { createMember } from "./../services/MemberApiService";
import { validateField } from "./../services/ValidateApiService";

const SignUp = () => {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [errors, setErrors] = useState({});
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  const validateAndCheckUniqueness = async (field, value) => {
    const newErrors = {};

    if (!value) {
      newErrors[field] = `${field}을 입력해 주세요.`;
    } else if (field === "memberId" && !/^[a-z0-9]{8,50}$/.test(value)) {
      newErrors.memberId =
        "아이디는 8~50자의 영문 소문자와 숫자만 사용 가능합니다.";
    } else if (
      field === "nickname" &&
      (value.length < 2 || value.length > 20)
    ) {
      newErrors.nickname = "닉네임은 2자에서 20자 사이여야 합니다.";
    } else if (
      field === "password" &&
      (value.length < 8 || value.length > 255)
    ) {
      newErrors.password = "비밀번호는 8자 이상 255자 이하로 입력해야 합니다.";
    } else if (field === "password" && /\s/.test(value)) {
      newErrors.password = "비밀번호에는 공백을 사용할 수 없습니다.";
    } else if (
      field === "email" &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    ) {
      newErrors.email = "유효한 이메일 주소를 입력해 주세요.";
    } else {
      try {
        const response = await validateField(field, value);

        if (!response.data.isUnique)
          newErrors[field] = `이미 사용 중인 ${field}입니다.`;
      } catch (error) {
        console.error(`${field} 중복 확인 오류:`, error);
      }
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validate = async () => {
    const isMemberIdValid = await validateAndCheckUniqueness(
      "memberId",
      memberId
    );
    const isEmailValid = await validateAndCheckUniqueness("email", email);
    const isNicknameValid = await validateAndCheckUniqueness(
      "nickname",
      nickname
    );
    const newErrors = {};

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));

    return (
      isMemberIdValid &&
      isEmailValid &&
      isNicknameValid &&
      !newErrors.confirmPassword
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!(await validate())) return;

    try {
      await createMember(memberId, password, email, nickname);
      setSignUpSuccess(true);
      setTimeout(() => navigate("/login"), 3000); // 3초 후 로그인 페이지로 이동
    } catch (error) {
      setErrors({ form: "회원가입에 실패했습니다. 다시 시도해주세요." });
    }
  };

  return (
    <div className="signup-container">
      <header>
        <Header />
      </header>
      <main>
        <h2>회원가입</h2>
        {signUpSuccess ? (
          <p>회원가입이 성공적으로 완료되었습니다! 로그인 해주세요.</p>
        ) : (
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <label>아이디</label>
              <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value.toLowerCase())}
                onBlur={() => validateAndCheckUniqueness("memberId", memberId)}
                autoComplete="off"
              />
              {errors.memberId && (
                <p className="error-message">{errors.memberId}</p>
              )}
            </div>

            <div className="form-group">
              <label>비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <label>비밀번호 재확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="form-group">
              <label>이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateAndCheckUniqueness("email", email)}
                autoComplete="off"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onBlur={() => validateAndCheckUniqueness("nickname", nickname)}
                autoComplete="off"
              />
              {errors.nickname && (
                <p className="error-message">{errors.nickname}</p>
              )}
            </div>

            {errors.form && <p className="error-message">{errors.form}</p>}
            <button type="submit">회원가입</button>
          </form>
        )}
      </main>
    </div>
  );
};

export default SignUp;
