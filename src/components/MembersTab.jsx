import React from "react";
import "../styles/MemberTab.css";
import "../styles/global/ListComponent.css";
import "../styles/global/Button.css";
import { STUDY_ROLE, MEMBER_STATUS } from "../constants/constants";

const MembersTab = ({
  members,
  boards,
  boardsPage,
  boardsTotalPages,
  boardsTotalElements,
  onPageChange,
  studyId,
  role,
  myMemberId,
  pendingCnt,
  handleConfirmClick,
  handleResignClick,
}) => {
  const renderMemberList = () => (
    <div className="member-tab-container">
      <div className="tab-header">
        <h3>멤버 목록</h3>
        {role === STUDY_ROLE.ADMIN && pendingCnt > 0 && (
          <div className="pending-count">승인 대기: {pendingCnt}명</div>
        )}
      </div>

      <div className="member-list">
        {members.map((member) => (
          <div className="member-card" key={member.memberId}>
            {/* 닉네임과 상태 표시 */}
            <div className="member-info">
              <div className="nickname">{member.nickname}</div>
              <div
                className={`status ${
                  member.status === MEMBER_STATUS.PENDING
                    ? "pending"
                    : "approved"
                }`}
              >
                {member.status === MEMBER_STATUS.PENDING
                  ? "승인 대기"
                  : "활동 중"}
              </div>
            </div>

            {/* 관리자 버튼 (승인/강퇴) */}
            {role === STUDY_ROLE.ADMIN && member.memberId !== myMemberId && (
              <div className="member-actions">
                {member.status === MEMBER_STATUS.PENDING && (
                  <button
                    className="approve-button"
                    onClick={() => handleConfirmClick(member.memberId)}
                  >
                    승인
                  </button>
                )}
                {member.status === MEMBER_STATUS.APPROVED && (
                  <button
                    className="resign-button"
                    onClick={() => handleResignClick(member.memberId)}
                  >
                    강퇴
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {members && members.length > 0 ? (
        <>
          {/* 멤버 리스트 */}
          {renderMemberList()}
        </>
      ) : (
        <div>현재 그룹에 멤버가 없습니다!</div>
      )}
    </>
  );
};

export default MembersTab;
