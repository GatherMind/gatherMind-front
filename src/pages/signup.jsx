import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import { useState } from "react";
import {
  isIdValid,
  isNicknameValid,
  isPasswordValid,
  isPhoneValid,
  isPasswordMatch,
  validateField,
} from "../services/validationService";
import { checkDuplicate } from "../services/apiService";

const SignUp = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    signupId: "",
    signupPw1: "",
    signupPw2: "",
    signupNick: "",
    signupPhone: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    idErrorMessage: "",
    pwMatchMessage: "",
    nickErrorMessage: "",
    phoneErrorMessage: "",
  });

  const [validStates, setValidStates] = useState({
    isIdValid: true,
    isPwValid: true,
    isNickValid: true,
    isPhoneValid: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const setError = (key, message) => {
    setErrorMessages((prev) => ({ ...prev, [key]: message }));
  };
  const setValid = (key, isValid) => {
    setValidStates((prev) => ({ ...prev, [key]: isValid }));
  };

  // 중복체크
  const handleCheckDuplicate = async (field, value, errorKey, validKey) => {
    try {
      const message = await checkDuplicate(field, value);
      setError(errorKey, message);
      setValid(validKey, !message.includes("사용 중인"));
    } catch (error) {
      setError(errorKey, "중복 확인에 실패했습니다. 다시 시도해 주세요");
    }
  };

  // 회원가입 폼 제출
  const signupSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사 및 필드 상태 업데이트
    const idValid = validateField(
      isIdValid,
      formValues.signupId,
      "idErrorMessage",
      "isIdValid"
    );
    const pwValid = validateField(
      isPasswordValid,
      formValues.signupPw1,
      "pwMatchMessage",
      "isPwValid"
    );
    const nickValid = validateField(
      isNicknameValid,
      formValues.signupNick,
      "nickErrorMessage",
      "isNickValid"
    );
    const phoneValid = validateField(
      isPhoneValid,
      formValues.signupPhone,
      "phoneErrorMessage",
      "isPhoneValid"
    );
    if (!pwValid) return;

    // 비밀번호 일치 여부 검사
    const { isValid: pwMatchValid, errorMessage: pwMatchError } =
      isPasswordMatch(formValues.signupPw1, formValues.signupPw2);
    setError("pwMatchMessage", pwMatchError);
    if (!pwMatchValid) return;

    // 모든 유효성 검사 통과 시 회원가입 완료
    if (idValid && pwValid && nickValid && phoneValid && pwMatchValid) {
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="signupWrap" id="signupTop">
        <header>
          <h1 onClick={() => navigate("/")}>Sign Up</h1>
        </header>
        <main>
          <form
            action="post"
            method="post"
            className="signupForm"
            onSubmit={signupSubmit}
          >
            <div className="inputInfo">
              <div className="signupId">
                <h2>
                  <label htmlFor="signupId">아이디</label>
                  <button
                    type="button"
                    className="duplicationBtn"
                    onClick={() =>
                      handleCheckDuplicate(
                        "signupId",
                        formValues.signupId,
                        "idErrorMessage",
                        "isIdValid"
                      )
                    }
                  >
                    중복확인
                  </button>
                </h2>
                <input
                  type="text"
                  name="signupId"
                  id="signupId"
                  placeholder="사용할 아이디를 입력하세요"
                  required
                  value={formValues.signupId}
                  onChange={handleInputChange}
                />
                {errorMessages.idErrorMessage && (
                  <p className="warningCode">{errorMessages.idErrorMessage}</p>
                )}
              </div>

              <div className="signupPw1">
                <h2>
                  <label htmlFor="signupPw1">비밀번호</label>
                </h2>
                <input
                  type="password"
                  name="signupPw1"
                  id="signupPw1"
                  placeholder="사용할 비밀번호를 입력하세요"
                  required
                  value={formValues.signupPw1}
                  onChange={handleInputChange}
                />
              </div>

              <div className="signupPw2">
                <h2>
                  <label htmlFor="signupPw2">비밀번호 재입력</label>
                </h2>
                <input
                  type="password"
                  name="signupPw2"
                  id="signupPw2"
                  placeholder="동일한 비밀번호를 입력하세요"
                  required
                  value={formValues.signupPw2}
                  onChange={handleInputChange}
                />
                {errorMessages.pwMatchMessage && (
                  <p className="warningCode">{errorMessages.pwMatchMessage}</p>
                )}
              </div>

              <div className="signupNick">
                <h2>
                  <label htmlFor="signupNick">닉네임</label>
                  <button
                    type="button"
                    className="duplicationBtn"
                    onClick={() =>
                      handleCheckDuplicate(
                        "signupNick",
                        formValues.signupNick,
                        "nickErrorMessage",
                        "isNickValid"
                      )
                    }
                  >
                    중복확인
                  </button>
                </h2>
                <input
                  type="text"
                  name="signupNick"
                  id="signupNick"
                  placeholder="사용할 닉네임을 입력하세요"
                  required
                  value={formValues.signupNick}
                  onChange={handleInputChange}
                />
                {errorMessages.nickErrorMessage && (
                  <p className="warningCode">
                    {errorMessages.nickErrorMessage}
                  </p>
                )}
              </div>

              <div className="signupPhone">
                <h2>
                  <label htmlFor="signupPhone">전화번호</label>
                </h2>
                <input
                  type="text"
                  name="signupPhone"
                  id="signupPhone"
                  placeholder="숫자 11자리만 허용됩니다."
                  required
                  value={formValues.signupPhone}
                  onChange={handleInputChange}
                />
                {errorMessages.phoneErrorMessage && (
                  <p className="warningCode">
                    {errorMessages.phoneErrorMessage}
                  </p>
                )}
              </div>
            </div>
            <button type="submit" className="signupBtn">
              회원가입
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default SignUp;
