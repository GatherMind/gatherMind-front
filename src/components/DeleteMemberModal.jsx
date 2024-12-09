import React from "react";
import "../styles/DeleteMemberModal.css";

const DeleteAccountModal = ({ onDelete, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="delete-question-message">
          정말로 GatherMind 회원 탈퇴를 진행 하시겠습니까?
        </p>
        <div className="modal-actions">
          <button onClick={onDelete}>탈퇴</button>
          <button onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
