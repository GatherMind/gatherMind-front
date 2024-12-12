import React, { useState, useEffect } from "react";
import "../../styles/admin/studyManagement.css";
import { CATEGORY_ALL } from "../../constants/constants";

const StudyManagement = () => {
  const [studies, setStudies] = useState([]); // 스터디 리스트
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [filteredStudies, setFilteredStudies] = useState([]); // 필터링된 스터디
  const [newStudyName, setNewStudyName] = useState(""); // 새로운 스터디 이름
  const [newStudyDescription, setNewStudyDescription] = useState(""); // 새로운 스터디 설명

  // 스터디 수정
  const [editStudy, setEditStudy] = useState(null);
  const [editStudyName, setEditStudyName] = useState("");
  const [editStudyDescription, setEditStudyDescription] = useState("");

  const [selectedStudy, setSelectedStudy] = useState(null);
  const [memberList, setMemberList] = useState([]);
  const [newMember, setNewMember] = useState(null);

  // 카테고리별 필터링
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_ALL);
  // 스터디 데이터 가져오기 (예제 데이터)
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: "스터디 A",
        description: "화학공학 기초 스터디",
        category: "기술",
      },
      {
        id: 2,
        name: "스터디 B",
        description: "리액터 설계 심화 스터디",
        category: "학문",
      },
      {
        id: 3,
        name: "스터디 C",
        description: "취업 준비를 위한 모임",
        category: "취업",
      },
    ];
    setStudies(mockData);
    setFilteredStudies(mockData);
  }, []);

  // 검색 처리
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = studies.filter((study) =>
      study.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredStudies(filtered);
  };

  // 스터디 삭제
  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const updatedStudies = studies.filter((study) => study.id !== id);
      setStudies(updatedStudies);
      setFilteredStudies(updatedStudies);
    }
  };

  // 새로운 스터디 추가
  const handleAddStudy = () => {
    if (!newStudyName.trim() || !newStudyDescription.trim()) {
      alert("스터디 이름과 설명을 모두 입력하세요.");
      return;
    }
    const newStudy = {
      id: Date.now(),
      name: newStudyName,
      description: newStudyDescription,
    };
    setStudies((prevStudies) => [...prevStudies, newStudy]);
    setFilteredStudies((prevFilteredStudies) => [
      ...prevFilteredStudies,
      newStudy,
    ]);

    setNewStudyName("");
    setNewStudyDescription("");
  };

  // 스터디 수정
  const handleEditStudy = (study) => {
    setEditStudy(study);
    setEditStudyName(study.name);
    setEditStudyDescription(study.description);
  };

  // 스터디 수정
  const handleSaveEditStudy = () => {
    if (!editStudyName.trim() || !editStudyDescription.trim()) {
      alert("스터디 이름과 설명을 입력하세요.");
      return;
    }

    setStudies((prevStudies) => {
      const updatedStudies = prevStudies.map((study) =>
        study.id === editStudy.id
          ? { ...study, name: editStudyName, description: editStudyDescription }
          : study
      );
      setFilteredStudies(updatedStudies);
      return updatedStudies;
    });

    setEditStudy(null);
    setEditStudyName("");
    setEditStudyDescription("");
  };

  //스터디 관리
  const handleManageMembers = (study) => {
    setSelectedStudy(study);
    setMemberList(study.members || []); // 멤버가 없으면 빈 배열
  };

  // 스터디 멤버 추가
  const handleAddMember = () => {
    if (!newMember.trim()) return;
    setMemberList((prev) => [...prev, newMember]);
    setNewMember("");
  };

  //스터디 멤버 삭제
  const handleRemoveMember = (member) => {
    setMemberList((prev) => prev.filter((m) => m !== member));
  };

  // 멤버 저장
  const handleSaveMembers = () => {
    setStudies((prevStudies) =>
      prevStudies.map((study) =>
        study.id === selectedStudy.id
          ? { ...study, members: memberList }
          : study
      )
    );
    setSelectedStudy(null);
  };

  //카테고리 별 필터링
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);

    const filteredByCategory = studies.filter(
      (study) => newCategory === CATEGORY_ALL || study.category === newCategory
    );
    setFilteredStudies(filteredByCategory);
  };

  return (
    <div className="study-management-container">
      <h1>스터디 관리</h1>

      {/* 검색 바 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="스터디 이름 검색"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="category-filter">
        <label htmlFor="category">카테고리:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value={CATEGORY_ALL}>전체</option>
          <option value="기술">기술</option>
          <option value="학문">학문</option>
          <option value="취업">취업</option>
        </select>
      </div>

      {/* 새로운 스터디 추가 */}
      <div className="add-study">
        <input
          type="text"
          placeholder="스터디 이름"
          value={newStudyName}
          onChange={(e) => setNewStudyName(e.target.value)}
        />
        <textarea
          placeholder="스터디 설명"
          value={newStudyDescription}
          onChange={(e) => setNewStudyDescription(e.target.value)}
        />
        <button onClick={handleAddStudy}>추가</button>
      </div>

      {/* 스터디 목록 */}
      <table className="study-table">
        <thead>
          <tr>
            <th>스터디 이름</th>
            <th>설명</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudies.map((study) => (
            <tr key={study.id}>
              <td>
                {editStudy && editStudy.id === study.id ? (
                  <input
                    type="text"
                    value={editStudyName}
                    onChange={(e) => setEditStudyName(e.target.value)}
                  />
                ) : (
                  study.name
                )}
              </td>
              <td>
                {" "}
                {editStudy && editStudy.id === study.id ? (
                  <textarea
                    value={editStudyDescription}
                    onChange={(e) => setEditStudyDescription(e.target.value)}
                  />
                ) : (
                  study.description
                )}
              </td>
              <td>
                {editStudy && editStudy.id === study.id ? (
                  <button onClick={handleSaveEditStudy}>저장</button>
                ) : (
                  <button onClick={() => handleEditStudy(study)}>수정</button>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(study.id)}
                >
                  삭제
                </button>
                <button onClick={() => handleManageMembers(study)}>
                  멤버 관리
                </button>
              </td>
            </tr>
          ))}
          {filteredStudies.length === 0 && (
            <tr>
              <td colSpan="3">검색 결과가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudyManagement;
