import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 onClick={() => navigate("/")}>GATHER MIND</h1>
<<<<<<< HEAD
    </header>
=======
    </div>
    
>>>>>>> 3b829b817cb9868d323040c00a1cbed515e3414d
  );
};

export default Header;
