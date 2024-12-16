import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Previous 버튼 핸들러
  const handlePrevious = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  // Next 버튼 핸들러
  const handleNext = () => {
    if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
  };

  // 페이지 번호 생성 함수
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(0, currentPage - 2); // 현재 페이지 기준 앞 2개
    const endPage = Math.min(totalPages, currentPage + 3); // 현재 페이지 기준 뒤 2개

    if (startPage > 0) pages.push(0); // 항상 첫 페이지 추가
    if (startPage > 1) pages.push("..."); // 생략 표시

    for (let i = startPage; i < endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("..."); // 생략 표시
    if (endPage < totalPages) pages.push(totalPages - 1); // 항상 마지막 페이지 추가

    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="button btn-left"
        onClick={handlePrevious}
        disabled={currentPage === 0}
      >
        Previous
      </button>

      {/* 페이지 번호 렌더링 */}
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="dots">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
            className={`button no-radius ${
              currentPage === page ? "active" : ""
            }`}
          >
            {page + 1}
          </button>
        )
      )}

      <button
        className="button btn-right"
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
