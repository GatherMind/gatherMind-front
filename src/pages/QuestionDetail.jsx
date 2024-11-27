import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import AnswerList from "../components/AnswerList";
import { dateFormat } from "../services/QuestionService";
import "../styles/QuestionDetail.css";
import {
  deleteQuestion,
  getQuestionWithFileUrl,
} from "../services/QuestionApiService";
import { getMyInfoById } from "../services/MemberApiService";
import { useAuth } from "../context/AuthContext";
import "../styles/global/ReactQuill.css";

const QuestionDetail = () => {
  const { id } = useParams();
  const { authToken } = useAuth();
  const LocationDom = useLocation();
  const { studyId } = LocationDom.state || {};
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState(null);
  const [memberId, setMemberId] = useState("");

  const fetchQuestion = async () => {
    try {
      const questionData = await getQuestionWithFileUrl(id);

      console.log("게시글 조회 성공");
      setQuestion(questionData);
    } catch (error) {
      console.log("게시글 정보를 불러오지 못했습니다.", error);
      setError("게시글이 삭제되었거나 존재하지 않습니다.");
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  const memberInfo = async () => {
    try {
      const memberInfo = await getMyInfoById(studyId, authToken);
      setMemberId(memberInfo.memberId);
    } catch (error) {
      console.log("로그인된 사용자 정보를 불러오지 못했습니다.", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
    memberInfo();
  }, [id, authToken]);

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        deleteQuestion(id, authToken);
        console.log("게시글 삭제 성공");
        alert("게시글이 삭제되었습니다.");
        navigate(`/study-info/${studyId}`); // 스터디 페이지로 이동
      } catch (error) {
        console.log("게시글 삭제 실패");
      }
    }
  };

  // 로딩 상태
  if (loading) return <div className="container">Loading...</div>;

  if (error)
    return (
      <div className="container">
        <p>{error}</p>
        <button onClick={() => navigate("/")}>다른 글 보기</button>
      </div>
    );

  return (
    <div className="question-container">
      <h1>{question?.title}</h1>
      <p className="question-option">{question?.option}</p>
      <div className="question-meta">
        <p className="question-nickname">{question?.nickname || "알수없음"}</p>
        <p className="question-createdAt">{dateFormat(question?.createdAt)}</p>
      </div>

      {question?.fileName && (
        <div className="question-file">
          <div>첨부파일 : </div>
          <a href={`${question.url}`}>{question.fileName}</a>
        </div>
      )}
      <p
        className="question-content"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(String(question?.content)),
        }}
      />

      {question?.memberId === memberId && (
        <div className="action-buttons">
          <button
            className="edit-button"
            onClick={() =>
              navigate(`/edit-question/${question?.questionId}`, {
                state: { studyId },
              })
            }
          >
            수정
          </button>
          <button className="delete-button" onClick={() => handleDelete()}>
            삭제
          </button>
        </div>
      )}

      <hr />

      <AnswerList questionId={id} memberId={memberId} />
    </div>
  );
};

export default QuestionDetail;
