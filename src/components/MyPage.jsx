import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/Mypage.css";

const Mypage = () => {
  const [memberInfo, setMemberInfo] = useState({
    memberId: "정보 없음",
    nickname: "정보 없음",
    email: "정보 없음",
  });
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchMemberInfo = async () => {
  //     const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
  //     if (!token) {
  //       alert("로그인이 필요합니다.");
  //       navigate("/login");
  //       return;
  //     }

<<<<<<< Updated upstream
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
=======
  //     try {
  //       const response = await getMemberByToken();
  //       setMemberInfo(response.data || {});
  //     } catch (error) {
  //       console.error("회원 정보를 가져오는 중 오류가 발생했습니다.", error);
  //       alert("로그인이 필요합니다.");
  //       navigate("/login");
  //     }
  //   };
>>>>>>> Stashed changes

  //   fetchMemberInfo();
  // }, [navigate]);

  // const handleEditInfo = () => {
  //   navigate("/editprofile"); // 정보 수정 페이지로 이동
  // };

  return (
    <div className="mypage-container">
      <Header />
      <div className="mypage-wrap">
        <header>
          <h2>{memberInfo.nickname}님의 마이 페이지</h2>
          <ul className="mypage-nav">
            <li onClick={() => navigate("/mypage")}>정보 보기</li>
            <li onClick={() => navigate("/mypage/joined-study")}>
              가입한 스터디
            </li>
            <li onClick={() => navigate("/mypage/written-question")}>
              작성한 질문
            </li>
            <li onClick={() => navigate("/mypage/written-answer")}>
              작성한 답변
            </li>
          </ul>
        </header>

        {/* 기본 정보 표시 */}
        <div className="mypage-info-box">
          <p className="mypage-info">
            <h3>아이디</h3> <span>{memberInfo.memberId || "Undefined"}</span>
          </p>
          <p className="mypage-info">
            <h3>닉네임</h3> <span>{memberInfo.nickname || "Undefined"}</span>
          </p>
          <p className="mypage-info">
            <h3>이메일</h3> <span>{memberInfo.email || "Undefined"}</span>
          </p>
        </div>
        {/* <button onClick={handleEditInfo}>정보 수정</button> */}
        <button className="mypage-button">정보 수정</button>
      </div>
    </div>
  );
};

export default Mypage;
