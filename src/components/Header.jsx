import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <h1 onClick={() => navigate("/")}>GATHER MIND</h1>
    </header>
  );
};

export default Header;
