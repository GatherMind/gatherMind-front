import React, { useState } from "react";
import { dateFormat } from "../services/QuestionService";
import ConfirmModal from "./ConfirmModal";

const Answer = ({ memberId, answer, onDelete, onUpdate, scrollToRef }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    onDelete(answer.answerId);
    setIsModalOpen(false);
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
            <button onClick={handleUpdate} className="button">
              저장
            </button>
            <button onClick={handleEdit} className="button button-error">
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
                <button className="button edit-button" onClick={handleEdit}>
                  수정
                </button>
                <button className="button button-error" onClick={handleDeleteClick}>
                  삭제
                </button>
              </div>
            )}
          </div>
        </>
      )}
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

export default Answer;
