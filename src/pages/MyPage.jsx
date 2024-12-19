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
import NicknameEditModal from "../components/Modals/NicknameEditModal.jsx";
import DeleteMemberModal from "../components/Modals/DeleteMemberModal.jsx";
import PasswordVerifyModal from "../components/Modals/PasswordVerifyModal.jsx";
import { PasswordVerify } from "../services/AuthApiService";
import ProfileImage from "../assets/defaultProfile.png";
import editIcon from "../assets/edit.png";
import PasswordEditModal from "../components/Modals/PasswordEditModal.jsx";

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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPasswordVerifyModalOpen, setIsPasswordVerifyModalOpen] =
    useState(false);
  const [isNicknameEditModalOpen, setIsNicknameEditModalOpen] = useState(false);
  const [isPasswordEditModalOpen, setIsPasswordEditModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      try {
        const memberResponse = await getMemberByToken(token);
        setMemberInfo({
          memberId: memberResponse.data.memberId || "정보 없음",
          email: memberResponse.data.email || "정보 없음",
          nickname: memberResponse.data.nickname || "정보 없음",
        });

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
        console.error("회원 정보를 가져오는 중 오류 발생:", error);
        alert("로그인이 필요합니다.");
        navigate("/login");
      }
    };

    fetchMemberInfo();
  }, [navigate]);

  const handleDeleteAccount = async () => {
    try {
      await deleteMember();
      alert("회원 탈퇴가 완료되었습니다.");
      localStorage.removeItem("token");
      navigate("/goodbye");
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다.");
    } finally {
      setIsDeleteModalOpen(false); 
    }
  };

  const handlePasswordVerify = async (password) => {
    try {
      const isValid = await PasswordVerify(password); 
      if (isValid) {
        setIsPasswordVerifyModalOpen(false); 
        setIsPasswordEditModalOpen(true);
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error(error.message);
      alert("비밀번호 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="mypage-container">
      <ul className="mypage-main-nav">
        <li className="mypage-main-nav-1" onClick={() => navigate("/mypage")}>
          내 정보
        </li>
        <li
          className="mypage-main-nav-2"
          onClick={() => navigate("/mypage/joined-study")}
        >
          스터디
        </li>
        <li
          className="mypage-main-nav-3"
          onClick={() => navigate("/mypage/written-question")}
        >
          게시글
        </li>
        <li
          className="mypage-main-nav-4"
          onClick={() => navigate("/mypage/written-answer")}
        >
          댓글
        </li>
      </ul>
      <h1 id="mypage-page-name">
        내 정보 &#45; 성공하겠다는 의지가 강한 사람에게는 결코 실패란 없다.
      </h1>
      <section className="mypage-my-info-box">
        <img src={ProfileImage} alt="Profile Image" className="profile-image" />
        <div className="mypage-my-info">
          <p className="mypage-joined-info">
            <h3>아이디</h3>
            <span>{memberInfo.memberId || "Undefined"}</span>
          </p>
          <p className="mypage-joined-info">
            <h3>이메일</h3>
            <span>{memberInfo.email || "Undefined"}</span>
          </p>
          <p className="mypage-joined-info">
            <h3>닉네임</h3>
            <img
              src={editIcon}
              alt="edit-icon"
              className="nick-name-edit-icon"
              onClick={() => setIsNicknameEditModalOpen(true)}
            />
            <span>{memberInfo.nickname || "Undefined"}</span>
          </p>
          <ul className="mypage-content-count">
            <li>
              스터디
              <p>{counts.studyCount}</p>
            </li>
            <li>
              게시글
              <p>{counts.questionCount}</p>
            </li>
            <li>
              답변
              <p>{counts.answerCount}</p>
            </li>
          </ul>
        </div>
      </section>
      <button
        className="mypage-edit-button"
        onClick={() => setIsPasswordVerifyModalOpen(true)}
      >
        비밀번호 변경
      </button>
      <button
        className="mypage-delete-button"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        회원탈퇴
      </button>
      {isNicknameEditModalOpen && (
        <NicknameEditModal
          currentNickname={memberInfo.nickname}
          onClose={() => setIsNicknameEditModalOpen(false)}
        />
      )}
      {isPasswordVerifyModalOpen && (
        <PasswordVerifyModal
          onVerify={handlePasswordVerify}
          onClose={() => setIsPasswordVerifyModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMemberModal
          onDelete={handleDeleteAccount}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
      {isPasswordEditModalOpen && (
        <PasswordEditModal onClose={() => setIsPasswordEditModalOpen(false)} />
      )}
    </div>
  );
};

export default Mypage;
