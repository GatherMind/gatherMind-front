import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionForm from "../components/QuestionForm";

const QuestionFormPage = ({ isModify }) => {
  const navigate = useNavigate();
  //   const { studyId } = useLocation(); // StudyInfo 페이지에서 StudyId 값 받아오기

  // StudyInfo 페이지에서 StudyId 값 받아오기
  // 24.11.11 suhwan
  const LocationDom = useLocation();
  const { studyId } = LocationDom.state || {};

  const [questionInitData, setQuestionInitData] = useState(null);

  useEffect(() => {
    if (isModify) {
      const fetchAppointment = async () => {
        try {
          const data = await axios.get(``);
          console.log("게시글 조회 성공");

          // console.log(response);
          setQuestionInitData(data.data);
        } catch (error) {
          console.log("게시글 조회 실패");
        }
      };
      fetchAppointment();
    }
  }, [isModify, questionInitData]);

  const handleCreateQuestion = async (questionData) => {
    console.log(questionData);

    try {
      var response = null;

      if (isModify) {
        response = await axios.put(``, questionData);
        console.log("질문 수정 완료 ", response);
      } else {
        // response = await axios.post(`http://localhost:8080/api/question?memberId=${userId}&studyId=${studyId}`, questionData);
        response = await axios.post(
          `http://localhost:8080/api/question?memberId=user1&studyId=1`,
          questionData
        ); // userId, studyId 받아오도록 수정
        console.log("질문 생성 완료 ", response);
      }
    } catch (error) {
      console.log(`질문 ${isModify ? "수정" : "생성"} 실패`);
    }

    navigate(""); // 스터디 메인 페이지로 이동하도록 수정
  };

  return (
    <div className="container">
      <h1>{isModify ? "게시글 수정하기" : "새로운 게시글 작성"}</h1>
      <QuestionForm
        onSubmit={handleCreateQuestion}
        studyId={studyId}
        question={questionInitData}
      />
    </div>
  );
};

export default QuestionFormPage;
