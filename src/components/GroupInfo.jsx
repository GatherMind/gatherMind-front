import React, { useEffect, useState } from "react";
import "../css/GroupInfo.css"; // 스타일 import
import { useAuth } from "../context/AuthContext";
import { applyStudy } from "../services/StudyMemberApiService";

const GroupInfo = ({ isOpen, onClose, groupInfoData }) => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 모달이 열릴 때마다 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setLoading(false);
      setSuccess(false);
    }
  }, [isOpen]);

  const handleApply = async () => {
    if (!authToken) {
      setError("로그인이 필요합니다.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await applyStudy(groupInfoData.studyId, authToken);
      setSuccess(true);
    } catch (error) {
      console.error("지원하기 실패했습니다.", error);
      setError("지원하기 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

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

            {error && <p className="error-message">{error}</p>}
            {success && (
              <p className="success-message">지원이 완료되었습니다!</p>
            )}

            <button
              className="apply-button"
              onClick={handleApply}
              disabled={loading || success} // 성공 후 재지원 제한
            >
              {loading ? "지원 중..." : "지원하기"}
            </button>
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
