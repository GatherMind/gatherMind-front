import React, { useState } from "react";
import { updateMember } from "../services/MemberApiService";
import { duplicationCheck } from "../services/ValidateApiService";

const NicknameEditModal = ({ currentNickname, onBack, onClose }) => {
  const [newNickname, setNewNickname] = useState("");
  const [errors, setErrors] = useState({});
  const [isNicknameUnique, setIsNicknameUnique] = useState(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false); // 닉네임 변경 성공 여부

  // 닉네임 검증
  const validateNickname = (value) => {
    if (!value || value.length < 2 || value.length > 20) {
      return "닉네임은 2~20자의 한글, 영문, 숫자만 입력 가능합니다.";
    }
    return null;
  };

  // 닉네임 중복 확인
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

  // 닉네임 제출
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
      setIsSubmitSuccess(true); // 닉네임 변경 성공 표시
    } catch (error) {
      console.error("닉네임 변경 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <button className="modal-back-button" onClick={onBack}>
        X
      </button>
      {isSubmitSuccess ? (
        // 닉네임 변경 성공 모달
        <div>
          <h2>닉네임 변경 완료</h2>
          <p className="modal-complete-message">
            <span className="modal-new-nickname">{newNickname}</span>님!
            닉네임이 성공적으로 변경됐어요!
          </p>
          <button
            className="modal-edit-profile-modify"
            onClick={() => {
              onClose();
              window.location.reload(); // 모달 닫기 및 새로고침
            }}
          >
            확인
          </button>
        </div>
      ) : (
        // 닉네임 변경 입력 모달
        <div>
          <h2>닉네임 수정</h2>
          <div className="nickname-edit-box">
            <label>현재 닉네임</label>
            <p className="modal-current-nickname">{currentNickname}</p>
            <label>변경할 닉네임</label>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder="새 닉네임 입력"
            />
            <button
              className="modal-nickname-check-button"
              onClick={handleNicknameCheck}
            >
              중복 확인
            </button>
            {isNicknameUnique === true && (
              <p className="modal-success-message">사용 가능한 닉네임입니다.</p>
            )}
            {errors.nickname && (
              <p className="profile-edit-error-message">{errors.nickname}</p>
            )}
          </div>
          <button
            className="modal-edit-profile-modify"
            onClick={handleNicknameSubmit}
          >
            닉네임 변경
          </button>
        </div>
      )}
    </div>
  );
};

export default NicknameEditModal;
