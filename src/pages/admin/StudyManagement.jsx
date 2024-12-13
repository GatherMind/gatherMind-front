import React, { useState, useEffect } from "react";
import "../../styles/admin/studyManagement.css";
import { CATEGORY_ALL } from "../../constants/constants";
import { getAllStudies } from "./../../services/StudyApiService";
import { getStudyCategory } from "../../services/StudyCategoryApiService";
import { deleteStudy, modifyStudy } from "../../services/AdminApiService";

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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllStudies();

        setStudies(response.data);
        setFilteredStudies(response.data);

        const studyCategory = await getStudyCategory();
        setCategories(studyCategory);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // 검색 처리
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = studies.filter((study) =>
      study.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredStudies(filtered);
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
    setEditStudyName(study.title);
    setEditStudyDescription(study.description);
  };

  // 스터디 수정
  const handleSaveEditStudy = async () => {
    if (!editStudyName.trim() || !editStudyDescription.trim()) {
      alert("스터디 이름과 설명을 입력하세요.");
      return;
    }

    try {
      // 수정된 스터디 데이터를 새로운 객체로 생성
      const updatedStudy = {
        ...editStudy,
        title: editStudyName,
        description: editStudyDescription,
      };

      await modifyStudy(updatedStudy);

      setStudies((prevStudies) => {
        const updatedStudies = prevStudies.map((study) =>
          study.studyId === editStudy.studyId ? updatedStudy : study
        );
        setFilteredStudies(updatedStudies);
        return updatedStudies;
      });

      setEditStudy(null);
      setEditStudyName("");
      setEditStudyDescription("");
    } catch (error) {
      console.error(error);
      alert("스터디 수정에 실패했습니다.");
    }
  };

  // 스터디 삭제
  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteStudy(id);
        const updatedStudies = studies.filter((study) => study.studyId !== id);
        setStudies(updatedStudies);
        setFilteredStudies(updatedStudies);
      } catch (error) {
        alert("스터디 삭제를 실패했습니다.");
      }
    }
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

  //스터디 관리
  const handleManageMembers = (study) => {
    setSelectedStudy(study);
    setMemberList(study.members || []); // 멤버가 없으면 빈 배열
  };

  // 멤버 추가
  const handleAddMember = () => {
    if (!newMember.trim()) return;
    setMemberList((prev) => [...prev, newMember]);
    setNewMember("");
  };

  // 멤버 삭제
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
          {categories.map((category) => (
            <option key={category.code} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* 새로운 스터디 추가 */}
      {/* <div className="add-study">
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
      </div> */}

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
            <tr key={study.studyId}>
              <td>
                {editStudy && editStudy.studyId === study.studyId ? (
                  <input
                    type="text"
                    value={editStudyName}
                    onChange={(e) => setEditStudyName(e.target.value)}
                  />
                ) : (
                  study.title
                )}
              </td>
              <td>
                {" "}
                {editStudy && editStudy.studyId === study.studyId ? (
                  <textarea
                    value={editStudyDescription}
                    onChange={(e) => setEditStudyDescription(e.target.value)}
                  />
                ) : (
                  study.description
                )}
              </td>
              <td>
                {editStudy && editStudy.studyId === study.studyId ? (
                  <button onClick={handleSaveEditStudy}>저장</button>
                ) : (
                  <button onClick={() => handleEditStudy(study)}>수정</button>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(study.studyId)}
                >
                  삭제
                </button>
                {/* <button onClick={() => handleManageMembers(study)}>
                  멤버 관리
                </button> */}
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
