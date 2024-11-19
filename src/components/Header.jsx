import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homeicon from "../assets/homeicon.png";
import settingicon from "../assets/settingicon.png";
import "../css/Header.css";
import { useAuth } from "../context/AuthContext";

export default function Header({ setLoginresult }) {
  const navigate = useNavigate();

  const { authToken, logout } = useAuth();

  function handleClick() {
    navigate("/");
  }

  function handleLoginClick() {
    navigate("/login");
  }

  function handleMyPageClick() {
    navigate("/mypage");
  }

  useEffect(() => {}, [authToken]); // authToken 변경 시 호출

  return (
    <header className="header">
      <div className="header">
        {" "}
        <img src={homeicon} alt="HomeIcon" onClick={handleClick} />
      </div>
      <div>
        {" "}
        <img src={settingicon} alt="MyPageIcon" onClick={handleMyPageClick} />
        MyPage
      </div>
      <button
        className="header-login"
        onClick={authToken ? logout : handleLoginClick}
      >
        {authToken ? "로그아웃" : "로그인"}
      </button>
    </header>
  );

  // return (
  //   <header>
  //     <h1 onClick={() => navigate("/")}>GATHER MIND</h1>
  //   </header>
  // );
}
