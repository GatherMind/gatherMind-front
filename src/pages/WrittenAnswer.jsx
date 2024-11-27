import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getStudyCount,
  getQuestionCount,
  getAnswerCount,
  getMemberByToken,
  getRecentAnswerLimit3,
} from "../services/MemberApiService";
import "../styles/WrittenAnswer.css";

const WrittenAnswer = () => {
  // State 관리
  const [recentAnswers, setRecentAnswers] = useState([]); // 최근 답변 목록
  const [memberInfo, setMemberInfo] = useState({ nickname: "Undefined" }); // 회원 정보
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    studyCount: 0,
    questionCount: 0,
    answerCount: 0,
  });

  // 데이터 가져오기
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        // const token = localStorage.getItem("token");

        // 회원 정보 가져오기
        // const response = await axios.get("/api/members/me", {
        //   headers: { Authorization: `Bearer ${token}` },
        // });

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

        // 최근 답변 가져오기 (최대 3개)
        // const answersResponse = await axios.get("/api/members/recent-answers", {
        //   headers: { Authorization: `Bearer ${token}` },
        // });

        const response = await getMemberByToken();
        setMemberInfo(response.data || {});

        const answersResponse = await getRecentAnswerLimit3();
        setRecentAnswers(answersResponse.data.slice(0, 3));

        // const [response, answersResponse] = await Promise.all([
        //   getMemberByToken(),
        //   answersResponse(),
        // ]);
      } catch (error) {
        console.error("답변 데이터를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchAnswers();
  }, []);

  // 답변 수정
  const handleEditAnswer = (questionId) => {
    navigate(`/edit-question/${questionId}`);
  };

  // 답변 삭제
  const handleDeleteAnswer = async (questionId) => {
    if (window.confirm("정말로 답변을 삭제하시겠습니까?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/answers/${questionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 삭제 후 상태 갱신
        setRecentAnswers(
          recentAnswers.filter((answer) => answer.questionId !== questionId)
        );
        alert("답변이 삭제되었습니다.");
      } catch (error) {
        alert("답변 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <div className="written-answer-container">
      {/* 헤더 */}
      <header>
        <ul className="mypage-written-answer-nav">
          <li onClick={() => navigate("/mypage")}>정보<br />보기</li>
          <li onClick={() => navigate("/mypage/joined-study")}>
            가입한<br />스터디
          </li>
          <li onClick={() => navigate("/mypage/written-question")}>
            작성한<br />질문
          </li>
          <li onClick={() => navigate("/mypage/written-answer")}>
            작성한<br />답변
          </li>
        </ul>

        {/* 통계 정보 */}
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

      {/* 답변 목록 */}
      <main>
        <h3>작성한 답변 목록</h3>
        {recentAnswers.length > 0 ? (
          recentAnswers.map((answer) => (
            <div className="answer-card" key={answer.id}>
              <p className="answer-study-title">{answer.studyTitle}</p>
              <div className="answer-content-button-box">
                <div className="answer-content-box">
                  <p className="answer-question-title">
                    {answer.questionTitle}
                  </p>
                  <p className="mypage-answer-content">{answer.content}</p>
                </div>
                <div className="mypage-answer-button-box">
                  <button
                    className="mypage-answer-edit"
                    onClick={() => handleEditAnswer(answer.questionId)}
                  >
                    수정
                  </button>
                  <button
                    className="mypage-answer-delete"
                    onClick={() => handleDeleteAnswer(answer.questionId)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-answer-message">
            질문 게시글에 답변을 남겨 정보를 공유하세요
          </p>
        )}
      </main>
    </div>
  );
};

export default WrittenAnswer;
