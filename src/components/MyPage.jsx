import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

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
        const response = await axios.get("/api/members/me", {
          headers: { Authorization: `Bearer ${token}` }, // 헤더에 토큰 추가
        });
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

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("정말로 회원 탈퇴를 하시겠습니까?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete("/api/members/delete-account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("회원 탈퇴가 완료되었습니다.");
        localStorage.removeItem("token"); // 로그아웃 처리
        navigate("/goodbye");
      } catch (error) {
        alert("회원 탈퇴에 실패했습니다.");
      }
    }
  };

  return (
    <div className="mypage-container">
      <header>
        <Header />
        <ol>
          <li onClick={() => navigate("/mypage")}>정보 보기</li>
          <li onClick={() => navigate("/mypage/act")}>활동 보기</li>
        </ol>
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
      <button onClick={handleDeleteAccount}>회원 탈퇴</button>
    </div>
  );
};

export default Mypage;
