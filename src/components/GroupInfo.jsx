import React, { useState } from "react";
import "../css/GroupInfo.css"; // 스타일 import
import { useAuth } from "../context/AuthContext";
import { applyStudy } from "../services/StudyMemberApiService";
import Modal from "./Modal";
import "../styles/global/Modal.css";

const GroupInfo = ({ isOpen, onClose, groupInfoData, loginData }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Error state
  const { authToken } = useAuth();

  if (!isOpen) return null;

  const handleClick = async () => {
    try {
      await applyStudy(groupInfoData.studyId, authToken);
      setErrorMessage(""); // Clear any previous error
      setShowSuccessModal(true);
    } catch (error) {
      if (error.status === 409) {
        setErrorMessage("이미 지원했거나 회원인 스터디 입니다.");
      } else {
        setErrorMessage(error.response.data || "An unexpected error occurred.");
      }
      console.error("Error during application:", error);
    }
  };

  const handleComplete = () => {
    setShowSuccessModal(false);
    onClose();
  };

  const handleOnClose = () => {
    setErrorMessage("");
    onClose();
  };

  return (
    <>
      {/* main modal */}
      <Modal
        isOpen={isOpen}
        onClose={handleOnClose}
        title={groupInfoData.title}
      >
        <div className="description">{groupInfoData.description}</div>
        <button className="apply-button" onClick={handleClick}>
          지원하기
        </button>
        {errorMessage && (
          <div
            className="error-message"
            style={{ color: "red", marginTop: "10px" }}
          >
            {errorMessage}
          </div>
        )}
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleComplete}
        title="지원 완료"
      >
        <p>스터디에 성공적으로 지원되었습니다!</p>
      </Modal>
    </>
  );
};

export default GroupInfo;
