import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const MypageAct = () => {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [recentAnswers, setRecentAnswers] = useState([]);
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
        const questionsResponse = await axios.get(
          "/api/members/recent-questions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const answersResponse = await axios.get("/api/members/recent-answers", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const response = await axios.get("/api/members/me", {
          headers: { Authorization: `Bearer ${token}` }, // 헤더에 토큰 추가
        });
        setMemberInfo(response.data || {});

        setJoinedGroups(groupResponse.data);
        setRecentQuestions(questionsResponse.data.slice(0, 3));
        setRecentAnswers(answersResponse.data.slice(0, 3));
      } catch (error) {}
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

  const handleEditQuestion = (questionId) => {
    navigate(`/edit-question/${questionId}`);
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("정말로 게시글을 삭제하시겠습니까?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/questions/${questionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentQuestions(
          recentQuestions.filter((question) => question.id !== questionId)
        );
        alert("게시글이 삭제되었습니다.");
      } catch (error) {
        alert("게시글 삭제에 실패했습니다.");
      }
    }
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
      <h2>{memberInfo.nickname || "Undefined"}님의 활동 정보</h2>

      <h3>스터디</h3>
      {joinedGroups.length > 0 ? (
        joinedGroups.map((group) => (
          <div key={group.id}>
            <p>
              {group.title}{" "}
              <button onClick={() => handleWithdrawFromStudy(group.id)}>
                탈퇴
              </button>
            </p>
          </div>
        ))
      ) : (
        <p>스터디에 가입하세요!</p>
      )}

      <h3>작성한 질문 현황</h3>
      {joinedGroups.length === 0 ? (
        <p>스터디에 가입하세요!</p>
      ) : recentQuestions.length > 0 ? (
        recentQuestions.map((question) => (
          <div key={question.id}>
            <p>
              {question.studyTitle} - {question.title}
            </p>
            <p>{question.content}</p> {/* Question content 표시 */}
            <button onClick={() => handleEditQuestion(question.id)}>
              수정
            </button>{" "}
            <button onClick={() => handleDeleteQuestion(question.id)}>
              삭제
            </button>
          </div>
        ))
      ) : (
        <p>스터디에 질문을 남겨 정보를 공유하세요</p>
      )}

      <h3>작성한 답변 현황</h3>
      <p>원 게시물 삭재시 기재한 댓글들이 삭제됩니다.</p>
      {joinedGroups.length === 0 ? (
        <p>스터디에 가입하세요!</p>
      ) : recentAnswers.length > 0 ? (
        recentAnswers.map((answer) => (
          <div key={answer.id}>
            <p>
              {answer.studyTitle} - {answer.questionTitle}
            </p>
            <p>{answer.content}</p> {/* Answer content 표시 */}
            <button onClick={() => handleEditQuestion(answer.questionId)}>
              수정
            </button>{" "}
            <button onClick={() => handleDeleteQuestion(answer.questionId)}>
              삭제
            </button>
          </div>
        ))
      ) : (
        <p>게시글에 답변을 남겨 정보를 공유하세요</p>
      )}
    </div>
  );
};

export default MypageAct;
