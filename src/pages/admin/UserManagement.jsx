import React, { useState, useEffect } from "react";
import "../../styles/admin/userManagement.css";
import UserEditModal from "../../components/Modals/UserEditModal";
import ResponsiveSidebar from "./../../components/ResponsiveSidebar";

const UserManagement = () => {
  // State for user data, search term, and filtered users
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleSidebarClose = () => {
    setIsSideBarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSideBarOpen((prev) => !prev); // 사이드바 열고 닫기 토글
  };

  // Fetch user data (mock or API)
  useEffect(() => {
    // Example data, replace with API call
    const mockData = [
      {
        id: 1,
        name: "홍길동",
        email: "hong@example.com",
        role: "관리자",
        studies: ["스터디 A", "스터디 B"],
      },
      {
        id: 2,
        name: "김철수",
        email: "kim@example.com",
        role: "일반 사용자",
        studies: ["스터디 A"],
      },
      {
        id: 3,
        name: "박영희",
        email: "park@example.com",
        role: "일반 사용자",
        studies: ["스터디 C", "스터디 D", "스터디 E"],
      },
    ];
    setUsers(mockData);
    setFilteredUsers(mockData);
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Handle delete user
  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleSaveUser = (updatedUser) => {
    // 수정된 사용자 정보로 업데이트 (API 호출 가능)
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  return (
    <div className="user-management-container">
      {isEditModalOpen && (
        <UserEditModal
          user={selectedUser}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}

      {/* 사이드바 */}
      <ResponsiveSidebar
        toggleSidebar={toggleSidebar}
        isOpen={isSideBarOpen}
        onClose={handleSidebarClose}
      />

      <div className="user-management-content">
        <h1>사용자 관리</h1>

        {/* 검색 필터 */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="사용자 이름 또는 이메일 검색"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* 사용자 목록 */}
        <table className="user-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>이메일</th>
              <th>권한</th>
              <th>소속 스터디</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.studies.length > 0 ? (
                    user.studies.join(", ")
                  ) : (
                    <span>없음</span>
                  )}
                </td>
                {/* 스터디 이름 클릭하면 스터디 상세 페이지 이동 */}
                {/* <td>
  {user.studies.length > 0 ? (
    user.studies.map((study) => (
      <a href={`/study/${study}`} key={study}>
        {study}
      </a>
    ))
  ) : (
    <span>없음</span>
  )}
</td> */}
                <td>
                  <button onClick={() => handleEditClick(user)}>수정</button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 사용자 없음 메시지 */}
        {filteredUsers.length === 0 && <p>검색 결과가 없습니다.</p>}
      </div>
    </div>
  );
};

export default UserManagement;
