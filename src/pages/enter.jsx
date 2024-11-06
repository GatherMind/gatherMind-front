import "../styles/enter.css";
import mainlogo from "../assets/mainlogo.png";
import { useNavigate } from "react-router-dom";

const Enter = () => {
  const navigate = useNavigate();

  // 로그인 페이지로 이동하는 코드
  const startBtn = () => {
    navigate("/login");
  };

  const toEnter = () => {
    navigate("/");
  };

  return (
    <>
      <div className="enterWrap">
        <header>
          <h1 onClick={toEnter}>Hurry Up</h1>
        </header>
        <img src={mainlogo} alt="mainlogo" />
        <main>
          <button onClick={startBtn}>시작하기</button>
        </main>
      </div>
    </>
  );
};

export default Enter;
