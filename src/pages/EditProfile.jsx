import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteMember,
  getMemberByToken,
  updateMember,
} from "../services/MemberApiService";
import { duplicationCheck } from "../services/ValidateApiService";

const EditProfile = () => {
  const [memberInfo, setMemberInfo] = useState({
    memberId: "정보 없음",
    email: "정보 없음",
    nickname: "",
  });
  const [newNickname, setNewNickname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState(""); // 기존 비밀번호 상태 추가
  const [errors, setErrors] = useState({});
  const [isNicknameUnique, setIsNicknameUnique] = useState(null);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

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

        setCurrentPassword(response.data.password); // 서버에서 기존 비밀번호 받아오기
      } catch (error) {
        console.error("회원 정보를 가져오는 중 오류 발생:", error);
      }
    };
    fetchCurrentUserInfo();
  }, [navigate]);

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    if (field === "password") {
      if (!value) {
        newErrors.password = "비밀번호를 입력해 주세요.";
      } else if (value.length < 8 || value.length > 255) {
        newErrors.password = "비밀번호는 8자 이상 255자 이하로 입력해주세요.";
      } else if (/\s/.test(value)) {
        newErrors.password = "비밀번호에는 공백을 사용할 수 없습니다.";
      } else if (value === currentPassword) {
        newErrors.password =
          "기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.";
      } else {
        delete newErrors.password;
      }
    }

    if (field === "confirmPassword") {
      if (value !== newPassword) {
        newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

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

  const validate = () => {
    const newErrors = {};
    let isFormValid = true;

    if (newNickname && newNickname !== memberInfo.nickname) {
      if (!/^[a-zA-Z0-9가-힣]{2,20}$/.test(newNickname)) {
        newErrors.nickname =
          "닉네임은 2~20자의 한글, 영문, 숫자만 입력 가능합니다.";
        isFormValid = false;
      }
    }

    if (newPassword) {
      if (newPassword.length < 8 || newPassword.length > 255) {
        newErrors.password = "비밀번호는 8자 이상 255자 이하로 입력해주세요.";
        isFormValid = false;
      } else if (/\s/.test(newPassword)) {
        newErrors.password = "비밀번호에는 공백을 사용할 수 없습니다.";
        isFormValid = false;
      } else if (newPassword === currentPassword) {
        newErrors.password =
          "기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.";
        isFormValid = false;
      }
    }

    if (confirmPassword && confirmPassword !== newPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      isFormValid = false;
    }

    setErrors(newErrors);
    return isFormValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newNickname && !newPassword) {
      alert("수정된 내용이 없습니다.");
      return;
    }

    if (!validate()) return;

    // 동일 비밀번호 확인
    if (newPassword === currentPassword) {
      setErrors((prev) => ({
        ...prev,
        password: "기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.",
      }));
      return;
    }

    try {
      let successMessage = "";

      if (
        newNickname &&
        newNickname !== memberInfo.nickname &&
        isNicknameUnique
      ) {
        await updateMember("nickname", newNickname);
        successMessage += `닉네임이 ${newNickname}으로 변경되었습니다.\n`;
      }

      if (newPassword) {
        await updateMember("password", newPassword);
        successMessage += "비밀번호가 변경되었습니다.";
      }

      alert(successMessage.trim());
      navigate("/mypage");
    } catch (error) {
      setFormError("정보 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

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

  return (
    <div className="edit-profile-container">
      <h2>정보 수정</h2>
      <div className="profile-basic-info">
        <ul>
          <li>
            아이디<span>{memberInfo.memberId}</span>
          </li>
          <li>
            이메일<span>{memberInfo.email}</span>
          </li>
        </ul>
      </div>
      <main>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <div className="edit-nickname-box">
              <input
                type="text"
                value={newNickname}
                onChange={(e) => {
                  setNewNickname(e.target.value);
                  setIsNicknameUnique(null);
                }}
                autoComplete="off"
                placeholder="변경할 닉네임"
              />
              <button
                type="button"
                onClick={handleNicknameCheck}
                className="check-button"
              >
                중복확인
              </button>
            </div>
            {isNicknameUnique === true && (
              <p className="success-message">사용 가능한 닉네임입니다.</p>
            )}
            {errors.nickname && (
              <p className="error-message">{errors.nickname}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                validateField("password", e.target.value);
              }}
              autoComplete="off"
              placeholder="변경할 비밀번호"
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateField("confirmPassword", e.target.value);
              }}
              autoComplete="off"
              placeholder="변경할 비밀번호 재입력"
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>

          {formError && <p className="error-message">{formError}</p>}
          <div className="edit-profile-button-box">
            <button className="mypage-edit-button" type="submit">
              수정하기
            </button>
            <button
              className="mypage-delete-button"
              type="button"
              onClick={handleDeleteAccount}
            >
              회원탈퇴
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
