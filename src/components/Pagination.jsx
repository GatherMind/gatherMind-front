import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        className="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      {[...Array(totalPages).keys()]
        .slice(
          Math.max(0, currentPage - 2),
          Math.min(totalPages, currentPage + 3)
        )
        .map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            disabled={currentPage === pageNumber}
            className={`${currentPage === pageNumber ? "active" : ""} button`}
          >
            {pageNumber + 1}
          </button>
        ))}
      <button
        className="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
