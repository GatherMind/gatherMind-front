import React, { useState, useEffect } from "react";
import "../../styles/admin/contentManagement.css";
import { deleteContent, getAllContent } from "./../../services/AdminApiService";
import { dateFormat } from "./../../services/QuestionService";

const ContentManagement = () => {
  const [contentList, setContentList] = useState([]); // 콘텐츠 리스트
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [filteredContent, setFilteredContent] = useState([]); // 필터링된 콘텐츠

  // 콘텐츠 데이터 가져오기 (예제 데이터)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllContent();
        setContentList(response);
        setFilteredContent(response);
      } catch (error) {
        console.error("Network error or server unreachable: ", error);
      }
    };
    fetchData();
  }, []);

  // 검색 처리
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    const filtered = contentList.filter((content) => {
      // Ensure content.title and content.author are defined before accessing toLowerCase()
      const title = content.title?.toLowerCase() || ""; // Fallback to empty string if undefined
      const author = content.memberId?.toLowerCase() || ""; // Fallback to empty string if undefined
      const searchTerm = e.target.value.toLowerCase();

      return title.includes(searchTerm) || author.includes(searchTerm);
    });

    setFilteredContent(filtered);
  };

  // 콘텐츠 삭제
  const handleDelete = async (id, type) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteContent(id, type);

        const updatedContent = contentList.filter(
          (content) => content.id !== id
        );
        setContentList(updatedContent);
        setFilteredContent(updatedContent);
      } catch (error) {
        console.error("Network error or server unreachable: ", error);
      }
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
            <tr key={content.type + content.id}>
              <td>{content.title}</td>
              <td>{content.memberId}</td>
              <td>{content.type}</td>
              <td>{dateFormat(content.createdAt)}</td>
              <td className="button-container">
                <button
                  className="button"
                  onClick={() => handleDelete(content.id, content.type)}
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
