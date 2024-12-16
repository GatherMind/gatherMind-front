import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMemberByToken,
  getStudyCount,
  getQuestionCount,
  getAnswerCount,
  getRecentQuestionLimit3,
} from "../services/MemberApiService";
import "../styles/WrittenQuestion.css";
import { deleteQuestion } from "../services/QuestionApiService";

const WrittenQuestion = () => {
  // State 관리
  const [recentQuestions, setRecentQuestions] = useState([]); // 최근 질문 목록
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    studyCount: 0,
    questionCount: 0,
    answerCount: 0,
  });

  // 데이터 가져오기
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
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

        await getMemberByToken();

        // 최근 질문 가져오기 (최대 3개)
        const questionsResponse = await getRecentQuestionLimit3();
        setRecentQuestions(questionsResponse.data.slice(0, 3));
      } catch (error) {
        console.error("질문 데이터를 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchQuestions();
  }, []);

  // 질문 수정
  const handleEditQuestion = (questionId, studyId) => {
    navigate(`/edit-question/${questionId}`, { state: { studyId } });
  };

  // 질문 삭제
  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("정말로 게시글을 삭제하시겠습니까?")) {
      try {
        await deleteQuestion(questionId);

        // 삭제 후 상태 갱신
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

  return (
    <div className="written-question-container">
      {/* 헤더 */}
      <header>
        <ul className="mypage-written-question-nav">
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

      {/* 질문 목록 */}
      <main>
        <h3>작성한 질문 목록</h3>
        {recentQuestions.length > 0 ? (
          recentQuestions.map((question) => (
            <div key={question.id} className="question-card">
              <p className="question-study-title">{question.studyTitle}</p>
              <div className="question-content-button-box">
                <p className="mypage-question-title">{question.title}</p>
                <div className="mypage-question-button-box">
                  <button
                    className="mypage-question-edit"
                    onClick={() =>
                      handleEditQuestion(question.questionId, question.studyId)
                    }
                  >
                    수정
                  </button>
                  <button
                    className="mypage-question-delete"
                    onClick={() => handleDeleteQuestion(question.questionId)}
                  >
                    삭제
                  </button>
                </div>
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
