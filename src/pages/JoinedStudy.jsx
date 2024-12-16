import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getMemberByToken,
  getStudyCount,
  getQuestionCount,
  getAnswerCount,
  getMyStudy,
} from "../services/MemberApiService";
import "../styles/JoinedStudy.css";
import { withdrawStudyMember } from "../services/StudyMemberApiService";

const JoinedStudy = () => {
  const [joinedGroups, setJoinedGroups] = useState([]); // 가입한 스터디 목록
  const [memberInfo, setMemberInfo] = useState({ nickname: "Undefined" }); // 회원 정보
  const navigate = useNavigate();
  const { authToken } = useAuth(); // 인증 토큰

  const [counts, setCounts] = useState({
    studyCount: 0,
    questionCount: 0,
    answerCount: 0,
  });

  // 데이터 가져오기
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        // API 호출
        const groupResponse = await getMyStudy(authToken);
        // const response = await getMyInfo(authToken);
        const response = await getMemberByToken();

        // 상태 업데이트
        setMemberInfo(response.data || {});
        setJoinedGroups(groupResponse.data);

        // 가입한 스터디 수, 작성한 질문 수, 작성한 답변 수 가져오기
        const [studyResponse, questionResponse, answerResponse] =
          await Promise.all([
            getStudyCount(),
            getQuestionCount(),
            getAnswerCount(),
          ]);

        setCounts({
          studyCount: studyResponse.data || 0,
          questionCount: questionResponse.data || 0,
          answerCount: answerResponse.data || 0,
        });
      } catch (error) {
        console.error("스터디 정보를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchActivityData();
  }, [authToken]);

  // 스터디 탈퇴
  const handleWithdrawFromStudy = async (studyId) => {
    try {
      await withdrawStudyMember(studyId);

      // 탈퇴 후 스터디 목록 갱신
      setJoinedGroups(
        joinedGroups.filter((group) => group.studyId !== studyId)
      );
      alert("스터디 탈퇴가 완료되었습니다.");
    } catch (error) {
      alert("스터디 탈퇴에 실패했습니다.");
    }
  };

  return (
    <div className="joined-study-container">
      {/* 헤더 */}
      <header>
        <ul className="mypage-joined-study-nav">
          <li onClick={() => navigate("/mypage")}>
            정보
            <br />
            보기
          </li>
          <li onClick={() => navigate("/mypage/joined-study")}>
            가입한
            <br />
            스터디
          </li>
          <li onClick={() => navigate("/mypage/written-question")}>
            작성한
            <br />
            질문
          </li>
          <li onClick={() => navigate("/mypage/written-answer")}>
            작성한
            <br />
            답변
          </li>
        </ul>

        {/* 가입한 스터디 수, 작성한 질문 수, 작성한 답변 수 */}
        <ul className="mypage-stats">
          <li>
            가입 스터디 수<p>{counts.studyCount}</p>
          </li>
          <li>
            작성 질문 수<p>{counts.questionCount}</p>
          </li>
          <li>
            작성 답변 수<p>{counts.answerCount}</p>
          </li>
        </ul>
      </header>

      {/* 메인 콘텐츠 */}
      <main>
        <h3>가입한 스터디 목록</h3>
        {joinedGroups.length > 0 ? (
          <div className="study-list">
            {joinedGroups.map((group) => (
              <div className="study-card" key={group.studyId}>
                <p className="study-title">{group.title}</p>
                <button
                  className="withdraw-button"
                  onClick={() => handleWithdrawFromStudy(group.studyId)}
                >
                  탈퇴
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-study-message">
            현재 가입한 스터디가 없네요. 새로운 스터디에 가입해볼까요?
          </p>
        )}
      </main>
    </div>
  );
};

export default JoinedStudy;
