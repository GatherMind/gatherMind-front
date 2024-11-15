import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/WrittenAnswer.css";

const WrittenAnswer = () => {
  const [recentAnswers, setRecentAnswers] = useState([]);
  const [memberInfo, setMemberInfo] = useState({
    nickname: "Undefined",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("/api/members/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMemberInfo(response.data || {});

        const answersResponse = await axios.get("/api/members/recent-answers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentAnswers(answersResponse.data.slice(0, 3));
      } catch (error) {
        console.error("답변 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchAnswers();
  }, []);

  const handleEditAnswer = (questionId) => {
    navigate(`/edit-question/${questionId}`);
  };

  const handleDeleteAnswer = async (questionId) => {
    if (window.confirm("정말로 답변을 삭제하시겠습니까?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/answers/${questionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      <header>
        <Header />
        <h2>{memberInfo.nickname}님의 마이 페이지</h2>
        <ul className="mypage-written-answer-nav">
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
      </header>

      <h3>작성한 답변 목록</h3>
      {recentAnswers.length > 0 ? (
        recentAnswers.map((answer) => (
          <div className="answer-card" key={answer.id}>
            <p className="answer-study-title">{answer.studyTitle}</p>
            <p className="answer-question-title">{answer.questionTitle}</p>
            <p className="mypage-answer-content">{answer.content}</p>
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
        ))
      ) : (
        <p className="no-answer-message">
          질문 게시글에 답변을 남겨 정보를 공유하세요
        </p>
      )}
    </div>
  );
};

export default WrittenAnswer;
