import React, { useEffect, useState } from "react";
import "../styles/ProfileEditModal.css";
import { useNavigate } from "react-router-dom";
import { getMemberByToken } from "../services/MemberApiService";
import NicknameEditModal from "./NicknameEditModal.jsx";
import PasswordEditModal from "./PasswordEditModal";

const ProfileEditModal = ({ onClose }) => {
  const [currentView, setCurrentView] = useState("select"); // "select", "nickname", "password"
  const [memberInfo, setMemberInfo] = useState({
    memberId: "정보 없음",
    email: "정보 없음",
    nickname: "",
  });
  const navigate = useNavigate();

  // 회원 정보 가져오기
  useEffect(() => {
    const fetchCurrentUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const response = await getMemberByToken(token);

        setMemberInfo({
          memberId: response.data.memberId || "정보 없음",
          email: response.data.email || "정보 없음",
          nickname: response.data.nickname || "정보 없음",
        });
      } catch (error) {
        console.error("회원 정보를 가져오는 중 오류 발생:", error);
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
    };

    fetchCurrentUserInfo();
  }, [navigate]);

  return (
    <div className="profileEditModal-container">
      <div className="profileEditModal-content">
        {currentView === "select" && (
          <>
            <button className="profileEditModal-close-button" onClick={onClose}>
              X
            </button>
            <h2>수정할 항목을 선택하세요</h2>
            <div className="profileEditModal-buttonBox">
              <button
                className="profileEditModal-button"
                onClick={() => setCurrentView("nickname")}
              >
                닉네임
              </button>
              <button
                className="profileEditModal-button"
                onClick={() => setCurrentView("password")}
              >
                비밀번호
              </button>
            </div>
          </>
        )}

        {currentView === "nickname" && (
          <NicknameEditModal
            currentNickname={memberInfo.nickname}
            onClose={onClose}
            onBack={() => setCurrentView("select")}
          />
        )}

        {currentView === "password" && (
          <PasswordEditModal
            onClose={onClose}
            onBack={() => setCurrentView("select")}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileEditModal;
