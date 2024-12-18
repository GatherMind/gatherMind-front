import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      login(token);

      navigate("/"); // 메인 페이지로 이동
    } else {
      console.error("No token found in URL");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Dashboard;
