// ConfirmModal.js
import React from "react";
import "../styles/ConfirmModal.css";
import "../styles/global/Button.css";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <button className="button-error modal-btn" onClick={onConfirm}>
          확인
        </button>
        <button className="button modal-btn" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
