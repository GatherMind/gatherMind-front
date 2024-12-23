import React from "react";
import "../styles/BoardTab.css";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const BoardsTab = ({
  boards,
  boardsPage,
  boardsTotalPages,
  boardsTotalElements,
  onPageChange,
  studyId,
}) => {
  const navigate = useNavigate();
  const size = 9;

  const handleClick = (questionId) => {
    navigate(`/question-detail/${questionId}`, { state: { studyId } });
  };

  const stripHTMLTags = (content) => {
    return content.replace(/<\/?[^>]+(>|$)/g, ""); // 정규식으로 HTML 태그 제거
  };

  return (
    <div className="board-tab-container">
      <div className="tab-header">
        <h3>게시판 목록</h3>
        <button
          className="create-button"
          onClick={() => navigate(`/create-question`, { state: { studyId } })}
        >
          글쓰기
        </button>
      </div>

      {boards.length > 0 ? (
        <>
          <div className="board-list">
            {boards.map((board, index) => {
              const boardNumber =
                boardsTotalElements - boardsPage * size - index;

              return (
                <div
                  key={board.questionId}
                  className="board-card"
                  onClick={() => handleClick(board.questionId)}
                >
                  <div className="board-card-header">
                    <span className="board-number">{boardNumber}</span>
                    <span className="board-option">
                      [{board.questionOption}]
                    </span>
                  </div>
                  <div className="board-title">{board.title}</div>
                  <div className="board-content">
                    {stripHTMLTags(board.content)}
                  </div>
                  <div className="board-date">{board.createdAt}</div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="no-boards">
          게시판이 없습니다. 게시판을 만들어 보세요.
        </div>
      )}
      <Pagination
        currentPage={boardsPage}
        totalPages={boardsTotalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default BoardsTab;
