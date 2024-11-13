import React, { useState } from "react";
import { dateFormat } from "../services/QuestionService";
import { updateAnswer, deleteAnswer } from "../services/apiService"

const Answer = ({answer, fetch, scrollToRef}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(answer.content);

    const handleEdit = () => {
        if (isEditing) setEditedContent(answer.content); // 수정 취소 시 원래 데이터로 돌아감
        setIsEditing(!isEditing);
    }

    const handleSave = async () => {
        if (editedContent === "") {
            alert("내용을 입력해주세요.");
            return;
        }
        try {
            const response = await updateAnswer(answer.answerId, editedContent);
            console.log("댓글 수정 완료");

            setIsEditing(false);
            setTimeout(()=>{fetch()}, 500);
            setTimeout(()=>{scrollToRef()}, 800);
        } catch (error) {
            console.log("댓글 수정 실패", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            deleteAnswer(answer.answerId);
            setTimeout(()=>{fetch()}, 500);
            alert("댓글이 삭제되었습니다.");
        }
    }

    return (
        <div>
            <p className="answer-nickname">{answer.nickname}</p>
            {isEditing ? (
                // 수정 모드
                <div className="edit-mode">
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="edit-input"
                    />
                    <div className="edit-buttons">
                        <button onClick={handleSave} className="save-button">저장</button>
                        <button onClick={handleEdit} className="cancel-button">취소</button>
                    </div>
                </div>
            ) : (
                // 수정 모드가 아닐 때
                <>
                    <div className="answer-content">{answer.content}</div>
                    <div className="answer-meta">
                        <p className="createdAt">{dateFormat(answer.createdAt)}</p>
                        {/* 작성자에게만 보이도록 수정 */}
                        {answer?.memberId === "사용자ID" && (
                            <div className="action-buttons">
                                <button className="edit-button" onClick={handleEdit}>수정</button>
                                <button className="delete-button" onClick={handleDelete}>삭제</button>
                            </div>
                        )}
                        <div className="action-buttons">
                            <button className="edit-button" onClick={handleEdit}>수정</button>
                            <button className="delete-button" onClick={handleDelete}>삭제</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Answer;