import React, { useState } from "react";
import { updateMember } from "../services/MemberApiService";
import "../styles/PasswordEditModal.css";

const PasswordEditModal = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validatePassword = (password, confirmPassword) => {
    const error = {};
    if (!password || password.length < 8 || password.length > 255) {
      error.newPassword = "비밀번호는 8자 이상 255자 이하로 입력해주세요.";
    } else if (/\s/.test(password)) {
      error.newPassword = "비밀번호에는 공백을 사용할 수 없습니다.";
    }

    if (password !== confirmPassword) {
      error.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    return error;
  };

  const handlePasswordSubmit = async () => {
    const error = validatePassword(newPassword, confirmPassword);
    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }

    try {
      await updateMember("password", newPassword);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      onClose();
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
      setErrors({ general: "비밀번호 변경 중 오류가 발생했습니다." });
    }
  };

  return (
    <div className="password-edit-modal-container">
      <div className="password-edit-modal-content">
        <h2>비밀번호 변경</h2>

        <label className="password-edit-modal-label">새 비밀번호</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setErrors({}); 
          }}
          placeholder="새 비밀번호 입력"
          className="change-password-input"
        />
        {errors.newPassword && (
          <p className="error-message">{errors.newPassword}</p>
        )}

        <label className="password-edit-modal-label">비밀번호 재확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrors({});
          }}
          placeholder="비밀번호 재입력"
          className="change-password-input"
        />
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword}</p>
        )}
        {errors.general && <p className="error-message">{errors.general}</p>}
        <div className="password-modal-button-box">
          <button
            onClick={handlePasswordSubmit}
            className="password-modal-confirm-button"
          >
            비밀번호 변경
          </button>
          <button onClick={onClose} className="password-modal-cancel-button">
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordEditModal;
