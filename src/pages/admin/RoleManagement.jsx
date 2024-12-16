import React, { useState, useEffect } from "react";
import "../../styles/admin/roleManagement.css";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]); // 역할 목록
  const [newRole, setNewRole] = useState(""); // 새로운 역할 입력값
  const [editRole, setEditRole] = useState(null); // 수정 중인 역할
  const [editRoleName, setEditRoleName] = useState(""); // 수정할 역할 이름

  // 역할 데이터 가져오기 (예제 데이터)
  useEffect(() => {
    const mockData = [
      { id: 1, name: "관리자" },
      { id: 2, name: "일반 사용자" },
    ];
    setRoles(mockData);
  }, []);

  // 역할 추가
  const handleAddRole = () => {
    if (newRole.trim() === "") {
      alert("역할 이름을 입력하세요.");
      return;
    }
    const newRoleData = { id: Date.now(), name: newRole };
    setRoles((prevRoles) => [...prevRoles, newRoleData]);
    setNewRole("");
  };

  // 역할 삭제
  const handleDeleteRole = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
    }
  };

  // 역할 수정
  const handleEditRole = (role) => {
    setEditRole(role);
    setEditRoleName(role.name);
  };

  const handleSaveEdit = () => {
    if (editRoleName.trim() === "") {
      alert("역할 이름을 입력하세요.");
      return;
    }
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === editRole.id ? { ...role, name: editRoleName } : role
      )
    );
    setEditRole(null);
    setEditRoleName("");
  };

  return (
    <div className="role-management-container">
      <h1>권한 관리</h1>

      {/* 역할 추가 */}
      <div className="add-role">
        <input
          type="text"
          placeholder="새로운 역할 추가"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button onClick={handleAddRole}>추가</button>
      </div>

      {/* 역할 목록 */}
      <table className="role-table">
        <thead>
          <tr>
            <th>역할 이름</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>
                {editRole && editRole.id === role.id ? (
                  <input
                    type="text"
                    value={editRoleName}
                    onChange={(e) => setEditRoleName(e.target.value)}
                  />
                ) : (
                  role.name
                )}
              </td>
              <td>
                {editRole && editRole.id === role.id ? (
                  <button onClick={handleSaveEdit}>저장</button>
                ) : (
                  <button onClick={() => handleEditRole(role)}>수정</button>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteRole(role.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
          {roles.length === 0 && (
            <tr>
              <td colSpan="2">등록된 역할이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
