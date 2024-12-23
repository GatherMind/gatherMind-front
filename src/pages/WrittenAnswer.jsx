import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAnswerCount,
  getMemberByToken,
  getMyAnswerList,
} from "../services/MemberApiService";
import "../styles/WrittenAnswer.css";
import { deleteAnswer } from "../services/AnswerApiService";

const WrittenAnswer = () => {
  const [recentAnswers, setRecentAnswers] = useState([]);
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    studyCount: 0,
    questionCount: 0,
    answerCount: 0,
  });

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const [answerResponse] = await Promise.all([getAnswerCount()]);

        setCounts({
          answerCount: answerResponse.data || 0,
        });

        await getMemberByToken();

        const answersResponse = await getMyAnswerList();
        setRecentAnswers(answersResponse.data);
      } catch (error) {
        console.error("답변 데이터를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchAnswers();
  }, []);

  const handleEditAnswer = (questionId, studyId) => {
    navigate(`/question-detail/${questionId}`, { state: { studyId } });
  };

  const handleDeleteAnswer = async (answerId) => {
    if (window.confirm("정말로 답변을 삭제하시겠습니까?")) {
      try {
        await deleteAnswer(answerId);

        setRecentAnswers(
          recentAnswers.filter((answer) => answer.answerId !== answerId)
        );
        alert("답변이 삭제되었습니다.");
      } catch (error) {
        alert("답변 삭제에 실패했습니다.");
      }
    }
  };

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const maxLength = 20;

  return (
    <div className="written-answer-container">
      <ul className="mypage-answer-nav">
        <li className="mypage-answer-nav-1" onClick={() => navigate("/mypage")}>
          내 정보
        </li>
        <li
          className="mypage-answer-nav-2"
          onClick={() => navigate("/mypage/joined-study")}
        >
          스터디
        </li>
        <li
          className="mypage-answer-nav-3"
          onClick={() => navigate("/mypage/written-question")}
        >
          게시글
        </li>
        <li
          className="mypage-answer-nav-4"
          onClick={() => navigate("/mypage/written-answer")}
        >
          댓글
        </li>
      </ul>
      <main>
        <h1 id="answer-page-name">
          내 댓글 목록 &#40; {counts.answerCount} &#41; &#45; 친구들에게서
          기대하는 것을 친구들에게 베풀어야 한다.
        </h1>
        {recentAnswers.length > 0 ? (
          recentAnswers.map((answer) => (
            <div
              className="answer-card"
              key={answer.id}
              onClick={() =>
                handleEditAnswer(answer.questionId, answer.studyId)
              }
            >
              <div className="study-question-title-answer-content">
                <p className="answer-answer-content">
                  {truncateText(answer.content, maxLength)}
                </p>
                <div className="answer-content-subtitle">
                  <p className="answer-study-title">
                    &#91;{truncateText(answer.studyTitle, maxLength)}&#93;
                  </p>
                  <p className="answer-question-title">
                  &#91;{truncateText(answer.questionTitle, maxLength)}&#93;
                  </p>
                </div>
              </div>
              <button
                className="answer-delete-button"
                onClick={() => handleDeleteAnswer(answer.answerId)}
              >
                삭제
              </button>
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
