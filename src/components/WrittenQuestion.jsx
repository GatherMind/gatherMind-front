import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/WrittenQuestion.css";

const WrittenQuestion = () => {
  // State 관리
  const [recentQuestions, setRecentQuestions] = useState([]); // 최근 질문 목록
  const [memberInfo, setMemberInfo] = useState({ nickname: "Undefined" }); // 회원 정보
  const navigate = useNavigate();

  // 데이터 가져오기
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");

        // 회원 정보 가져오기
        const response = await axios.get("/api/members/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMemberInfo(response.data || {});

        // 최근 질문 가져오기 (최대 3개)
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

  // 질문 수정
  const handleEditQuestion = (questionId) => {
    navigate(`/edit-question/${questionId}`);
  };

  // 질문 삭제
  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("정말로 게시글을 삭제하시겠습니까?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/questions/${questionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 삭제 후 상태 갱신
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
      {/* 헤더 */}
      <header>
        <ul className="mypage-written-question-nav">
          <li onClick={() => navigate("/mypage")}>정보 보기</li>
          <li onClick={() => navigate("/mypage/joined-study")}>가입한 스터디</li>
          <li onClick={() => navigate("/mypage/written-question")}>
            작성한 질문
          </li>
          <li onClick={() => navigate("/mypage/written-answer")}>
            작성한 답변
          </li>
        </ul>

        {/* 통계 정보 */}
        <ul className="mypage-stats">
          <li>
            가입한 스터디 수<br />
            <span>0</span>
          </li>
          <li>
            작성한 질문 수<br />
            <span>{recentQuestions.length}</span>
          </li>
          <li>
            작성한 답변 수<br />
            <span>0</span>
          </li>
        </ul>
      </header>

      {/* 질문 목록 */}
      <main>
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
      </main>
    </div>
  );
};

export default WrittenQuestion;
