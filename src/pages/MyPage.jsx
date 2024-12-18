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
import ProfileEditModal from "../components/ProfileEditModal";
import DeleteMemberModal from "../components/DeleteMemberModal";
import PasswordVerifyModal from "../components/PasswordVerifyModal";
import { PasswordVerify } from "../services/AuthApiService";
import ProfileImage from "../assets/defaultProfile.png";

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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 탈퇴 모달 상태
  const [isPasswordVerifyModalOpen, setIsPasswordVerifyModalOpen] =
    useState(false); // 비밀번호 검증 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 정보 수정 모달 상태
  const [isPasswordVerified, setIsPasswordVerified] = useState(false); // 비밀번호 검증 상태
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
        const memberResponse = await getMemberByToken();
        setMemberInfo(memberResponse.data || {});

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

  const handleDeleteAccount = async () => {
    try {
      await deleteMember();
      alert("회원 탈퇴가 완료되었습니다.");
      localStorage.removeItem("token");
      navigate("/goodbye");
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다.");
    } finally {
      setIsDeleteModalOpen(false); // 모달 닫기
    }
  };

  const handlePasswordVerify = async (password) => {
    try {
      const isValid = await PasswordVerify(password); // 검증 API 호출
      if (isValid) {
        alert("비밀번호가 확인되었습니다.");
        setIsPasswordVerifyModalOpen(false); // 비밀번호 검증 모달 닫기
        setIsEditModalOpen(true); // 정보 수정 모달 열기
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
      <h1 className="study-page-name">
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
        정보 수정
      </button>
      <button
        className="mypage-delete-button"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        회원탈퇴
      </button>
      {/* 비밀번호 검증 모달 */}
      {isPasswordVerifyModalOpen && (
        <PasswordVerifyModal
          onVerify={handlePasswordVerify}
          onClose={() => setIsPasswordVerifyModalOpen(false)}
        />
      )}
      {/* 탈퇴 모달 */}
      {isDeleteModalOpen && (
        <DeleteMemberModal
          onDelete={handleDeleteAccount}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
      {/* 정보 수정 모달 */}
      {isEditModalOpen && (
        <ProfileEditModal
          onClose={() => setIsEditModalOpen(false)}
          nickname={memberInfo.nickname}
        />
      )}
    </div>
  );
};

export default Mypage;
