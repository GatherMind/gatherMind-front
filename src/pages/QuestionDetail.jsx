import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnswerList from "../components/AnswerList";
import { dateFormat } from "../services/QuestionService"
import { getQuestion, deleteQuestion } from "../services/apiService";
import "../styles/QuestionDetail.css";

const QuestionDetail = () => {

    const userId = "user2"; // 임시

    const {id} = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [question, setQuestion] = useState(null);

    const fetchQuestion = async () => {
        try {
            const questionData = await getQuestion(id);

            console.log("게시글 조회 성공");
            setQuestion(questionData);
        } catch (error) {
            console.log("게시글 정보를 불러오지 못했습니다.", error);
            setError("게시글이 삭제되었거나 존재하지 않습니다.");
        } finally {
            setLoading(false); // 로딩 상태 해제
        }
    };

    useEffect(() => {
        fetchQuestion();
    }, [id]);
    
    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                deleteQuestion(id);
                console.log("게시글 삭제 성공");
                alert("게시글이 삭제되었습니다.");
                navigate('/'); // 메인 페이지로 이동
            } catch (error) {
                console.log("게시글 삭제 실패");
            }
        }
    }
    
    // 로딩 상태
    if (loading) return <div className="container">Loading...</div>;

    if (error) return <div className="container"><p>{error}</p><button onClick={() => navigate('/')}>다른 글 보기</button></div>

    return (
        <div className="container">
            <h1>{question?.title}</h1>
            <p className="option">{question?.option}</p>
            <div className="meta">
                <p className="nickname">{question?.nickname}</p>
                <p className="createdAt">{dateFormat(question?.createdAt)}</p>
            </div>
            <p className="content">{question?.content}</p>

            {question?.memberId === userId && (
                <div className="action-buttons">
                    <button className="edit-button" onClick={() => navigate(`/edit-question/${question?.questionId}`)}>수정</button>
                    <button className="delete-button" onClick={() => handleDelete()}>삭제</button>
                </div>
            )}

            <hr />

            <AnswerList questionId={id}/>
            
        </div>
    );
};

export default QuestionDetail;