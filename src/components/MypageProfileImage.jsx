import React, { useState, useEffect, useRef } from "react";
import DefaultProfileImage from "../assets/defaultProfile.png"; // 기본 이미지
import "../styles/MypageProfileImage.css";
import axios from "axios";

const MypageProfileImage = () => {
  const [profileImage, setProfileImage] = useState(DefaultProfileImage); // 프로필 이미지 상태 관리
  const inputRef = useRef(null);

  // 프로필 이미지 가져오기
  // const fetchProfileImage = async () => {
  //   try {
  //     const response = await axios.get("/api/files/profile-image", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       responseType: "blob", // 이미지 데이터를 받기 위해 blob 사용
  //     });
  //     const imageUrl = URL.createObjectURL(response.data);
  //     setProfileImage(imageUrl); // 상태 업데이트
  //   } catch (error) {
  //     console.error("프로필 이미지 로드 실패:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProfileImage(); // 컴포넌트가 렌더링될 때 프로필 이미지 로드
  // }, []);

  // 파일 선택 후 처리
  // const handleProfileImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     uploadFile(file); // 파일 업로드 함수 호출
  //   }
  // };

  // 파일 업로드 함수
  // const uploadFile = async (file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const response = await axios.post("/api/files/update-profile-image", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     console.log("서버 응답 데이터:", response.data);

  //     const updatedProfileImageUrl = response.data.profileImageURL; // 서버에서 받은 URI
  //     setProfileImage(updatedProfileImageUrl); // 이미지 상태 업데이트
  //     alert("프로필 이미지가 성공적으로 수정되었습니다!");
  //   } catch (error) {
  //     console.error("이미지 업로드 중 오류 발생:", error);
  //     alert("이미지 업로드에 실패했습니다.");
  //   }
  // };

  // 프로필 이미지 가져오는 함수
  // 프로필 이미지 가져오기
  const fetchMemberProfileImage = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        window.location.href = "/login";
        return;
      }

      const response = await axios.get(
        "http://localhost:8080/api/mypage/member-profile-image",
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // 이미지 데이터를 바이너리 형식으로 받기
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setProfileImage(imageUrl); // 상태 업데이트
    } catch (error) {
      console.error(
        "멤버 프로필 이미지를 가져오지 못했습니다. Error:",
        error.message
      );
      alert("프로필 이미지를 가져오지 못했습니다. 다시 시도해주세요.");
    }
  };

  // 파일 업로드 함수
  const uploadMemberProfileImage = async (file) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        window.location.href = "/login";
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:8080/api/mypage/update-member-profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("이미지 업로드 성공:", response.data);
      alert("프로필 이미지가 성공적으로 업로드되었습니다.");
      fetchMemberProfileImage(); // 프로필 이미지를 새로고침
    } catch (error) {
      console.error("파일 업로드 에러:", error.message);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 파일 선택 시 호출되는 함수
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadMemberProfileImage(file);
    } else {
      alert("유효한 파일을 선택해주세요.");
    }
  };

  // 컴포넌트 마운트 시 프로필 이미지 로드
  useEffect(() => {
    fetchMemberProfileImage();
  }, []);

  return (
    <div className="profile-image-container">
      <div className="profile">
        <img
          src={profileImage || DefaultProfileImage}
          className="profile-image"
          alt="프로필 이미지"
        />
      </div>
      <div className="update-profile-image">
        <div className="upload-profile-image-box">
          <label htmlFor="profileImage" className="upload-profile-image-label">
            프로필 이미지 수정
          </label>
          <input
            type="file"
            name="profileImage"
            id="profileImage"
            accept="image/*" // 이미지 파일만 허용
            style={{ display: "none" }}
            onChange={handleProfileImageChange}
            ref={inputRef}
          />
          <p>정사각형 이미지를 활용해주세요.</p>
        </div>
      </div>
    </div>
  );
};

export default MypageProfileImage;
