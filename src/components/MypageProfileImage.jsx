import React from "react";
import DefaultProfileImage from "../assets/defaultProfile.png"; // import된 기본 이미지
import "../styles/MypageProfileImage.css";

const MypageProfileImage = ({ profileImage, nickname }) => {
  return (
    <div className="profile-image-container">
      <img
        src={profileImage || "/api/files/default-profile"} // profileImage가 없으면 DefaultProfileImage 사용
        className="profile-image"
        alt={`프로필 이미지`}
      />
      <div className="update-profile-image">
        <div className="upload-profile-image-box">
          <label htmlFor="profileImage" className="upload-profile-image-label">
            프로필 이미지 수정
          </label>
          <input
            type="file"
            name="profileImage"
            id="profileImage"
            style={{ display: "none" }}
          />
          <p>정사각형 이미지를 활용해주세요.</p>
        </div>
      </div>
    </div>
  );
};

export default MypageProfileImage;
