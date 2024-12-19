import { useNavigate } from "react-router-dom";
import "../styles/DeleteOptionContainer.css";

const Serious = () => {
  const navigate = useNavigate();

  return (
    <div className="delete-option-container">
      <h1 className="delete-option-content">
        Gather Mind에 대해 불편한 점이 있으신가요? 더 나은 서비스 이용을 위해
        문의해주세요!
      </h1>
      <button className="delete-option-button1" onClick={() => navigate("/")}>
        HOME
      </button>
      <button
        className="delete-option-button2"
        onClick={() => navigate("/mypage")}
      >
        MY PAGE
      </button>
    </div>
  );
};

export default Serious;
