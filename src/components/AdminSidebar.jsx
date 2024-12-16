import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <h2>관리자 메뉴</h2>
      <ul>
        <li>
          <Link to="/dashboard">
            <span className="dot">•</span>
            <span className="text">대시보드</span>
          </Link>
        </li>
        <li>
          <Link to="/user-management">
            <span className="dot">•</span>
            <span className="text">사용자 관리</span>
          </Link>
        </li>
        <li>
          <Link to="/content-management">
            <span className="dot">•</span>
            <span className="text">콘텐츠 관리</span>
          </Link>
        </li>
        <li>
          <Link to="/role-management">
            <span className="dot">•</span>
            <span className="text">권한 관리</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
