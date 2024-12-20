import React, { useState, useEffect } from "react";
import "../../styles/admin/userManagement.css";
import UserEditModal from "../../components/Modals/UserEditModal";
import ResponsiveSidebar from "./../../components/ResponsiveSidebar";
import {
  deleteMember,
  getMembers,
  modifyMember,
} from "../../services/AdminApiService";

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMembers();
      setUsers(response);
      setFilteredUsers(response);
    };
    fetchData();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = users.filter(
      (user) =>
        user.nickname.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Handle delete user
  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteMember(id);
        const updatedUsers = users.filter((user) => user.memberId !== id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      } catch (error) {
        alert("멤버 삭제를 실패했습니다.");
      }
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleSaveUser = async (updatedUser) => {
    // 수정된 사용자 정보로 업데이트 (API 호출 가능)
    try {
      await modifyMember(updatedUser);

      const updatedUsers = users.map((u) =>
        u.memberId === updatedUser.memberId ? updatedUser : u
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      alert("사용자 정보가 성공적으로 업데이트되었습니다!");
    } catch (error) {
      if (typeof error === "object") {
        // JSON 형태의 에러 메시지를 처리
        const errorMessages = Object.values(error).join("\n"); // 에러 메시지를 문자열로 변환
        alert(`수정 실패:\n${errorMessages}`);
      } else {
        // 예상치 못한 오류 처리
        alert("예기치 못한 오류가 발생했습니다.");
      }
    }
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
            placeholder="사용자 닉네임 또는 이메일 검색"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* 사용자 목록 */}
        <table className="user-table">
          <thead>
            <tr>
              <th>아이디</th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>권한</th>
              <th>소속 스터디</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.memberId}</td>
                <td>{user.nickname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.title !== null ? user.title : <span>없음</span>}</td>
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
                <td className="button-container">
                  <button
                    className="button"
                    onClick={() => handleEditClick(user)}
                  >
                    수정
                  </button>
                  <button
                    className="button-error"
                    onClick={() => handleDelete(user.memberId)}
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
