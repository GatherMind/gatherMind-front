import React, { useState } from "react";
import { updateMember } from "../../services/MemberApiService";
import { duplicationCheck } from "../../services/ValidateApiService";
import "../../styles/NicknameEditModal.css";

const NicknameEditModal = ({ currentNickname, onBack, onClose }) => {
  const [newNickname, setNewNickname] = useState("");
  const [errors, setErrors] = useState({});
  const [isNicknameUnique, setIsNicknameUnique] = useState(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const validateNickname = (value) => {
    if (!value || value.length < 2 || value.length > 20) {
      return "닉네임은 2~20자의 한글, 영문, 숫자만 입력 가능합니다.";
    }
    return null;
  };

  const handleNicknameCheck = async () => {
    const error = validateNickname(newNickname);
    if (error) {
      setErrors({ nickname: error });
      return;
    }

    try {
      const response = await duplicationCheck("nickname", newNickname);
      if (response.data.isUnique) {
        setIsNicknameUnique(true);
        setErrors({});
      } else {
        setIsNicknameUnique(false);
        setErrors({ nickname: "이미 사용 중인 닉네임입니다." });
      }
    } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
    }
  };

  const handleNicknameSubmit = async () => {
    const error = validateNickname(newNickname);
    if (error) {
      setErrors({ nickname: error });
      return;
    }

    if (!isNicknameUnique) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    try {
      await updateMember("nickname", newNickname);
      setIsSubmitSuccess(true);
    } catch (error) {
      console.error("닉네임 변경 중 오류 발생:", error);
    }
  };

  return (
    <div className="nickname-edit-modal-container">
      {isSubmitSuccess ? (
        <div className="nickname-edit-modal-content">
          <h2>닉네임 변경 완료</h2>
          <p>
            <span>{newNickname}</span>님! 닉네임이 성공적으로 변경됐어요!
          </p>
          <button
            onClick={() => {
              onClose();
              window.location.reload(); 
            }}
          >
            확인
          </button>
        </div>
      ) : (
        <div className="nickname-edit-modal-content">
          <h2>닉네임 수정</h2>
          <label className="nickname-edit-modal-label">현재 닉네임</label>
          <p className="nick-modal-current-nick">{currentNickname}</p>
          <label className="nickname-edit-modal-label">변경할 닉네임</label>
          <input
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            placeholder="새 닉네임 입력"
            className="change-nickname-input"
          />
          <button
            onClick={handleNicknameCheck}
            className="nick-edit-modal-check-button"
          >
            중복 확인
          </button>
          {isNicknameUnique === true && (
            <p className="success-message">사용 가능한 닉네임입니다.</p>
          )}
          {errors.nickname && (
            <p className="error-message">{errors.nickname}</p>
          )}
          <div className="nick-modal-button-box">
            <button
              onClick={handleNicknameSubmit}
              className="nick-modal-change-button"
            >
              닉네임 변경
            </button>
            <button onClick={onClose} className="nick-modal-cancel-button">
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NicknameEditModal;
