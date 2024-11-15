import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/WrittenQuestion.css";

const WrittenQuestion = () => {
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [memberInfo, setMemberInfo] = useState({
    nickname: "Undefined",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("/api/members/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMemberInfo(response.data || {});

        const questionsResponse = await axios.get(
          "/api/members/recent-questions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecentQuestions(questionsResponse.data.slice(0, 3));
      } catch (error) {
        console.error("질문 데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchQuestions();
  }, []);

  const handleEditQuestion = (questionId) => {
    navigate(`/edit-question/${questionId}`);
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("정말로 게시글을 삭제하시겠습니까?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/questions/${questionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentQuestions(
          recentQuestions.filter((question) => question.id !== questionId)
        );
        alert("게시글이 삭제되었습니다.");
      } catch (error) {
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <div className="written-question-container">
      <header>
        <Header />
        <h2>{memberInfo.nickname}님의 마이 페이지</h2>
        <ul className="mypage-written-question-nav">
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

      <h3>작성한 질문 목록</h3>
      {recentQuestions.length > 0 ? (
        recentQuestions.map((question) => (
          <div key={question.id} className="question-card">
            <p className="question-study-title">{question.studyTitle}</p>
            <p className="mypage-question-title">{question.title}</p>
            <div className="mypage-question-button-box">
              <button
                className="mypage-question-edit"
                onClick={() => handleEditQuestion(question.id)}
              >
                수정
              </button>
              <button
                className="mypage-question-delete"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-question-message">
          스터디에 질문을 남겨 정보를 공유하세요
        </p>
      )}
    </div>
  );
};

export default WrittenQuestion;
