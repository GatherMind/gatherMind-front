import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuestionForm from "../components/QuestionForm";
import {
  createQuestion,
  getQuestion,
  updateQuestion,
} from "../services/QuestionApiService";
import { useAuth } from "../context/AuthContext";

const QuestionFormPage = ({ isModify }) => {
  const navigate = useNavigate();

  const LocationDom = useLocation();
  const { studyId } = LocationDom.state || {};
  const { id } = useParams();
  const { authToken } = useAuth();

  const [questionInitData, setQuestionInitData] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (isModify) {
      // 수정 모드일 때 데이터 불러옴
      const fetchQuestion = async () => {
        try {
          const questionData = await getQuestion(id);
          console.log("게시글 조회 성공");

          setQuestionInitData(questionData);
        } catch (error) {
          console.log("게시글 정보를 불러오지 못했습니다.", error);
          setError("게시글 정보를 불러오지 못했습니다.");
        }
      };
      fetchQuestion();
    }
  }, [isModify, id]);

  const handleCreateQuestion = async (questionData) => {
    try {

      if (isModify) {
        await updateQuestion(id, questionData);
        console.log("게시글 수정 완료");
        navigate(`/question-detail/${id}`, { state: { studyId } });
      } else {
        await createQuestion(studyId, questionData, authToken);

        console.log("게시글 생성 완료");
        navigate(`/study-info/${studyId}`);
      }
    } catch (error) {
      console.log(`게시글 ${isModify ? "수정" : "생성"} 실패`, error);
      setError("저장 실패하였습니다.\n로그인 정보 또는 스터디 가입 정보를 확인해주세요.");
    }
  };

  if (error) {
    alert(error);
    setError("");
  }

  return (
    <div className="container">
      <h1>{isModify ? "게시글 수정하기" : "새로운 게시글 작성"}</h1>
      <QuestionForm
        onSubmit={handleCreateQuestion}
        question={questionInitData}
      />
    </div>
  );
};

export default QuestionFormPage;
