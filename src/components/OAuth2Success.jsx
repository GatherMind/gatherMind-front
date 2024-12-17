import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth2Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("OAuth2 Login Success");
    // 성공 후 메인 페이지로 리다이렉트
    navigate("/");
  }, [navigate]);

  return <div>OAuth2 Login Successful! Redirecting...</div>;
};

export default OAuth2Success;
