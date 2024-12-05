import React, { useEffect, useState } from "react";
import "../styles/ProfileEditModal.css";
import { useNavigate } from "react-router-dom";
import { getMemberByToken, updateMember } from "../services/MemberApiService";
import { duplicationCheck } from "../services/ValidateApiService";

const ProfileEditModal = ({ onClose }) => {
  const [currentView, setCurrentView] = useState("select"); // "select", "nickname", "password"
  const [memberInfo, setMemberInfo] = useState({
    memberId: "정보 없음",
    email: "정보 없음",
    nickname: "",
  });
  const [newNickname, setNewNickname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isNicknameUnique, setIsNicknameUnique] = useState(null);
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

  // 닉네임 검증
  const validateNickname = (value) => {
    const error = {};
    if (!value || value.length < 2 || value.length > 20) {
      error.nickname = "닉네임은 2~20자의 한글, 영문, 숫자만 입력 가능합니다.";
    }
    return error;
  };

  // 비밀번호 검증
  const validatePassword = (password, confirmPassword) => {
    const error = {};
    if (!password || password.length < 8 || password.length > 255) {
      error.newPassword = "비밀번호는 8자 이상 255자 이하로 입력해주세요.";
    } else if (/\s/.test(password)) {
      error.newPassword = "비밀번호에는 공백을 사용할 수 없습니다.";
    }

    if (password !== confirmPassword) {
      error.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    return error;
  };

  // 닉네임 중복 확인
  const handleNicknameCheck = async () => {
    if (!newNickname || !/^[a-zA-Z0-9가-힣]{2,20}$/.test(newNickname)) {
      setErrors((prev) => ({
        ...prev,
        nickname: "닉네임은 2~20자의 한글, 영문, 숫자만 입력 가능합니다.",
      }));
      return;
    }

    try {
      const response = await duplicationCheck("nickname", newNickname);
      if (response.data.isUnique) {
        setIsNicknameUnique(true);
        setErrors((prev) => ({ ...prev, nickname: "" }));
      } else {
        setIsNicknameUnique(false);
        setErrors((prev) => ({
          ...prev,
          nickname: "이미 사용 중인 닉네임입니다.",
        }));
      }
    } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
    }
  };

  // 닉네임 제출
  const handleNicknameSubmit = async () => {
    const error = validateNickname(newNickname);
    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }

    if (!isNicknameUnique) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    try {
      await updateMember("nickname", newNickname);
      alert(`닉네임이 '${newNickname}'으로 변경되었습니다.`);
      onClose(); // 닉네임 변경 후 모달 닫기
      window.location.reload(); // MyPage 새로고침
    } catch (error) {
      console.error("닉네임 변경 중 오류 발생:", error);
    }
  };

  // 비밀번호 제출
  const handlePasswordSubmit = async () => {
    const error = validatePassword(newPassword, confirmPassword);
    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }

    try {
      await updateMember("password", newPassword);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setNewPassword("");
      setConfirmPassword("");
      onClose(); // 비밀번호 변경 후 모달 닫기
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
    }
  };

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
          <div className="nickname-edit-modal-container">
            <button
              className="modal-back-button"
              onClick={() => setCurrentView("select")}
            >
              X
            </button>
            <h2>닉네임 수정</h2>
            <div className="nickname-edit-box">
              <label>현재 닉네임</label>
              <p className="modal-current-nickname">
                {memberInfo.nickname || "정보 없음"}
              </p>
              <label>변경할 닉네임</label>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => {
                  setNewNickname(e.target.value);
                  setErrors({});
                }}
                placeholder="새 닉네임 입력"
              />
              <button
                className="modal-nickname-check-button"
                onClick={handleNicknameCheck}
              >
                중복 확인
              </button>
              {isNicknameUnique === true && (
                <p className="success-message">사용 가능한 닉네임입니다.</p>
              )}
              {errors.nickname && (
                <p className="error-message">{errors.nickname}</p>
              )}
            </div>
            <button
              className="modal-edit-profile-modify"
              onClick={handleNicknameSubmit}
            >
              수정하기
            </button>
          </div>
        )}

        {currentView === "password" && (
          <div className="password-edit-modal-container">
            <button
              className="modal-back-button"
              onClick={() => setCurrentView("select")}
            >
              X
            </button>
            <h2>비밀번호 수정</h2>
            <div className="password-edit-box">
              <label>새 비밀번호</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors({});
                }}
                placeholder="새 비밀번호 입력"
              />
              {errors.newPassword && <p>{errors.newPassword}</p>}
              <label>비밀번호 재확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({});
                }}
                placeholder="비밀번호 재입력"
              />
              {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>
            <button
              className="modal-edit-profile-modify"
              onClick={handlePasswordSubmit}
            >
              비밀번호 변경
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileEditModal;
