// src/components/Mypage.js
import React, { useEffect, useState } from "react";
import api from "../api"; // 생성한 Axios 인스턴스 import
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Mypage = () => {
  const [memberInfo, setMemberInfo] = useState({
    memberId: "정보 없음",
    nickname: "정보 없음",
    email: "정보 없음",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/members/me");
        setMemberInfo(response.data || {});
      } catch (error) {
        console.error("회원 정보를 가져오는 중 오류가 발생했습니다.", error);
        if (error.response) {
          if (error.response.status === 401) {
            alert("로그인이 필요합니다.");
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            alert(`오류: ${error.response.statusText}`);
          }
        } else {
          alert("회원 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMemberInfo();
  }, [navigate]);

  if (loading) return <p>로딩 중...</p>;

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
          <strong>아이디:</strong> {memberInfo.memberId || "정보 없음"}
        </p>
        <p>
          <strong>닉네임:</strong> {memberInfo.nickname || "정보 없음"}
        </p>
        <p>
          <strong>이메일:</strong> {memberInfo.email || "정보 없음"}
        </p>
      </div>
      <button onClick={handleEditInfo}>정보 수정</button>
    </div>
  );
};

export default Mypage;
