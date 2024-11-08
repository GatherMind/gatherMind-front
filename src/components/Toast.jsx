import React from 'react';
import '../css/Toast.css';



const Toast = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>Close</button>
        {children} {   <h1></h1>/* 모달 안에 표시할 내용 */}
      </div>
    </div>
  );
};

export default Toast;