import React, { useEffect, useState } from "react";
import "../styles/Popup.css";
import { getMember } from "../services/apiService";

const Popup = ({ isOpen, onClose, meetingId, onMemberAdded }) => {
  const [searchResult, setSearchResult] = useState(""); // 검색 결과 메시지
  const [searchId, setSearchId] = useState("");
  //확인/취소 버튼 상태
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    member: { memberId: searchId },
    meeting: { meetingId: meetingId },
  });

  // 그룹 ID가 바뀔 때마다 formData 업데이트
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      meeting: { meetingId: meetingId },
    }));
  }, [meetingId]);

  // searchId가 변경될 때마다 formData 업데이트
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      member: { memberId: searchId }, // searchId가 변경되면 memberId를 업데이트
    }));
  }, [searchId]);

  // 멤버 아이디 검색
  const handleSearch = async () => {
    if (searchId) {
      setIsLoading(true);
      try {
        const memberData = await getMember(searchId);
        setFormData((prevFormData) => ({
          ...prevFormData,
          member: { memberId: memberData.memberId },
        }));
        setSearchResult(
          `${memberData.memberId} (${memberData.nickname}) 을/를 추가 하시겠습니까?`
        );
        setIsConfirmationModalOpen(true);
      } catch (error) {
        console.error("아이디 검색 실패", error.message);
        setSearchResult("아이디를 찾을 수 없습니다.");
        setIsConfirmationModalOpen(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // // 그룹에 멤버 추가
  // const handleConfirm = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await createMembership(formData);
  //     onMemberAdded(response);
  //     alert("추가가 완료되었습니다.");
  //     setIsConfirmationModalOpen(false);
  //     setSearchResult("");
  //     onClose();
  //   } catch (error) {
  //     console.error("멤버 추가 실패 : ", error.message);
  //   } finally {
  //     setIsLoading(false);
  //     setIsConfirmationModalOpen(false);
  //   }
  // };

  const handleCancel = () => {
    setSearchResult("");
    setIsConfirmationModalOpen(false);
  };

  // Popup 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setSearchId("");
      setSearchResult("");
      setIsConfirmationModalOpen(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>아이디 검색</h2>
        <input
          className="search-input"
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="아이디 입력"
        />

        <div className="button-group">
          <button onClick={handleSearch} disabled={!searchId || isLoading}>
            검색
          </button>
          <button onClick={onClose}>닫기</button>
        </div>

        {/* 검색 결과 메시지 */}
        {!isConfirmationModalOpen && searchResult && (
          <p className="result-message">{searchResult}</p>
        )}
        {/* 검색 결과 확인 및 취소 버튼 */}
        {isConfirmationModalOpen && (
          <div className="confirmation-modal">
            <p>{searchResult}</p>
            <button onClick={alert()} disabled={isLoading}>
              {isLoading ? "추가 중..." : "확인"}
            </button>
            <button onClick={handleCancel}>취소</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
