import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuestionForm from "../components/QuestionForm";
import {
  createQuestion,
  getQuestionWithFileUrl,
  updateQuestionWithFile,
} from "../services/QuestionApiService";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Feedback/Loading";

const QuestionFormPage = ({ isModify }) => {
  const navigate = useNavigate();

  const LocationDom = useLocation();
  const { studyId } = LocationDom.state || {};
  const { id } = useParams();
  const { authToken } = useAuth();

  const [questionInitData, setQuestionInitData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isModify) {
      // 수정 모드일 때 데이터 불러옴
      const fetchQuestion = async () => {
        try {
          const questionData = await getQuestionWithFileUrl(id);

          setQuestionInitData(questionData);
        } catch (error) {
          console.error("게시글 정보를 불러오지 못했습니다.", error);
          setError("게시글 정보를 불러오지 못했습니다.");
        }
      };
      fetchQuestion();
    }
  }, [isModify, id]);

  const handleCreateQuestion = async (questionData) => {
    setLoading(true);
    try {
      if (isModify) {
        await updateQuestionWithFile(id, questionData, authToken);

        navigate(`/question-detail/${id}`, { state: { studyId } });
      } else {
        await createQuestion(studyId, questionData, authToken);

        navigate(`/study-info/${studyId}`);
      }
    } catch (error) {
      console.error(`게시글 ${isModify ? "수정" : "생성"} 실패`, error);
      setError(
        "저장 실패하였습니다.\n로그인 정보 또는 스터디 가입 정보를 확인해주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) {
    alert(error);
    setError("");
  }

  return (
    <div>
      <h1>{isModify ? "게시글 수정하기" : "새로운 게시글 작성"}</h1>
      <QuestionForm
        onSubmit={handleCreateQuestion}
        question={questionInitData}
        isModify={isModify}
      />
    </div>
  );
};

export default QuestionFormPage;
