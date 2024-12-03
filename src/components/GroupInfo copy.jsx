import React, { useEffect, useState } from "react";
import "../css/GroupInfo.css"; // 스타일 import
import { useAuth } from "../context/AuthContext";
import { applyStudy } from "../services/StudyMemberApiService";

const GroupInfo = ({ isOpen, onClose, groupInfoData, loginData }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // isOpen이 false면 null을 반환하여 렌더링하지 않음

  const { authToken } = useAuth();
  if (!isOpen) return null;

  async function handleClick() {
    try {
      const response = await applyStudy(groupInfoData.studyId, authToken);

      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
  }

  function handleComplete() {
    setShowSuccessModal(false);
    onClose();
  }

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
            <button className="apply-button" onClick={handleClick}>
              지원하기
            </button>
          </div>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <div className="modal-overlay" onClick={onClose}>
          <div
            className="secondmodal-content"
            onClick={(click) => click.stopPropagation()}
          >
            <div className="second-modal">
              <div className="title">지원 완료</div>
            </div>
            <button className="close-button" onClick={handleComplete}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupInfo;
