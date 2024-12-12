import React, { useState, useEffect } from "react";
import "../../styles/admin/contentManagement.css";

const ContentManagement = () => {
  const [contentList, setContentList] = useState([]); // 콘텐츠 리스트
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [filteredContent, setFilteredContent] = useState([]); // 필터링된 콘텐츠

  // 콘텐츠 데이터 가져오기 (예제 데이터)
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: "게시글 제목 1",
        author: "사용자 1",
        type: "게시글",
        date: "2024-12-10",
      },
      {
        id: 2,
        title: "댓글 내용 1",
        author: "사용자 2",
        type: "댓글",
        date: "2024-12-09",
      },
      {
        id: 3,
        title: "리뷰 제목 1",
        author: "사용자 3",
        type: "리뷰",
        date: "2024-12-08",
      },
    ];
    setContentList(mockData);
    setFilteredContent(mockData);
  }, []);

  // 검색 처리
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = contentList.filter(
      (content) =>
        content.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        content.author.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredContent(filtered);
  };

  // 콘텐츠 삭제
  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const updatedContent = contentList.filter((content) => content.id !== id);
      setContentList(updatedContent);
      setFilteredContent(updatedContent);
    }
  };

  return (
    <div className="content-management-container">
      <h1>콘텐츠 관리</h1>

      {/* 검색 바 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="콘텐츠 제목 또는 작성자 검색"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* 콘텐츠 테이블 */}
      <table className="content-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>유형</th>
            <th>작성일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {filteredContent.map((content) => (
            <tr key={content.id}>
              <td>{content.title}</td>
              <td>{content.author}</td>
              <td>{content.type}</td>
              <td>{content.date}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(content.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
          {filteredContent.length === 0 && (
            <tr>
              <td colSpan="5">검색 결과가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContentManagement;
