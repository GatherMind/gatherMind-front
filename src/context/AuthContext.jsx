import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("token") || null
  );

  // 로그인 성공 시 호출할 함수
  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
  };

  // 로그아웃 시 토큰 삭제
  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
