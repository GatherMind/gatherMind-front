import React, { useState } from "react";
import "../../styles/global/Modal.css";
import { MEMBER_ROLE } from "../../constants/constants";

const UserEditModal = ({ user, onClose, onSave }) => {
  const [nickname, setNickname] = useState(user.nickname);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleSave = () => {
    const updatedUser = { ...user, nickname, email, role };
    onSave(updatedUser); // 상위 컴포넌트에서 저장 처리
    onClose(); // 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* 헤더 */}
        <div className="modal-header">
          사용자 정보 수정
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* 본문 */}
        <div className="modal-body">
          <label>
            <span>닉네임:</span>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </label>

          <label>
            <span>이메일:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <span>권한:</span>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value={MEMBER_ROLE.ADMIN}>ADMIN</option>
              <option value={MEMBER_ROLE.USERS}>USER</option>
            </select>
          </label>
        </div>

        {/* 하단 버튼 */}
        <div className="modal-footer">
          <button className="save-button" onClick={handleSave}>
            저장
          </button>
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
