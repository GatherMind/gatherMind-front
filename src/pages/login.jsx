import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useState } from "react";
import { isIdValid, isPasswordValid } from "../services/validationService";

/**
 *  1.for => htmlFor
 * - React에서는 JSX 문법상 label 태그에 for 대신 htmlFor를 사용해야 합니다.
 * 이는 HTML 속성 for가 예약어이기 때문에 발생하는 문제로, htmlFor로 수정이 필요합니다.
 * 2. handleValidation 추가
 * - services폴더의 validationService.jsx 파일을 만들어서 validation을 관리
 *
 *
 */
const Login = () => {
  const navigate = useNavigate();

  // 메인 페이지로 이동하는 코드
  const toEnter = () => {
    navigate("/");
  };

  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [idErrorMessage, setIdErrorMessage] = useState("");
  const [pwMatchMessage, setPwMatchMessage] = useState("");

  const [isIdValidState, setIsIdValidState] = useState(true);
  const [isPwValidState, setIsPwValidState] = useState(true);

  // 로그인 폼 제출시 로직처리하는 코드
  const loginSubmit = (e) => {
    e.preventDefault();
    // 아이디 유효성 검사
    const { isValid: isIdOk, errorMessage: idError } = isIdValid(loginId);
    setIsIdValidState(isIdOk);
    setIdErrorMessage(idError);
    if (!isIdValidState) return;

    // 비밀번호 유효성 검사
    const { isValid: isPwOk, errorMessage: pwError } = isPasswordValid(loginPw);
    setIsPwValidState(isPwOk);
    setPwMatchMessage(pwError);
    if (!isPwValidState) return;

    navigate("/mypage");
  };

  // 회원가입 페이지로 이동하는 코드
  const toSignup = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="loginWrap" id="loginWrap">
        <header>
          <h1 onClick={toEnter}>Login</h1>
        </header>
        <main>
          <form
            action="post"
            method="post"
            className="loginForm"
            onSubmit={loginSubmit}
          >
            <div className="loginId">
              <h2>
                <label htmlFor="loginId">아이디</label>
              </h2>
              <input
                type="text"
                name="loginId"
                id="loginId"
                placeholder="아이디를 입력하세요"
                required
                autoComplete="off"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
              {idErrorMessage && (
                <p className="warningCode">{idErrorMessage}</p>
              )}
            </div>

            <div className="loginPw">
              <h2>
                <label htmlFor="loginPw">비밀번호</label>
              </h2>
              <input
                type="password"
                name="loginPw"
                id="loginPw"
                placeholder="비밀번호를 입력하세요"
                required
                autoComplete="off"
                value={loginPw}
                onChange={(e) => setLoginPw(e.target.value)}
              />
              {pwMatchMessage && (
                <p className="warningCode">{pwMatchMessage}</p>
              )}
            </div>
            {/* 리액트-라우터-돔을 사용해 마이페이지 또는 메인페이지로 넘겨야 함 */}
            <button type="submit" className="loginBtn">
              로그인
            </button>
          </form>
        </main>
        <footer>
          <div className="toSignup">
            <p>Hurry Up이 처음이신가요?</p>
            <p>
              <button onClick={toSignup} id="toSignup">
                여기
              </button>
              를 눌러 회원가입 하세요!
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Login;
