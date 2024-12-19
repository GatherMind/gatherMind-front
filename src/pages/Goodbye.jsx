import React from "react";
import { useNavigate } from "react-router-dom";

const Goodbye = () => {
  const navigate = useNavigate();

  return (
    <div className="delete-option-container">
      <h1 className="delete-option-content">
        짧다면 짧은 시간, 길다면 긴 시간 Gather Mind와 함께해줘서 감사했습니다
        <br /> 😊 <br />
        다음에 다시 만나요!
      </h1>
      <button className="delete-option-button1" onClick={() => navigate("/")}>
        나가기
      </button>
    </div>
  );
};

export default Goodbye;
