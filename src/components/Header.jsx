import React from "react";
import { useNavigate } from "react-router-dom";
import homeicon from "../assets/gathermind.png";
import settingicon from "../assets/settingicon.png";
import "../css/Header.css";

export default function Header({ setLoginresult }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  function handleLoginClick() {
    navigate("/login");
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
      <div>
        {" "}
        <img src={settingicon} alt="MyPageIcon" onClick={handleMyPageClick} />
        MyPage
      </div>
      <button className="header-login" onClick={handleLoginClick}>
        로그인
      </button>
    </header>
  );

  // return (
  //   <header>
  //     <h1 onClick={() => navigate("/")}>GATHER MIND</h1>
  //   </header>
  // );
}
