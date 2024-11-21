import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [validatedFields, setValidatedFields] = useState({
    memberId: false,
    nickname: false,
  });
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [successMessages, setSuccessMessages] = useState({});
  const navigate = useNavigate();

  // 유효성 검사
  const validate = () => {
    const newErrors = {};

    // memberId 유효성 검사
    if (!memberId) {
      newErrors.memberId = "아이디를 입력해주세요.";
    } else if (!/^[a-z0-9]{8,30}$/.test(memberId)) {
      newErrors.memberId =
        "아이디는 8~30자 이내의 영문 소문자와 숫자만 조합하여 입력해주세요.";
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

    // 이메일 유효성 검사
    if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    // 닉네임 유효성 검사
    if (!nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    } else if (!/^[a-zA-Z0-9가-힣]{2,20}$/.test(nickname)) {
      newErrors.nickname =
        "닉네임은 2~20자의 한글, 영문, 숫자만 조합하여 입력해주세요.";
    }

    // 에러 메시지 업데이트
    setErrors(newErrors);

    // 유효성 검사 결과 반환
    return Object.keys(newErrors).length === 0;
  };

  // 중복 확인 함수
  const handleDuplicationCheck = async (field, value) => {
    const newErrors = {};
    const newSuccessMessages = {};

    // 유효성 검사 실행
    if (field === "memberId" && !/^[a-z0-9]{8,30}$/.test(value)) {
      newErrors.memberId =
        "아이디는 8~30자 이내의 영문 소문자와 숫자만 조합하여 입력해주세요.";
    } else if (
      field === "nickname" &&
      !/^[a-zA-Z0-9가-힣]{2,20}$/.test(value)
    ) {
      newErrors.nickname =
        "닉네임은 2~20자의 한글, 영문, 숫자만 조합하여 입력해주세요.";
    } else {
      // 유효성 검사를 통과한 경우에만 중복 확인 요청
      try {
        const response = await duplicationCheck(field, value);
        if (response.data.isUnique) {
          newSuccessMessages[field] = `사용할 수 있는 ${
            field === "memberId" ? "아이디" : "닉네임"
          }입니다.`;
          setValidatedFields((prev) => ({ ...prev, [field]: true }));
        } else {
          newErrors[field] = `이미 사용 중인 ${
            field === "memberId" ? "아이디" : "닉네임"
          }입니다.`;
          setValidatedFields((prev) => ({ ...prev, [field]: false }));
        }
      } catch (error) {
        console.error("중복 확인 오류:", error);
      }
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    setSuccessMessages((prev) => ({ ...prev, ...newSuccessMessages }));
  };

  // 입력 값 변경 시 상태 초기화
  const handleInputChange = async (field, value) => {
    if (field === "memberId") {
      setMemberId(value.toLowerCase());
      setValidatedFields((prev) => ({ ...prev, memberId: false })); // 중복 검사 초기화
      setSuccessMessages((prev) => ({ ...prev, memberId: "" })); // 성공 메시지 초기화
    }

    if (field === "nickname") {
      setNickname(value);
      setValidatedFields((prev) => ({ ...prev, nickname: false })); // 중복 검사 초기화
      setSuccessMessages((prev) => ({ ...prev, nickname: "" })); // 성공 메시지 초기화
    }

    if (field === "email") {
      setEmail(value);
      setErrors((prev) => ({ ...prev, email: "" })); // 에러 초기화
      setSuccessMessages((prev) => ({ ...prev, email: "" })); // 성공 메시지 초기화

      // 이메일 형식이 유효한 경우에만 중복 확인 실행
      if (/\S+@\S+\.\S+/.test(value)) {
        try {
          const response = await duplicationCheck("email", value);
          if (response.data.isUnique) {
            setSuccessMessages((prev) => ({
              ...prev,
              email: "사용할 수 있는 이메일입니다.",
            }));
            setErrors((prev) => ({ ...prev, email: "" })); // 에러 초기화
          } else {
            setErrors((prev) => ({
              ...prev,
              email: "이미 사용 중인 이메일입니다.",
            }));
            setSuccessMessages((prev) => ({ ...prev, email: "" })); // 성공 메시지 초기화
          }
        } catch (error) {
          console.error("이메일 중복 확인 오류:", error);
          setErrors((prev) => ({
            ...prev,
            email: "중복 확인 중 문제가 발생했습니다. 다시 시도해주세요.",
          }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "올바른 이메일 형식을 입력해주세요.",
        }));
      }
    }

    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // 회원가입 요청
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 유효성 검사 실행
    const isFormValid = validate();

    // 중복 검사 여부 확인
    if (!validatedFields.memberId || !validatedFields.nickname) {
      alert("아이디와 닉네임 중복 검사를 완료해주세요.");
      return;
    }

    // 유효성 검사가 통과되지 않으면 중단
    if (!isFormValid) {
      return;
    }

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
          <p>
            회원가입이 성공적으로 완료되었습니다! 잠시 후 로그인 페이지로
            이동합니다.
          </p>
        ) : (
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-group">
              <div className="signup-input-wrap">
                <input
                  type="text"
                  value={memberId}
                  onChange={(e) =>
                    handleInputChange("memberId", e.target.value)
                  }
                  autoComplete="off"
                  placeholder="아이디"
                  className="option-duplicated"
                />
                <button
                  type="button"
                  onClick={() => handleDuplicationCheck("memberId", memberId)}
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
            </div>

            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => handleInputChange("password", e.target.value)}
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
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
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
                onChange={(e) => handleInputChange("email", e.target.value)}
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
                  onChange={(e) =>
                    handleInputChange("nickname", e.target.value)
                  }
                  autoComplete="off"
                  placeholder="닉네임"
                  className="option-duplicated"
                />
                <button
                  type="button"
                  onClick={() => handleDuplicationCheck("nickname", nickname)}
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
