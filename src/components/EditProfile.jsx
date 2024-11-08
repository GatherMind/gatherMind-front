import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [memberInfo, setMemberInfo] = useState({
    memberId: "정보 없음",
    email: "정보 없음",
    nickname: "",
  });
  const [newNickname, setNewNickname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nicknameErrors, setNicknameErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [isNicknameUnique, setIsNicknameUnique] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUserInfo = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT 토큰을 로컬 저장소에서 가져옴
        const response = await axios.get("/api/members/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더 추가
          },
        });
        setMemberInfo({
          memberId: response.data.memberId || "정보 없음",
          email: response.data.email || "정보 없음",
          nickname: response.data.nickname || "",
        });
        // 기존 setNewNickname 호출을 제거하여 인풋 필드에 닉네임이 보이지 않도록 합니다.
      } catch (error) {
        console.error("회원 정보를 가져오는 중 오류 발생:", error);
      }
    };
    fetchCurrentUserInfo();
  }, []);

  const validate = () => {
    let isValid = true;
    setNicknameErrors("");
    setPasswordErrors("");
    setConfirmPasswordError("");

    if (newNickname && (newNickname.length < 2 || newNickname.length > 20)) {
      setNicknameErrors("닉네임은 2자에서 20자 사이여야 합니다.");
      isValid = false;
    } else if (isNicknameUnique === false) {
      setNicknameErrors("이미 사용 중인 닉네임입니다.");
      isValid = false;
    }

    if (newPassword && (newPassword.length < 8 || newPassword.length > 255)) {
      setPasswordErrors("비밀번호는 8자 이상 255자 이하로 입력해야 합니다.");
      isValid = false;
    } else if (/\s/.test(newPassword)) {
      setPasswordErrors("비밀번호에는 공백을 사용할 수 없습니다.");
      isValid = false;
    }

    if (confirmPassword && confirmPassword !== newPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    }

    return isValid;
  };

  const checkNicknameUniqueness = async (event) => {
    event.preventDefault();
    if (!newNickname) {
      setNicknameErrors("닉네임을 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post("/api/members/check-nickname", {
        nickname: newNickname,
      });
      setIsNicknameUnique(response.data.isUnique);
      if (!response.data.isUnique) {
        setNicknameErrors("이미 사용 중인 닉네임입니다.");
      } else {
        setNicknameErrors("");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const originalNickname = memberInfo.nickname;
    let successMessage;

    if (!newNickname && !newPassword) {
      alert("수정된 내용이 없습니다.");
      return navigate("/mypage");
    }

    try {
      // 닉네임 변경 요청
      if (newNickname && newNickname !== originalNickname && isNicknameUnique) {
        await axios.put(
          "/api/members/update",
          { nickname: newNickname },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        successMessage = `${originalNickname}님의 닉네임이 ${newNickname}으로 변경되었습니다.\n`;
      }

      // 비밀번호 변경 요청
      if (newPassword) {
        await axios.put(
          "/api/members/update",
          { password: newPassword },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        successMessage = `${
          newNickname || originalNickname
        }님의 비밀번호가 안전하게 변경되었습니다.\n`;
      }

      alert(successMessage.trim());
      navigate("/mypage");
    } catch (error) {
      setFormError("정보 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 회원 탈퇴 요청
  const handleDeleteAccount = async (event) => {
    event.preventDefault();
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
    } else {
      navigate("/serious");
    }
  };

  return (
    <div className="edit-profile-container">
      <header>
        <Header />
      </header>
      <main>
        <h2>정보 수정</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <strong>아이디:</strong> {memberInfo.memberId}
          </div>
          <div className="form-group">
            <strong>이메일:</strong> {memberInfo.email}
          </div>

          <div className="form-group">
            <label>변경할 닉네임</label>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => {
                setNewNickname(e.target.value);
                setIsNicknameUnique(null);
                setNicknameErrors("");
              }}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={checkNicknameUniqueness}
              className="check-button"
            >
              닉네임 중복 확인
            </button>
            {isNicknameUnique === true && (
              <p className="success-message">사용 가능한 닉네임입니다.</p>
            )}
            {nicknameErrors && (
              <p className="error-message">{nicknameErrors}</p>
            )}
          </div>

          <div className="form-group">
            <label>변경할 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordErrors("");
                setConfirmPasswordError("");
              }}
              autoComplete="off"
            />
            {passwordErrors && (
              <p className="error-message">{passwordErrors}</p>
            )}
          </div>
          <div className="form-group">
            <label>비밀번호 재확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
            />
            {confirmPasswordError && (
              <p className="error-message">{confirmPasswordError}</p>
            )}
          </div>

          {formError && <p className="error-message">{formError}</p>}
          <button type="submit">수정하기</button>
          <button type="button" onClick={handleDeleteAccount}>
            회원 탈퇴
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
