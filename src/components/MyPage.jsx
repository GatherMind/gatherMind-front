import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import {
  getMemberByToken,
  getStudyCount,
  getQuestionCount,
  getAnswerCount,
} from "../services/MemberApiService";
import "../styles/Mypage.css";

const Mypage = () => {
  const [memberInfo, setMemberInfo] = useState({
    memberId: "정보 없음",
    nickname: "정보 없음",
    email: "정보 없음",
  });
  const [counts, setCounts] = useState({
    studyCount: 0,
    questionCount: 0,
    answerCount: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      try {
        // 회원 정보 가져오기
        const memberResponse = await getMemberByToken();
        setMemberInfo(memberResponse.data || {});

        // 가입한 스터디 수, 작성한 질문 수, 작성한 답변 수 가져오기
        const [studyResponse, questionResponse, answerResponse] = await Promise.all([
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
        console.error("회원 정보를 가져오는 중 오류가 발생했습니다.", error);
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
    };

    fetchMemberInfo();
  }, [navigate]);

  const handleEditInfo = () => {
    navigate("/editprofile"); // 정보 수정 페이지로 이동
  };

  return (
    <div className="mypage-container">
      <header>
        <ul className="mypage-nav">
          <li onClick={() => navigate("/mypage")}>정보 보기</li>
          <li onClick={() => navigate("/mypage/joined-study")}>
            가입한 스터디
          </li>
          <li onClick={() => navigate("/mypage/written-question")}>
            작성한 질문
          </li>
          <li onClick={() => navigate("/mypage/written-answer")}>
            작성한 답변
          </li>
        </ul>

        {/* 가입한 스터디 수, 작성한 질문 수, 작성한 답변 수 */}
        <ul className="mypage-stats">
          <li>가입한 스터디 수: {counts.studyCount}</li>
          <li>작성한 질문 수: {counts.questionCount}</li>
          <li>작성한 답변 수: {counts.answerCount}</li>
        </ul>
      </header>

      {/* 기본 정보 표시 */}
      <div className="mypage-info-box">
        <p className="mypage-info">
          <h3>아이디</h3> <span>{memberInfo.memberId || "Undefined"}</span>
        </p>
        <p className="mypage-info">
          <h3>닉네임</h3> <span>{memberInfo.nickname || "Undefined"}</span>
        </p>
        <p className="mypage-info">
          <h3>이메일</h3> <span>{memberInfo.email || "Undefined"}</span>
        </p>
      </div>
      <button onClick={handleEditInfo}>정보 수정</button>
    </div>
  );
};

export default Mypage;
