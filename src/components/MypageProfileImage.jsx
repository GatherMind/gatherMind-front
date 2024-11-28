import React, { useState, useRef } from "react";
import DefaultProfileImage from "../assets/defaultProfile.png"; // 기본 이미지
import "../styles/MypageProfileImage.css";
import axios from "axios";

const MypageProfileImage = ({ profileImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    inputRef.current.click();
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("멤버 이미지 교체");
      const response = await axios.post(
        "/api/files/update-profile-image",
        formData,
        {
          headers: {
            "Content-Type": "myltipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("멤버 프로필 교체 성공", response.data);

      fetchMemberProfileImage();
    } catch (error) {
      console.error("오류", error);
      alert("이미지에 업로드 실패");
    }
  };

  const fetchMemberProfileImage = async () => {
    try {
      const response = await axios.get("/api/files/profile-image", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSelectedImage(response.data.profileImageURL);
    } catch (error) {
      console.error("실패", error);
    }
  };

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
          <label
            htmlFor="profileImage"
            className="upload-profile-image-label"
            onClick={handleUploadClick}
          >
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
