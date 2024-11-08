import React, { useEffect, useState } from "react";
import "../styles/MemberTab.css";

const MembersTab = ({
  members,
  boards,
  boardsPage,
  boardsTotalPages,
  boardsTotalElements,
  onPageChange,
}) => {
  // 상태값으로 목록이 열렸는지 닫혔는지를 관리
  const [isOpen, setIsOpen] = useState(false);
  const size = 5;

  // 화살표 버튼을 클릭할 때 상태 변경
  const toggleList = () => {
    setIsOpen((prev) => !prev);
  };

  const renderMemberList = () => (
    <div className="member-list">
      <div className="member-list-header" onClick={toggleList}>
        <h3>멤버 목록</h3>
        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <ul>
          {members.map((member) => (
            <li key={member.memberId} className="member-item">
              {member.nickname} ({member.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderBoardList = () => (
    <div className="board-list">
      <h3>게시판 목록</h3>
      {boards.map((board, index) => {
        // 전체 게시글 수에서 현재 페이지와 index를 이용하여 순번 계산
        const boardNumber = boardsTotalElements - boardsPage * size - index;

        return (
          <div key={board.questionId} className="board-item">
            <div>{boardNumber}</div>
            <div>
              [{board.option}] {board.title}
            </div>
            <div>{board.createdAt}</div>
          </div>
        );
      })}

      <div className="pagination">
        <button
          onClick={() => onPageChange(boardsPage - 1)}
          disabled={boardsPage === 0}
        >
          Previous
        </button>
        {[...Array(boardsTotalPages).keys()]
          .slice(
            Math.max(0, boardsPage - 2),
            Math.min(boardsTotalPages, boardsPage + 3)
          )
          .map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              disabled={boardsPage === pageNumber}
              className={boardsPage === pageNumber ? "active" : ""}
            >
              {pageNumber + 1}
            </button>
          ))}
        <button
          onClick={() => onPageChange(boardsPage + 1)}
          disabled={boardsPage === boardsTotalPages - 1}
        >
          Next
        </button>
      </div>
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
