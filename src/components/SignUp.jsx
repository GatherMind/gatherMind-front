import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

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

  const containsWhitespace = (value) => /\s|　/.test(value);

  const validateField = (field, value) => {
    const newErrors = {};
    const newSuccessMessages = {};

    if (!value) {
<<<<<<< HEAD
      newErrors[field] = `${field}을(를) 입력해 주세요.`;
=======
      newErrors[field] = `${field === "memberId" ? "아이디" : field === "nickname" ? "닉네임" : field === "email" ? "이메일" : "비밀번호"}을 입력해 주세요.`;
    } else if (containsWhitespace(value)) {
      newErrors[field] = `${field === "memberId" ? "아이디" : field === "nickname" ? "닉네임" : field === "email" ? "이메일" : "비밀번호"}에는 공백을 포함할 수 없습니다.`;
>>>>>>> 3b829b817cb9868d323040c00a1cbed515e3414d
    } else if (field === "memberId" && !/^[a-z0-9]{8,50}$/.test(value)) {
      newErrors.memberId =
        "아이디는 8~50자의 영문 소문자와 숫자만 사용 가능합니다.";
    } else if (
      field === "nickname" &&
      (value.length < 2 || value.length > 20)
    ) {
      newErrors.nickname = "닉네임은 2자에서 20자 사이여야 합니다.";
<<<<<<< HEAD
    } else {
      try {
        const response = await axios.post(`/api/members/check-${field}`, {
          [field]: value,
        });
        if (response.data.isUnique) {
          newSuccessMessages[field] = `사용할 수 있는 ${
            field === "memberId" ? "아이디" : "닉네임"
          }입니다.`;
          newErrors[field] = ""; // 오류 메시지 초기화
        } else {
          newErrors[field] = `이미 사용 중인 ${
            field === "memberId" ? "아이디" : "닉네임"
          }입니다.`;
          delete newSuccessMessages[field]; // 성공 메시지 초기화
        }
      } catch (error) {
        console.error(`${field} 중복 확인 오류:`, error);
      }
=======
    } else if (field === "password" && (value.length < 8 || value.length > 255)) {
      newErrors.password = "비밀번호는 8자 이상 255자 이하로 입력해야 합니다.";
    } else if (field === "email" && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      newErrors.email = "유효한 이메일 주소를 입력해 주세요.";
>>>>>>> 3b829b817cb9868d323040c00a1cbed515e3414d
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    setSuccessMessages((prev) => ({ ...prev, ...newSuccessMessages }));

    // 새로운 에러가 없는 경우 유효성 검증 통과
    return !newErrors[field];
  };

<<<<<<< HEAD
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

    if (!password) {
      newErrors.password = "비밀번호를 입력해 주세요.";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해 주세요.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));

    return (
      isMemberIdValid &&
      isEmailValid &&
      isNicknameValid &&
      !newErrors.confirmPassword
    );
=======
  const checkUniqueness = async (field, value) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${field === "memberId" ? "아이디" : "닉네임"}을 입력해 주세요.`,
      }));
      return;
    }

    if (!validateField(field, value)) return;

    try {
      const response = await axios.post(`/api/members/check-${field}`, {
        [field]: value,
      });
      const isUnique = response.data.isUnique;
      setErrors((prev) => ({
        ...prev,
        [field]: isUnique ? "" : `이미 사용 중인 ${field === "memberId" ? "아이디" : "닉네임"}입니다.`,
      }));
    } catch (error) {
      console.error(`${field} 중복 확인 오류:`, error);
      setErrors((prev) => ({
        ...prev,
        [field]: `${field === "memberId" ? "아이디" : "닉네임"} 중복 확인 중 오류가 발생했습니다.`,
      }));
    }
  };

  const validateForm = async () => {
    const isMemberIdValid = validateField("memberId", memberId);
    const isNicknameValid = validateField("nickname", nickname);
    const isEmailValid = validateField("email", email);
    const isPasswordValid = validateField("password", password);
    const passwordsMatch = password === confirmPassword;

    if (!passwordsMatch) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "비밀번호가 일치하지 않습니다.",
      }));
    }

    return isMemberIdValid && isNicknameValid && isEmailValid && isPasswordValid && passwordsMatch;
>>>>>>> 3b829b817cb9868d323040c00a1cbed515e3414d
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!(await validateForm())) return;

    try {
      await axios.post("/api/members/signup", {
        memberId,
        password,
        email,
        nickname,
      });
      setSignUpSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
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
              <label htmlFor="id">아이디</label>
              <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value.toLowerCase())}
                autoComplete="off"
                placeholder="아이디"
                name="id"
                id="id"
                className="signup-input"
              />
              <button
                type="button"
<<<<<<< HEAD
                onClick={() => validateAndCheckUniqueness("memberId", memberId)}
                className="signup-check-button"
              >
                중복확인
              </button>
              {errors.memberId && (
                <p className="error-message">{errors.memberId}</p>
              )}
              {successMessages.memberId && (
                <p className="success-message">{successMessages.memberId}</p>
              )}
=======
                onClick={() => checkUniqueness("memberId", memberId)}
                className="check-button"
              >
                아이디 중복 확인
              </button>
              {errors.memberId && <p className="error-message">{errors.memberId}</p>}
>>>>>>> 3b829b817cb9868d323040c00a1cbed515e3414d
            </div>

            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                placeholder="비밀번호"
                name="password"
                id="password"
                className="signup-input"
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 재입력</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
                placeholder="비밀번호 재입력"
                name="confirmPassword"
                id="confirmPassword"
                className="signup-input"
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                placeholder="이메일"
                name="email"
                id="email"
                className="signup-input"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="nickname">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                autoComplete="off"
                placeholder="닉네임"
                name="nickname"
                id="nickname"
                className="signup-input"
              />
              <button
                type="button"
<<<<<<< HEAD
                onClick={() => validateAndCheckUniqueness("nickname", nickname)}
                className="signup-check-button"
              >
                중복확인
              </button>
              {errors.nickname && (
                <p className="error-message">{errors.nickname}</p>
              )}
              {successMessages.nickname && (
                <p className="success-message">{successMessages.nickname}</p>
              )}
=======
                onClick={() => checkUniqueness("nickname", nickname)}
                className="check-button"
              >
                닉네임 중복 확인
              </button>
              {errors.nickname && <p className="error-message">{errors.nickname}</p>}
>>>>>>> 3b829b817cb9868d323040c00a1cbed515e3414d
            </div>

            {errors.form && <p className="error-message">{errors.form}</p>}
            <button className="signup-button" type="submit">회원가입</button>
          </form>
        )}
      </main>
    </div>
  );
};

export default SignUp;
