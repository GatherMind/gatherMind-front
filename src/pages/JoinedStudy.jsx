import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getMemberByToken,
  getStudyCount,
  getMyStudy,
} from "../services/MemberApiService";
import "../styles/JoinedStudy.css";
import { withdrawStudyMember } from "../services/StudyMemberApiService";

const JoinedStudy = () => {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [memberInfo, setMemberInfo] = useState({ nickname: "Undefined" });
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const [counts, setCounts] = useState({
    studyCount: 0,
  });
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const groupResponse = await getMyStudy(authToken);
        const response = await getMemberByToken();

        setMemberInfo(response.data || {});
        setJoinedGroups(groupResponse.data);

        const [studyResponse] = await Promise.all([getStudyCount()]);

        setCounts({
          studyCount: studyResponse.data || 0,
        });
      } catch (error) {
        console.error("스터디 정보를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchActivityData();
  }, [authToken]);

  const handleWithdrawFromStudy = async (studyId) => {
    try {
      await withdrawStudyMember(studyId);

      setJoinedGroups(
        joinedGroups.filter((group) => group.studyId !== studyId)
      );
      alert("스터디 탈퇴가 완료되었습니다.");
    } catch (error) {
      alert("스터디 탈퇴에 실패했습니다.");
    }
  };

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const maxLength = 20;

  return (
    <div className="joined-study-container">
      <ul className="mypage-study-nav">
        <li className="mypage-study-nav-1" onClick={() => navigate("/mypage")}>
          내 정보
        </li>
        <li
          className="mypage-study-nav-2"
          onClick={() => navigate("/mypage/joined-study")}
        >
          스터디
        </li>
        <li
          className="mypage-study-nav-3"
          onClick={() => navigate("/mypage/written-question")}
        >
          게시글
        </li>
        <li
          className="mypage-study-nav-4"
          onClick={() => navigate("/mypage/written-answer")}
        >
          댓글
        </li>
      </ul>

      <main>
        <h1 id="study-page-name">
          내 스터디 목록 &#40; {counts.studyCount} &#41; &#45; 당신 앞에는
          어떠한 장애물도 없다. 망설이는 태도가 가장 큰 장애물이다.
        </h1>

        {joinedGroups.length > 0 ? (
          <div className="study-list">
            {joinedGroups.map((group) => (
              <div className="study-card" key={group.studyId}>
                <p className="study-title">
                  {truncateText(group.title, maxLength)}
                </p>
                <button
                  className="study-withdraw-button"
                  onClick={() => handleWithdrawFromStudy(group.studyId)}
                >
                  탈퇴
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-study-message">현재 소속된 스터디가 없어요.</p>
        )}
      </main>
    </div>
  );
};

export default JoinedStudy;
