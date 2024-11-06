import React, { useState } from "react";
import "../styles/MemberTab.css";

const MembersTab = ({ members, boards }) => {
  // 상태값으로 목록이 열렸는지 닫혔는지를 관리
  const [isOpen, setIsOpen] = useState(false);

  // 화살표 버튼을 클릭할 때 상태 변경
  const toggleList = () => {
    setIsOpen((prev) => !prev);
  };

  const renderMemberList = () => (
    <div className="member-list">
      <div
        className="member-list-header"
        onClick={toggleList}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <h3>멤버 목록</h3>
        <span
          style={{
            marginLeft: "auto",
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.3s",
          }}
        >
          ▼
        </span>
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
      {boards.map((board, index) => (
        <div key={board.questionId} className="board-item">
          <div>{index + 1} </div>
          <div>
            [{board.option}] {board.title}
          </div>
          <div>{board.createdAt}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="members">
      {members && members.length > 0 ? (
        <div>
          {/* 멤버 리스트 */}
          {renderMemberList()}

          {/* 지각 랭킹 */}
          {boards && boards.length > 0 ? (
            renderBoardList()
          ) : (
            <div className="no-board"> 지각하는 멤버가 없습니다!</div>
          )}
        </div>
      ) : (
        <div>현재 그룹에 멤버가 없습니다. 멤버를 초대해 보세요!</div>
      )}
    </div>
  );
};

export default MembersTab;
