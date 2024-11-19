import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMember } from "./../services/MemberApiService";
import { duplicationCheck } from "./../services/ValidateApiService";
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

  const validateAndCheckUniqueness = async (field, value) => {
    const newErrors = {};
    const newSuccessMessages = {};

    if (!value) {
      // 필드별 맞춤 메시지 설정
      if (field === "memberId") {
        newErrors[field] = "아이디를 입력해 주세요.";
      } else if (field === "email") {
        newErrors[field] = "이메일을 입력해 주세요.";
      } else if (field === "nickname") {
        newErrors[field] = "닉네임을 입력해 주세요.";
      }
    } else if (field === "memberId" && !/^[a-z0-9]{8,50}$/.test(value)) {
      newErrors.memberId =
        "아이디는 8~50자의 영문 소문자와 숫자만 사용 가능합니다.";
    } else if (
      field === "nickname" &&
      (value.length < 2 || value.length > 20)
    ) {
      newErrors.nickname = "닉네임은 2자에서 20자 사이여야 합니다.";
    } else {
      try {
        const response = await duplicationCheck(field, value);

        if (response.data.isUnique) {
          newSuccessMessages[field] = `사용할 수 있는 ${
            field === "memberId"
              ? "아이디"
              : field === "email"
              ? "이메일"
              : "닉네임"
          }입니다.`;
          newErrors[field] = ""; // 오류 메시지 초기화
        } else {
          newErrors[field] = `이미 사용 중인 ${
            field === "memberId"
              ? "아이디"
              : field === "email"
              ? "이메일"
              : "닉네임"
          }입니다.`;
          delete newSuccessMessages[field]; // 성공 메시지 초기화
        }
      } catch (error) {
        console.error(
          `${
            field === "memberId"
              ? "아이디"
              : field === "email"
              ? "이메일"
              : "닉네임"
          } 중복 확인 오류:`,
          error
        );
      }
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    setSuccessMessages((prev) => ({ ...prev, ...newSuccessMessages }));

    // 새로운 에러가 없는 경우 유효성 검증 통과
    return !newErrors[field];
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!(await validate())) return;

    try {
      // await axios.post("/api/members/signup", {
      //   memberId,
      //   password,
      //   email,
      //   nickname,
      // });
      await createMember(memberId, password, email, nickname);
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
              <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value.toLowerCase())}
                autoComplete="off"
                placeholder="아이디"
                name="아이디"
                id="id"
                className="signup-input option-duplicated"
              />
              <button
                type="button"
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
            </div>

            <div className="form-group">
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
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                placeholder="이메일"
                name="이메일"
                id="email"
                className="signup-input"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                autoComplete="off"
                placeholder="닉네임"
                name="닉네임"
                id="nickname"
                className="signup-input option-duplicated"
              />
              <button
                type="button"
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
