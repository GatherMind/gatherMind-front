import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { getMemberByToken } from "../services/MemberApiService";

const Mypage = () => {
  const [memberInfo, setMemberInfo] = useState({
    memberId: "정보 없음",
    nickname: "정보 없음",
    email: "정보 없음",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      try {
        const response = await getMemberByToken();
        setMemberInfo(response.data || {});
      } catch (error) {
        console.error("회원 정보를 가져오는 중 오류가 발생했습니다.", error);
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
    };

    fetchMemberInfo();
  }, [navigate]);

  const handleEditInfo = () => {
    navigate("/editprofile"); // 정보 수정 페이지로 이동
  };

  return (
    <div className="mypage-container">
      <header>
        <Header />
        <ul>
          <li onClick={() => navigate("/mypage")}>정보 보기</li>
          <li onClick={() => navigate("/mypage/act")}>활동 보기</li>
        </ul>
      </header>
      <h2>마이 페이지</h2>

      {/* 기본 정보 표시 */}
      <div>
        <p>
          <strong>아이디:</strong> {memberInfo.memberId || "Undefined"}
        </p>
        <p>
          <strong>닉네임:</strong> {memberInfo.nickname || "Undefined"}
        </p>
        <p>
          <strong>이메일:</strong> {memberInfo.email || "Undefined"}
        </p>
      </div>
      <button onClick={handleEditInfo}>정보 수정</button>
    </div>
  );
};

export default Mypage;
