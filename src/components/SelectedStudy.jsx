import React, { useState } from "react";
import "../styles/SelectedStudy.css";
import UseGroupApi from "../server/UseGroupApi"; // UseGroupApi를 올바르게 import
import GroupInfo from "./GroupInfo"; // GroupInfo 컴포넌트 import

export default function SelectedStudy() {
  const { data, loading, error } = UseGroupApi();
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 관리
  const [selectedStudy, setSelectedStudy] = useState(null); // 클릭한 스터디 데이터 저장

  const handleClick = (studyData) => {
    setSelectedStudy(studyData); // 클릭한 스터디 데이터 저장
    setModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setModalOpen(false); // 모달 닫기
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="hotstudy">🔥🔥방금 만든 스터디</h1>

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <GroupInfo
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          groupInfoData={selectedStudy} // 모달에 클릭한 스터디 데이터 전달
        />
      )}

      <div className="grid-container">
        {data.slice(0, 6).map((e, index) => (
          <div
            className="box"
            key={index}
            onClick={() => handleClick(e)} // 박스 클릭 시 모달 열기
          >
            {e.title}
          </div>
        ))}
      </div>
    </div>
  );
}
