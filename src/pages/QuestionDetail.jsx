import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnswerList from "../components/AnswerList";
import "../styles/QuestionDetail.css";

const QuestionDetail = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState(null);

    const [answer, SetAnswer] = useState("");

    const fetchAppointment = async () => {
        try {
            const data = await axios.get(`http://localhost:8080/api/question/${id}`);
            console.log("게시글 조회 성공");
            
            // console.log(response);
            setQuestion(data.data);
            setLoading(false); // 로딩 상태 해제
        } catch (error) {
            console.log("게시글 조회 실패");
            setLoading(false); // 로딩 상태 해제
        }

        
    };
    useEffect(() => {
        fetchAppointment();
    }, [id]);

    // 로딩 상태
    if (loading) return <div>Loading...</div>;

    const handleDelete = (id) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {

        }
    }

    const onSubmit = () => {
        try {
            const response = axios.patch(``, {answers : [...question.answers, {}]})
            console.log("댓글 작성 성공" , response);
        } catch (error) {
            console.log("댓글 작성 실패", error);
        }
        navigate('./');
    }

    return (
        <div className="container">
            <h1>{question?.title}</h1>
            <p className="option">{question?.option}</p>
            <div className="meta">
                <p className="nickname">{question?.nickname}</p>
                <p className="createdAt">{question?.createdAt}</p>
            </div>
            <p className="content">{question?.content}</p>

            {/* 작성자에게만 보이도록 수정 */}
            {question?.memberId === "사용자ID" && (
                <div className="action-buttons">
                    <button className="edit-button" onClick={() => navigate(`/edit-question/${question?.questionId}`)}>수정</button>
                    <button className="delete-button" onClick={() => handleDelete(question.id)}>삭제</button>
                </div>
            )}
            <div className="action-buttons">
                <button className="edit-button" onClick={() => navigate(`/edit-question/${question?.questionId}`)}>수정</button>
                <button className="delete-button" onClick={() => handleDelete(question?.questionId)}>삭제</button>
            </div>

            <hr />

            <p className="answer-count">댓글 {question?.answers.length}</p>
            <AnswerList answers={question?.answers} />
            <div className="answer-input-section">
                <input type="text" placeholder="댓글을 남겨보세요" className="answer-input" />
                <button onClick={onSubmit}>등록</button>
            </div>
        </div>
    );
};

export default QuestionDetail;