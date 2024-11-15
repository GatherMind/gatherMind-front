import React from "react";
import { useNavigate } from "react-router-dom";
import homeicon from "../assets/homeicon.png";
import settingicon from "../assets/settingicon.png";
import "../css/Header.css";

export default function Header({ setLoginresult }) {
  const navigate = useNavigate();

  function handleclick() {
    navigate("/");
  }

  function handleLoginClick() {
    navigate("/login");
  }



  return (
    <header className="header">
      <div className="header">
        {" "}
        <img src={homeicon} onClick={handleclick} />
      </div>
      <div>
        {" "}
        <img src={settingicon} onClick={handleclick} />
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
