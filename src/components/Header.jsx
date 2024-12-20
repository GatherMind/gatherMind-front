import React from "react";
import { useNavigate } from "react-router-dom";
import homeicon from "../assets/gathermind1_removebg.png";
import settingicon from "../assets/profile.png";
import "../styles/Header.css";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
export default function Header() {
  const navigate = useNavigate();
  const { authToken, logout } = useAuth(); // AuthContext에서 authToken와 logout 가져오기

  const decoded = authToken ? jwtDecode(authToken) : null;
  const isAdmin = decoded?.role === "ROLE_ADMIN";

  function handleClick() {
    navigate("/");
  }

  function handleLoginClick() {
    navigate("/login");
  }

  function handleLogoutClick() {
    logout();
    navigate("/", { state: { refresh: true } });
  }

  function handleMyPageClick() {
    navigate("/mypage");
  }

  return (
    <header className="header">
      <div className="header">
        {" "}
        <img src={homeicon} alt="HomeIcon" width={130} onClick={handleClick} />
      </div>

      <nav className="nav-buttons">
        {isAdmin && (
          <div
            className="nav-btn admin-page-btn"
            onClick={() => navigate("/admin")}
          >
            관리자
          </div>
        )}
        <button
          className="nav-btn my-page-btn"
          onClick={() => navigate("/mypage")}
        >
          <img src={settingicon} alt="MyPageIcon" onClick={handleMyPageClick} />
          마이페이지
        </button>
        {authToken ? (
          <button className="nav-btn" onClick={handleLogoutClick}>
            로그아웃
          </button>
        ) : (
          <button className="nav-btn" onClick={handleLoginClick}>
            로그인
          </button>
        )}
      </nav>
    </header>
  );
}
