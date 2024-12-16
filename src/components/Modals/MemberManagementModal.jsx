import React, { useState } from "react";
import "../../styles/global/Modal.css";

const UserEditModal = ({
  selectedStudy,
  memberList,
  handleRemoveMember,
  handleSaveMembers,
  handleAddMember,
  newMember,
  setNewMember,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* 헤더 */}
        <div className="modal-header">
          {selectedStudy.name} 멤버 관리
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* 본문 */}
        <div className="modal-body">
          <ul>
            {memberList.map((member, index) => (
              <li key={index}>
                {member}{" "}
                <button onClick={() => handleRemoveMember(member)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>

        {/* 하단 버튼 */}
        <div className="modal-footer">
          <input
            type="text"
            placeholder="새 멤버 추가"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
          />
          <button onClick={handleAddMember}>추가</button>
          <button onClick={handleSaveMembers}>저장</button>
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
