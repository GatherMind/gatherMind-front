import React from "react";
import "../../styles/DeleteMemberModal.css";
import { useNavigate } from "react-router-dom";

const DeleteAccountModal = ({ onDelete, onCancel }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/serious");
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="delete-check-message">
          정말로 GatherMind 회원 탈퇴를 진행 하시겠습니까?
        </p>
        <div className="member-delete-button-box">
          <button className="member-delete-confirm-button" onClick={onDelete}>탈퇴</button>
          <button className="member-delete-cancel-button" onClick={handleCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
