import { useEffect, useState } from "react";
import "../styles/MypageProfileImage.css";
import axios from "axios";

const MypageProfileImage = () => {
  const defaultImageUrl = "http://localhost:8080/images/default-profile.png"; // 기본 프로필 이미지 URL
  const [imagePreview, setImagePreview] = useState(defaultImageUrl); // 미리보기 URL

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]; // 첫 번째 파일만 선택
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // 미리보기 URL 설정
      uploadProfileImage(file); // 파일을 서버에 업로드
    }
  };

  const uploadProfileImage = async (file) => {
    try {
      const token = localStorage.getItem("jwtToken"); // JWT 토큰 가져오기
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file); // 업로드할 파일 추가

      const response = await axios.post(
        "http://localhost:8080/api/profile-image/upload", // 서버의 프로필 이미지 업로드 API URL
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰 추가
          },
        }
      );

      // 성공 메시지 처리
      const message =
        response.data.message || "프로필 이미지가 성공적으로 업로드되었습니다.";
      console.log("프로필 이미지 업로드 성공:", response.data);
      alert(message);
    } catch (error) {
      // 에러 메시지 처리
      if (error.response) {
        console.error("서버 에러:", error.response.data);
        alert(error.response.data.message || "이미지 업로드에 실패했습니다.");
      } else {
        console.error("요청 처리 실패:", error);
        alert("이미지 업로드 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="profile-image-container">
      {/* 프로필 이미지 */}
      <img src={imagePreview} className="profile-image" alt="프로필 이미지" />

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
            onChange={handleProfileImageChange} // 파일 선택 이벤트
          />
        </div>
      </div>
    </div>
  );
};

export default MypageProfileImage;
