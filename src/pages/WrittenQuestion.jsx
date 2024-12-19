import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMemberByToken,
  getQuestionCount,
  getRecentQuestionLimit3,
} from "../services/MemberApiService";
import "../styles/WrittenQuestion.css";
import { deleteQuestion } from "../services/QuestionApiService";

const WrittenQuestion = () => {
  const [recentQuestions, setRecentQuestions] = useState([]);
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    studyCount: 0,
    questionCount: 0,
    answerCount: 0,
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const [questionResponse] = await Promise.all([getQuestionCount()]);

        setCounts({
          questionCount: questionResponse.data || 0,
        });

        await getMemberByToken();

        const questionsResponse = await getRecentQuestionLimit3();
        setRecentQuestions(questionsResponse.data.slice(0, 3));
      } catch (error) {
        console.error("질문 데이터를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleEditQuestion = (questionId, studyId) => {
    navigate(`/edit-question/${questionId}`, { state: { studyId } });
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("정말로 게시글을 삭제하시겠습니까?")) {
      try {
        await deleteQuestion(questionId);

        setRecentQuestions(
          recentQuestions.filter(
            (question) => question.questionId !== questionId
          )
        );
        alert("게시글이 삭제되었습니다.");
      } catch (error) {
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const maxLength = 20;

  return (
    <div className="written-question-container">
      <ul className="mypage-question-nav">
        <li
          className="mypage-question-nav-1"
          onClick={() => navigate("/mypage")}
        >
          내 정보
        </li>
        <li
          className="mypage-question-nav-2"
          onClick={() => navigate("/mypage/joined-study")}
        >
          스터디
        </li>
        <li
          className="mypage-question-nav-3"
          onClick={() => navigate("/mypage/written-question")}
        >
          게시글
        </li>
        <li
          className="mypage-question-nav-4"
          onClick={() => navigate("/mypage/written-answer")}
        >
          댓글
        </li>
      </ul>

      <main>
        <h1 id="question-page-name">
          내 게시글 목록 &#40; {counts.questionCount} &#41; &#45; 사람을
          판단하려면 그의 대답이 아니라 질문을 보라.
        </h1>

        {recentQuestions.length > 0 ? (
          recentQuestions.map((question) => (
            <div
              className="question-card"
              key={question.id}
              onClick={() =>
                handleEditQuestion(question.questionId, question.studyId)
              }
            >
              <div className="study-question-title">
                <p className="question-study-title">
                  {truncateText(question.studyTitle, maxLength)}
                </p>
                <p className="question-question-title">
                  {truncateText(question.title, maxLength)}
                </p>
              </div>
              <button
                className="question-delete-button"
                onClick={() => handleDeleteQuestion(question.questionId)}
              >
                삭제
              </button>
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
