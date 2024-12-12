import React from "react";
import { Link } from "react-router-dom";
import "../styles/admin/responsiveSidebar.css";
import { useSidebar } from "../context/SidebarContext";

const ResponsiveSidebar = () => {
  const { isSideBarOpen, toggleSidebar, handleSidebarClose } = useSidebar();

  console.log("Sidebar State:", {
    isSideBarOpen,
    toggleSidebar,
    handleSidebarClose,
  });

  if (!isSideBarOpen)
    return (
      <button className={`hamburger`} onClick={toggleSidebar}>
        ☰
      </button>
    );

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleSidebarClose();
  };

  return (
    <div className="sidebar-overlay" onClick={handleOverlayClick}>
      {/* 사이드바 */}
      <div
        className={`sidebar ${isSideBarOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>관리자 메뉴</h2>
        <ul>
          <li>
            <Link to="/admin" onClick={handleSidebarClose}>
              <span className="dot">•</span>
              <span className="text">대시보드</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/user-management" onClick={handleSidebarClose}>
              <span className="dot">•</span>
              <span className="text">사용자 관리</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/content-management" onClick={handleSidebarClose}>
              <span className="dot">•</span>
              <span className="text">콘텐츠 관리</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/role-management" onClick={handleSidebarClose}>
              <span className="dot">•</span>
              <span className="text">권한 관리</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/study-management" onClick={handleSidebarClose}>
              <span className="dot">•</span>
              <span className="text">스터디 관리</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResponsiveSidebar;
