import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import AnswerList from "../components/AnswerList";
import Loading from "./../components/Feedback/Loading";
import { dateFormat } from "../services/QuestionService";
import {
  deleteQuestion,
  getQuestionWithFileUrl,
} from "../services/QuestionApiService";
import { getMyInfoById } from "../services/MemberApiService";
import { useAuth } from "../context/AuthContext";
import "../styles/QuestionDetail.css";
import "../styles/global/ReactQuill.css";
import "../styles/global/Button.css"
import "../components/Feedback/ErrorMessage.css";
import { TABS } from "../constants/constants";
import ConfirmModal from "../components/ConfirmModal";

const QuestionDetail = () => {
  const { id } = useParams();
  const LocationDom = useLocation();
  const { studyId } = LocationDom.state || {};

  const { authToken } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState(null);
  const [memberId, setMemberId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestion = async () => {
    try {
      const questionData = await getQuestionWithFileUrl(id);
      console.log(questionData);
      setQuestion(questionData);
    } catch (error) {
      console.error("게시글 정보를 불러오지 못했습니다.", error);
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
      console.error("로그인된 사용자 정보를 불러오지 못했습니다.", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
    memberInfo();
  }, [id, studyId, authToken]);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      deleteQuestion(id, authToken);
      navigate(`/study-info/${studyId}`); // 스터디 페이지로 이동
    } catch (error) {
      console.error("게시글 삭제 실패", error);
    }
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="error-message">
        <p>{error}</p>
        <button className="retry-button" onClick={() => navigate("/")}>다른 글 보기</button>
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
            className="button edit-button"
            onClick={() =>
              navigate(`/edit-question/${question?.questionId}`, {
                state: { studyId },
              })
            }
          >
            수정
          </button>
          <button className="button button-error" onClick={() => handleDeleteClick()}>
            삭제
          </button>
        </div>
      )}

      <hr />

      <AnswerList questionId={id} memberId={memberId} />

      {isModalOpen && (
        <ConfirmModal
          message="정말 삭제하시겠습니까?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default QuestionDetail;
