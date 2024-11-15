import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/JoinedStudy.css";

const JoinedStudy = () => {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [memberInfo, setMemberInfo] = useState({
    nickname: "Undefined",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const token = localStorage.getItem("token");

        const groupResponse = await axios.get("/api/members/joined-groups", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const response = await axios.get("/api/members/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMemberInfo(response.data || {});
        setJoinedGroups(groupResponse.data);
      } catch (error) {
        console.error("스터디 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchActivityData();
  }, []);

  const handleWithdrawFromStudy = async (studyId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/studies/${studyId}/withdraw`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJoinedGroups(joinedGroups.filter((group) => group.id !== studyId));
      alert("스터디 탈퇴가 완료되었습니다.");
    } catch (error) {
      alert("스터디 탈퇴에 실패했습니다.");
    }
  };

  return (
    <div className="joined-study-container">
    <header>
      <Header />
      <h2>{memberInfo.nickname}님의 마이 페이지</h2>
      <ul className="mypage-joined-study-nav">
        <li onClick={() => navigate("/mypage")}>정보 보기</li>
        <li onClick={() => navigate("/mypage/joined-study")}>가입한 스터디</li>
        <li onClick={() => navigate("/mypage/written-question")}>작성한 질문</li>
        <li onClick={() => navigate("/mypage/written-answer")}>작성한 답변</li>
      </ul>
    </header>

    <h3>가입한 스터디 목록</h3>
      {joinedGroups.length > 0 ? (
        <div className="study-list">
          {joinedGroups.map((group) => (
            <div className="study-card" key={group.id}>
              <p className="study-title">{group.title}</p>
              <button
                className="withdraw-button"
                onClick={() => handleWithdrawFromStudy(group.id)}
              >
                탈퇴
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-study-message">현재 가입한 스터디가 없네요. 새로운 스터디에 가입해볼까요?</p>
      )}
    </div>
  );
};

export default JoinedStudy;
