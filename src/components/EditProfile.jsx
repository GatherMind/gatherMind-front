import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import {
  deleteMember,
  getMemberByToken,
  updateMember,
} from "../services/MemberApiService";
import { duplicationCheck } from "../services/ValidateApiService";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const [memberInfo, setMemberInfo] = useState({
    memberId: "정보 없음",
    email: "정보 없음",
    nickname: "",
  });
  const [newNickname, setNewNickname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isNicknameUnique, setIsNicknameUnique] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchCurrentUserInfo = async () => {
  //     try {
  //       const token = localStorage.getItem("token"); // JWT 토큰을 로컬 저장소에서 가져옴
  //       if (!token) return navigate("/login");
  //       const response = await getMemberByToken(token);

  //       setMemberInfo({
  //         memberId: response.data.memberId || "정보 없음",
  //         email: response.data.email || "정보 없음",
  //         nickname: response.data.nickname || "정보 없음",
  //       });
  //     } catch (error) {
  //       console.error("회원 정보를 가져오는 중 오류 발생:", error);
  //     }
  //   };
  //   fetchCurrentUserInfo();
  // }, [navigate]);

  const validateField = async (field, value) => {
    const newErrors = { ...errors };

    if (field === "password") {
      if (!value && newPassword) {
        newErrors.password = "비밀번호를 입력해 주세요.";
      } else if (/\s/.test(value)) {
        newErrors.password = "비밀번호에는 공백을 사용할 수 없습니다.";
      } else if (value.length < 8 || value.length > 255) {
        newErrors.password =
          "비밀번호는 8자 이상 255자 이하로 입력해야 합니다.";
      } else {
        delete newErrors[field];
      }
    }

    if (field === "nickname") {
      if (value.length < 2 || value.length > 20) {
        newErrors.nickname = "닉네임은 2자에서 20자 사이여야 합니다.";
      } else if (value !== memberInfo.nickname) {
        try {
          const response = await duplicationCheck("nickname", value);
          if (!response.data.isUnique) {
            newErrors.nickname = "이미 사용 중인 닉네임입니다.";
            setIsNicknameUnique(false);
          } else {
            setIsNicknameUnique(true);
            delete newErrors.nickname;
          }
        } catch (error) {
          console.error("닉네임 중복 확인 오류:", error);
        }
      } else {
        delete newErrors.nickname;
      }
    }

    // if (!value && field === "password" && newPassword) {
    // } else if (
    //   field === "nickname" &&
    //   (value.length < 2 || value.length > 20)
    // ) {
    //   newErrors.nickname = "닉네임은 2자에서 20자 사이여야 합니다.";
    // } else if (
    //   field === "password" &&
    //   newPassword &&
    //   (value.length < 8 || value.length > 255)
    // ) {
    //   newErrors.password = "비밀번호는 8자 이상 255자 이하로 입력해야 합니다.";
    // } else if (field === "password" && /\s/.test(value)) {
    //   newErrors.password = "비밀번호에는 공백을 사용할 수 없습니다.";
    // } else {
    //   if (field === "nickname" && value !== memberInfo.nickname) {
    //     try {
    //       const response = duplicationCheck("nickname", value);
    //       if (!response.data.isUnique) {
    //         newErrors.nickname = "이미 사용 중인 닉네임입니다.";
    //         setIsNicknameUnique(false);
    //       } else {
    //         setIsNicknameUnique(true);
    //         delete newErrors.nickname;
    //       }
    //     } catch (error) {
    //       console.error("닉네임 중복 확인 오류:", error);
    //     }
    //   } else {
    //     delete newErrors[field];
    //   }
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validate = async () => {
    const newErrors = {};
    let isFormValid = true;

    // 닉네임 유효성 검사
    if (newNickname && newNickname !== memberInfo.nickname) {
      const isNicknameValid = await validateField("nickname", newNickname);
      isFormValid = isFormValid && isNicknameValid;
    }

    // 비밀번호 유효성 검사
    if (newPassword) {
      const isPasswordValid = await validateField("password", newPassword);
      isFormValid = isFormValid && isPasswordValid;
    }

    // 비밀번호 일치 여부 확인
    if (confirmPassword && confirmPassword !== newPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      isFormValid = false;
    } else {
      delete newErrors.confirmPassword;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isFormValid;
  };

  // const handleNicknameCheck = async () => {
  //   await duplicationCheck("nickname", newNickname);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!(await validate())) return;

    const originalNickname = memberInfo.nickname;
    let successMessage = "";

    if (!newNickname && !newPassword) {
      alert("수정된 내용이 없습니다.");
      return navigate("/mypage");
    }

    try {
      if (newNickname && newNickname !== originalNickname && isNicknameUnique) {
        await updateMember("nickname", newNickname);

        // await axios.put(
        //   "/api/member/update",
        //   { nickname: newNickname },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        //   }
        // );
        successMessage += `${originalNickname}님의 닉네임이 ${newNickname}으로 변경되었습니다.\n`;
      }

      if (newPassword) {
        await updateMember("password", newPassword);
        // await axios.put(
        //   "/api/member/update",
        //   { password: newPassword },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        //   }
        // );
        successMessage += `${
          newNickname || originalNickname
        }님의 비밀번호가 안전하게 변경되었습니다.\n`;
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

    if (!confirmDelete) navigate("/serious");

    try {
      // const token = localStorage.getItem("token");
      // await axios.delete("/api/member/delete-account", {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      await deleteMember();
      alert("회원 탈퇴가 완료되었습니다.");
      localStorage.removeItem("token");
      navigate("/goodbye");
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
                onClick={() => validateField("nickname", newNickname)}
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
              onChange={(e) => setNewPassword(e.target.value)}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
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
