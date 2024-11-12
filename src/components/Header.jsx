import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 onClick={() => navigate("/")}>GATHER MIND</h1>
    </div>
    
  );
};

export default Header;
