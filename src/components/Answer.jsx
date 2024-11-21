import React, { useState } from "react";
import { dateFormat } from "../services/QuestionService";

const Answer = ({ memberId, answer, onDelete, onUpdate, scrollToRef }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(answer.content);

  const handleEdit = () => {
    if (isEditing) setEditedContent(answer.content); // 수정 취소 시 원래 데이터로 돌아감
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    if (editedContent === "") {
      alert("내용을 입력해주세요.");
      return;
    }
    onUpdate(answer.answerId, editedContent);

    setIsEditing(false);
    scrollToRef();
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onDelete(answer.answerId);
      alert("댓글이 삭제되었습니다.");
    }
  };

  return (
    <div className="answer-list-items">
      <p className="answer-nickname">{answer.nickname || "알수없음"}</p>
      {isEditing ? (
        // 수정 모드
        <div className="edit-mode">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="edit-input"
          />
          <div className="edit-buttons">
            <button onClick={handleUpdate} className="save-button">
              저장
            </button>
            <button onClick={handleEdit} className="cancel-button">
              취소
            </button>
          </div>
        </div>
      ) : (
        // 수정 모드가 아닐 때
        <>
          <div className="answer-content">{answer.content}</div>
          <div className="answer-meta">
            <p className="createdAt">{dateFormat(answer.createdAt)}</p>
            {answer?.memberId === memberId && (
              <div className="action-buttons">
                <button className="edit-button" onClick={handleEdit}>
                  수정
                </button>
                <button className="delete-button" onClick={handleDelete}>
                  삭제
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Answer;
