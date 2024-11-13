import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnswerList from "../components/AnswerList";
import { dateFormat } from "../services/QuestionService"
import { getQuestion, deleteQuestion, createAnswer } from "../services/apiService";
import "../styles/QuestionDetail.css";

const QuestionDetail = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const scrollRef = useRef();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [question, setQuestion] = useState(null);

    const [answer, setAnswer] = useState("");

    const fetchQuestion = async () => {
        try {
            const questionData = await getQuestion(id);

            console.log("게시글 조회 성공");
            setQuestion(questionData);
        } catch (error) {
            console.log("게시글 정보를 불러오지 못했습니다.", error);
            setError("게시글 정보를 불러오지 못했습니다.");
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
    
    const onSubmit = async () => {
        try {
            const response = await createAnswer({
                content : answer, 
                questionId : id, 
                memberId : "user2" // 임시 userId
            });
            console.log("댓글 작성 성공");
            
            setAnswer(""); // 댓글 작성 후 입력창 초기화
            setTimeout(()=>{fetchQuestion()}, 500);
            setTimeout(()=>{scrollRef.current?.scrollIntoView({ behavior: 'auto' })}, 600);
        } catch (error) {
            console.log("댓글 작성 실패", error);
        }        
    }
    
    // 로딩 상태
    if (loading) return <div>Loading...</div>;

    if (error) return <div>{error}</div>

    return (
        <div className="container">
            <h1>{question?.title}</h1>
            <p className="option">{question?.option}</p>
            <div className="meta">
                <p className="nickname">{question?.nickname}</p>
                <p className="createdAt">{dateFormat(question?.createdAt)}</p>
            </div>
            <p className="content">{question?.content}</p>

            {/* 작성자에게만 보이도록 수정 */}
            {question?.memberId === "사용자ID" && (
                <div className="action-buttons">
                    <button className="edit-button" onClick={() => navigate(`/edit-question/${question?.questionId}`)}>수정</button>
                    <button className="delete-button" onClick={() => handleDelete()}>삭제</button>
                </div>
            )}
            <div className="action-buttons">
                <button className="edit-button" onClick={() => navigate(`/edit-question/${question?.questionId}`)}>수정</button>
                <button className="delete-button" onClick={() => handleDelete()}>삭제</button>
            </div>

            <hr />

            <AnswerList answers={question?.answers} fetch={fetchQuestion} />
            <div id="answer-input" className="answer-input-section" ref={scrollRef}>
                <input type="text" placeholder="댓글을 남겨보세요" className="answer-input" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
                <button onClick={onSubmit}>등록</button>
            </div>
        </div>
    );
};

export default QuestionDetail;