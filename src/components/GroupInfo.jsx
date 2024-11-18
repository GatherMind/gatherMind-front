import React from "react";
import "../css/GroupInfo.css"; // 스타일 import

const GroupInfo = ({ isOpen, onClose, groupInfoData }) => {
  // isOpen이 false면 null을 반환하여 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content"
          onClick={(click) => click.stopPropagation()}
        >
          <div className="content-group">
            <div className="title">{groupInfoData.title}</div>
            <div className="description">{groupInfoData.description}</div>
            <button className="apply-button">지원하기</button>
          </div>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default GroupInfo;
