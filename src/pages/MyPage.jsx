import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMemberByToken,
  getStudyCount,
  getQuestionCount,
  getAnswerCount,
  deleteMember,
} from "../services/MemberApiService";
import "../styles/Mypage.css";
import ProfileEditModalModal from "../components/ProfileEditModal";

const Mypage = () => {
  const [memberInfo, setMemberInfo] = useState({
    memberId: "정보 없음",
    nickname: "정보 없음",
    email: "정보 없음",
  });

  const [counts, setCounts] = useState({
    studyCount: 0,
    questionCount: 0,
    answerCount: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
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
        // 회원 정보 가져오기
        const memberResponse = await getMemberByToken();
        setMemberInfo(memberResponse.data || {});

        // 가입한 스터디 수, 작성한 질문 수, 작성한 답변 수 가져오기
        const [studyResponse, questionResponse, answerResponse] =
          await Promise.all([
            getStudyCount(),
            getQuestionCount(),
            getAnswerCount(),
          ]);

        setCounts({
          studyCount: studyResponse.data || 0,
          questionCount: questionResponse.data || 0,
          answerCount: answerResponse.data || 0,
        });
      } catch (error) {
        console.error("회원 정보를 가져오는 중 오류가 발생했습니다.", error);
        alert("로그인이 필요합니다");
        navigate("/login");
      }
    };

    fetchMemberInfo();
  }, [navigate]);

  const handleDeleteAccount = async (event) => {
    event.preventDefault();

    const confirmDelete = window.confirm("정말로 회원 탈퇴를 하시겠습니까?");

    // 취소 시 특정 페이지로 이동
    if (!confirmDelete) {
      navigate("/serious"); // 취소 시 /serious 페이지로 이동
      return; // 회원 탈퇴 로직 중단
    }

    try {
      await deleteMember();
      alert("회원 탈퇴가 완료되었습니다.");
      localStorage.removeItem("token");
      navigate("/goodbye"); // 탈퇴 완료 시 /goodbye 페이지로 이동
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="mypage-container">
      <header>
        <ul className="mypage-nav">
          <li onClick={() => navigate("/mypage")}>
            정보
            <br />
            보기
          </li>
          <li onClick={() => navigate("/mypage/joined-study")}>
            가입한
            <br />
            스터디
          </li>
          <li onClick={() => navigate("/mypage/written-question")}>
            작성한
            <br />
            질문
          </li>
          <li onClick={() => navigate("/mypage/written-answer")}>
            작성한
            <br />
            답변
          </li>
        </ul>

        {/* 가입한 스터디 수, 작성한 질문 수, 작성한 답변 수 */}
        <ul className="mypage-stats">
          <li>
            가입 스터디 수
            <p>{counts.studyCount}</p>
          </li>
          <li>
            작성 질문 수
            <p>{counts.questionCount}</p>
          </li>
          <li>
            작성 답변 수
            <p>{counts.answerCount}</p>
          </li>
        </ul>
      </header>

      <main>
        {/* 프로필정보 */}
        <div className="mypage-info-box">
          <p className="mypage-joined-info">
            <h3>아이디</h3>
            <span>{memberInfo.memberId || "Undefined"}</span>
          </p>
          <p className="mypage-joined-info">
            <h3>닉네임</h3>
            <span>{memberInfo.nickname || "Undefined"}</span>
          </p>
          <p className="mypage-joined-info">
            <h3>이메일</h3>
            <span>{memberInfo.email || "Undefined"}</span>
          </p>
        </div>
        <button className="mypage-edit-button" onClick={handleOpenModal}>
          정보 수정
        </button>
        <button
          className="mypage-delete-button"
          type="button"
          onClick={handleDeleteAccount}
        >
          회원탈퇴
        </button>
      </main>

      {isModalOpen && <ProfileEditModalModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Mypage;
