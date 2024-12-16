import React from "react";
import { useNavigate } from "react-router-dom";
import homeicon from "../assets/gathermind-removebg-preview.png";
import settingicon from "../assets/settingicon.png";
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
    navigate("/");
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
      {isAdmin && (
        <button className="admin-page-btn" onClick={() => navigate("/admin")}>
          관리자 페이지
        </button>
      )}
      <div>
        {" "}
        <img src={settingicon} alt="MyPageIcon" onClick={handleMyPageClick} />
        MyPage
      </div>

      {authToken ? (
        <button className="header-login" onClick={handleLogoutClick}>
          로그아웃
        </button>
      ) : (
        <button className="header-login" onClick={handleLoginClick}>
          로그인{" "}
        </button>
      )}
    </header>
  );
}
