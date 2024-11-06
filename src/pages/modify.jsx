import { useNavigate } from "react-router-dom";
import "../styles/modify.css";
import { useState } from "react";
import {
  isNicknameValid,
  isPasswordValid,
  isPasswordMatch,
} from "../services/validationService";
import { checkDuplicate } from "../services/apiService";

const Modify = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    modifyNick: "",
    modifyPw1: "",
    modifyPw2: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    pwMatchMessage: "",
    nickErrorMessage: "",
  });

  const [validStates, setValidStates] = useState({
    isNickValid: true,
    isPwValid: true,
  });

  const [duplicationNick, setDuplicationNick] = useState(true);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setError = (key, message) => {
    setErrorMessages((prev) => ({
      ...prev,
      [key]: message,
    }));
  };

  const setValid = (key, isValid) => {
    setValidStates((prev) => ({
      ...prev,
      [key]: isValid,
    }));
  };

  // 닉네임 중복 검사
  const checkDuplicateNick = async (field, value, errorKey, validKey) => {
    try {
      const message = await checkDuplicate(field, value);
      setDuplicationNick(false);
      setError(errorKey, message);
      setValid(validKey, !message.includes("사용 중인"));
    } catch (error) {
      setError("nickErrorMessage", "중복 확인 중 오류가 발생했습니다");
    }
  };

  const validateField = (validator, value, errorKey, validKey) => {
    const { isValid, errorMessage } = validator(value);
    setError(errorKey, errorMessage);
    setValidStates(validKey, isValid);
    return isValid;
  };

  const modifySubmit = (e) => {
    e.preventDefault();
    // 닉네임이나 비밀번호 필드 중 하나라도 입력된 경우에만 진행
    if (
      !formValues.modifyNick &&
      !formValues.modifyPw1 &&
      !formValues.modifyPw2
    ) {
      alert("수정할 정보가 없습니다");
      return;
    }

    // 닉네임 유효성 검사 함수
    const isNickOk = validateField(
      isNicknameValid,
      formValues.modifyNick,
      "nickErrorMessage",
      "isNickValid"
    );

    if (!isNickOk) return;

    if (duplicationNick) {
      setError("nickErrorMessage", "중복확인을 해주세요");
      return;
    }

    // 비밀번호 일치 여부 및 유효성 검사
    const { isValid: isPwMatchValid, errorMessage: pwMatchMessage } =
      isPasswordMatch(formValues.modifyPw1, formValues.modifyPw2);

    setError("pwMatchMessage", pwMatchMessage);
    if (!isPwMatchValid) return;

    const isPwOK = validateField(
      isPasswordValid,
      formValues.modifyPw1,
      "pwMatchMessage",
      "isPwValid"
    );

    if (!isPwOK) return;

    // 수정 결과에 따라 다른 메시지 표시
    const updatedFields = [];
    if (formValues.modifyNick) updatedFields.push("닉네임");
    if (formValues.modifyPw1) updatedFields.push("비밀번호");
    alert(`${updatedFields.join("과 ")} 수정이 완료 되었습니다.`);

    // navigate("/login");
  };

  return (
    <>
      <div className="modifyWrap">
        <header>
          <h1 onClick={() => navigate("/")}>Modify Information</h1>
        </header>
        <main>
          <h2>아이디</h2>
          <p>아이디</p>
          <form
            action="post"
            method="post"
            className="modifyForm"
            onSubmit={modifySubmit}
          >
            <div className="modifyNick">
              <h2>
                <label htmlFor="modifyNick">닉네임</label>
                <button
                  type="button"
                  className="duplicationBtn"
                  onClick={() =>
                    checkDuplicateNick(
                      "signupNick",
                      formValues.modifyNick,
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
                name="modifyNick"
                id="modifyNick"
                placeholder="수정 후 사용할 닉네임을 입력하세요"
                value={formValues.modifyNick}
                onChange={handleOnChange}
              />
              {errorMessages.nickErrorMessage && (
                <p className="warningCode">{errorMessages.nickErrorMessage}</p>
              )}
            </div>

            <div className="modifyPw1">
              <h2>
                <label htmlFor="modifyPw1">비밀번호</label>
              </h2>
              <input
                type="password"
                name="modifyPw1"
                id="modifyPw1"
                placeholder="수정 후 사용할 비밀번호를 입력하세요"
                value={formValues.modifyPw1}
                onChange={handleOnChange}
              />
            </div>

            <div className="modifyPw2">
              <h2>
                <label htmlFor="modifyPw2">비밀번호 재입력</label>
              </h2>
              <input
                type="password"
                name="modifyPw2"
                id="modifyPw2"
                placeholder="동일한 비밀번호를 입력하세요"
                onChange={handleOnChange}
                value={formValues.modifyPw2}
              />
              {errorMessages.pwMatchMessage && (
                <p className="warningCode">{errorMessages.pwMatchMessage}</p>
              )}
            </div>
            <div className="footer modifyInfo">
              <button type="submit" className="modifyConfirmBtn">
                수정 완료
              </button>
              <button className="deleteBtn">회원탈퇴</button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default Modify;
