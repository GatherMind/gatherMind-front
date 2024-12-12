import React, { useState } from "react";
import "../../styles/global/Modal.css";

const UserEditModal = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleSave = () => {
    const updatedUser = { ...user, name, email, role };
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
            <span>이름:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              <option value="관리자">관리자</option>
              <option value="일반 사용자">일반 사용자</option>
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
