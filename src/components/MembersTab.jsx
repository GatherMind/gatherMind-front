import React from "react";
import "../styles/MemberTab.css";

const MembersTab = ({ members, rank }) => {
  const renderRankList = () => (
    <div className="rank-list">
      <h3>지각 랭킹</h3>
      {rank.map((member, index) => (
        <div key={member.memberId} className="rank-item">
          <div>{index + 1} 위 </div>
          <div>{member.nickname}</div>
          <div>지각 횟수 : {member.lateCount} 회</div>
          <div>총 지각 시간 : {member.lateTime} 분</div>
        </div>
      ))}
    </div>
  );

  const renderMemberList = () => (
    <div className="member-list">
      <h3>멤버 목록</h3>
      <ul>
        {members.map((member) => (
          <li key={member.memberId} className="member-item">
            {member.nickname}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="members">
      {members && members.length > 0 ? (
        <div>
          {/* 지각 랭킹 */}
          {rank && rank.length > 0 ? (
            renderRankList()
          ) : (
            <div className="no-rank"> 지각하는 멤버가 없습니다!</div>
          )}

          {/* 멤버 리스트 */}
          {renderMemberList()}
        </div>
      ) : (
        <div>현재 그룹에 멤버가 없습니다. 멤버를 초대해 보세요!</div>
      )}
    </div>
  );
};

export default MembersTab;
