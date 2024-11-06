import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

function SignUp() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [errors, setErrors] = useState({});
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // 중복 확인 상태
  const [isMemberIdUnique, setIsMemberIdUnique] = useState(false);
  const [isEmailUnique, setIsEmailUnique] = useState(false);
  const [isNicknameUnique, setIsNicknameUnique] = useState(false);

  // 유효성 검사 함수
  const validate = () => {
    const newErrors = {};

    // memberId 유효성 검사
    if (!memberId) {
      newErrors.memberId = "아이디는 필수 입력 항목입니다.";
    } else if (!/^[a-z0-9]{8,30}$/.test(memberId)) {
      newErrors.memberId =
        "아이디는 8~30자의 영문 소문자와 숫자만 사용할 수 있습니다.";
    } else if (!isMemberIdUnique) {
      newErrors.memberId = "이미 사용 중인 아이디입니다.";
    }

    // password 유효성 검사
    if (!password) {
      newErrors.password = "비밀번호는 필수 입력 항목입니다.";
    } else if (password.length < 8 || password.length > 255) {
      newErrors.password = "비밀번호는 8자 이상 255자 이하로 입력해야 합니다.";
    } else if (/\s/.test(password)) {
      newErrors.password = "비밀번호에는 공백을 사용할 수 없습니다.";
    }

    // 비밀번호 재확인 검사
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    // email 유효성 검사
    if (!email) {
      newErrors.email = "이메일은 필수 입력 항목입니다.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "유효한 이메일 주소를 입력해 주세요.";
    } else if (!isEmailUnique) {
      newErrors.email = "이미 사용 중인 이메일입니다.";
    }

    // nickname 유효성 검사
    if (!nickname) {
      newErrors.nickname = "닉네임은 필수 입력 항목입니다.";
    } else if (nickname.length < 2 || nickname.length > 20) {
      newErrors.nickname = "닉네임은 2자에서 20자 사이여야 합니다.";
    } else if (!isNicknameUnique) {
      newErrors.nickname = "이미 사용 중인 닉네임입니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 중복 검사 함수
  const checkUniqueness = async (field, value) => {
    try {
      const response = await axios.post(`/api/members/check-${field}`, {
        [field]: value,
      });
      if (field === "memberId") setIsMemberIdUnique(response.data.isUnique);
      if (field === "email") setIsEmailUnique(response.data.isUnique);
      if (field === "nickname") setIsNicknameUnique(response.data.isUnique);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${field} 중복 확인에 실패했습니다.`,
      }));
    }
  };

  // memberId를 소문자로 변환하는 함수
  const handleMemberIdChange = (e) => {
    const lowercaseValue = e.target.value.toLowerCase();
    setMemberId(lowercaseValue);
    checkUniqueness("memberId", lowercaseValue);
  };

  // 회원가입 요청 함수
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("/api/members/signup", {
        memberId,
        password,
        email,
        nickname,
      });
      setSignUpSuccess(true); // 성공 메시지 표시
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
          <p>회원가입이 성공적으로 완료되었습니다. 로그인 해주세요.</p>
        ) : (
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <label>아이디</label>
              <input
                type="text"
                value={memberId}
                onChange={handleMemberIdChange}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  checkUniqueness("email", e.target.value);
                }}
                autoComplete="off"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label>닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                  checkUniqueness("nickname", e.target.value);
                }}
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
}

export default SignUp;
