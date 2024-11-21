import React, { useState } from "react";
import "../styles/MemberTab.css";
import "../styles/global/ListComponent.css";
import "../styles/global/Button.css";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { useAuth } from "../context/AuthContext";
import { confirmStudyMember } from "../services/StudyMemberApiService";

const MembersTab = ({
  members,
  boards,
  boardsPage,
  boardsTotalPages,
  boardsTotalElements,
  onPageChange,
  role,
  studyId,
}) => {
  const navigate = useNavigate();

  const { authToken } = useAuth();

  // 상태값으로 목록이 열렸는지 닫혔는지를 관리
  const [isOpen, setIsOpen] = useState(false);
  const size = 5;

  // 화살표 버튼을 클릭할 때 상태 변경
  const toggleList = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClick = (questionId) => {
    navigate(`/question-detail/${questionId}`, { state: { studyId } });
  };

  const handleConfirmClick = async (memberId) => {
    const response = await confirmStudyMember({ studyId, memberId }, authToken);
  };

  const renderMemberList = () => (
    <div className="list-container member-list">
      <div className="list-header" onClick={toggleList}>
        <h3>멤버 목록</h3>
        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <ul>
          {members.map((member) => (
            <li key={member.memberId} className="list-item member-item">
              <div className="nickname">{member.nickname}</div>
              <div className="status">
                {role === "admin" ? `(${member.status})` : ""}
              </div>
              <div className="actions">
                {role === "admin" && member.status === "pending" && (
                  <button
                    className="button"
                    onClick={() => handleConfirmClick(member.memberId)}
                  >
                    승인
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderBoardList = () => (
    <div className="list-container board-list">
      <div className="list-header">
        <h3>게시판 목록</h3>
      </div>

      {boards.map((board, index) => {
        // 전체 게시글 수에서 현재 페이지와 index를 이용하여 순번 계산
        const boardNumber = boardsTotalElements - boardsPage * size - index;

        return (
          <div
            key={board.questionId}
            className="list-item board-item board-item"
            onClick={() => handleClick(board.questionId)}
          >
            <div>{boardNumber}</div>
            <div>
              [{board.option}] {board.title}
            </div>
            <div>{board.createdAt}</div>
          </div>
        );
      })}

      <Pagination
        currentPage={boardsPage}
        totalPages={boardsTotalPages}
        onPageChange={onPageChange}
      />
    </div>
  );

  return (
    <div className="members">
      {members && members.length > 0 ? (
        <>
          {/* 멤버 리스트 */}
          {renderMemberList()}

          {/* 게시판 목록 */}
          {boards && boards.length > 0 ? (
            renderBoardList()
          ) : (
            <div className="no-board"> 존재하는 게시판이 없습니다!</div>
          )}
        </>
      ) : (
        <div>현재 그룹에 멤버가 없습니다!</div>
      )}
    </div>
  );
};

export default MembersTab;
