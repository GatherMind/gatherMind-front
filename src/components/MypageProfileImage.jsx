import React, { useState, useRef } from "react";
import DefaultProfileImage from "../assets/defaultProfile.png"; // 기본 이미지
import "../styles/MypageProfileImage.css";
import axios from "axios";

const MypageProfileImage = ({ profileImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);

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
      console.log("업로드 중...");
      const response = await axios.post(
        "/api/files/update-profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("업로드 성공", response.data);
      fetchMemberProfileImage();
    } catch (error) {
      console.error("업로드 실패", error);
      alert("이미지 업로드에 실패했습니다.");
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
      console.error("프로필 이미지를 가져오는 데 실패했습니다.", error);
    }
  };

  return (
    <div className="profile-image-container">
      <div className="profile">
        <img
          src={selectedImage || profileImage || DefaultProfileImage}
          className="profile-image"
          alt="프로필 이미지"
        />
      </div>
      <div className="update-profile-image">
        <div className="upload-profile-image-box">
          {/* label의 onClick 제거 */}
          <label htmlFor="profileImage" className="upload-profile-image-label">
            프로필 이미지 수정
          </label>
          <input
            type="file"
            name="profileImage"
            id="profileImage"
            accept="image/*"
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
