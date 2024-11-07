import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <h1 onClick={() => navigate("/")}>GATHER MIND</h1>
      <button type="button">로그아웃</button>
    </header>
    
  );
};

export default Header;
