import React, { useEffect, useState } from "react";

import "../css/Serchbar.css";

function Searchbar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 'Enter' 키가 눌렸을 때
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // 입력값이 변경될 때마다 상태 업데이트
      />
      <button className="search-button" onClick={handleSearch}>
        검색
      </button>
    </div>
  );
}

export default Searchbar;
