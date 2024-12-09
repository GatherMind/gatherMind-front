import React, { useState } from "react";
import "../styles/PasswordVerifyModal.css";

const PasswordVerifyModal = ({ onVerify, onClose }) => {
  const [password, setPassword] = useState("");

  const handleVerifyClick = (e) => {
    e.preventDefault();
    if (!password || password.trim() === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    onVerify(password); // 상위 컴포넌트에 비밀번호 전달
  };

  return (
    <div className="passwordVerifyModal-container">
      <div className="password-edit-box">
        <button className="modal-back-button" onClick={onClose}>
          X
        </button>
        <h2>현재 비밀번호 확인</h2>
        <input
          type="password"
          placeholder="현재 비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="modal-edit-profile-modify"
          onClick={handleVerifyClick}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PasswordVerifyModal;
