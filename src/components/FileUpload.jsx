import React, { useState } from "react";
import axios from "axios";

function FileUpload({ setFile }) {
  // const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("userId", "testUser"); // 사용자 ID 등 추가 데이터
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/api/files/upload",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log("파일 업로드 성공:", response.data);
    // } catch (error) {
    //   console.error("파일 업로드 실패:", error);
    // }
  };

  return (
    <>
      <label htmlFor="file_select">파일 선택</label>
      <input type="file" onChange={handleFileChange} />
      {/* <button className="button" onClick={handleUpload}>
        Upload
      </button> */}
    </>
  );
}

export default FileUpload;
