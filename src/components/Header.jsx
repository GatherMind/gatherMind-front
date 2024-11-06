import React from "react";
import mainlogo from "../assets/mainlogo.png";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <button className="back-button" onClick={() => navigate(-1)}>
        &#8592; {/* 왼쪽 화살표 아이콘 */}
      </button>
      <img src={mainlogo} alt="Logo" className="logo" />
    </header>
  );
};

export default Header;
