import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuestionForm from "../components/QuestionForm";
import { createQuestion, getQuestion, updateQuestion } from "../services/apiService";

const QuestionFormPage = ({ isModify }) => {
    const navigate = useNavigate();
    //   const { studyId } = useLocation(); // StudyInfo 페이지에서 StudyId 값 받아오기

    // StudyInfo 페이지에서 StudyId 값 받아오기
    // 24.11.11 suhwan
    const LocationDom = useLocation();
    const { studyId } = LocationDom.state || {};
    const {id} = useParams();

    const [questionInitData, setQuestionInitData] = useState(null);
    
    useEffect(() => {
        if (isModify) { // 수정 모드일 때 데이터 불러옴
            const fetchQuestion = async () => {
                try {
                    const questionData = await getQuestion(id);
                    console.log("게시글 조회 성공");
                    
                    setQuestionInitData(questionData);
                } catch (error) {
                    console.log("게시글 정보를 불러오지 못했습니다.", error);
                }
            };
            fetchQuestion();
        }
    }, [isModify, id]);

    const handleCreateQuestion = async (questionData) => {
        try {
            var response = null;

            if (isModify) {
                response = await updateQuestion(id, questionData); 
                console.log("게시글 수정 완료");
                navigate(`/question-detail/${id}`);
            } else {
                // response = await createQuestion(userId, studyId, questionData); // userId 받아오도록 수정
                response = await createQuestion("user1", 1, questionData);
                
                console.log("게시글 생성 완료");
                navigate(`/study-info/${studyId}`);
            }
            } catch (error) {
            console.log(`게시글 ${isModify ? "수정" : "생성"} 실패`, error);
        }
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
