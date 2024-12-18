import React, { useState } from "react";
import Modal from "./Modal";
import "../styles/FileDragDrop.css";

const FileDragDrop = ({ file, setFile, beforeFileName, url }) => {
  const [preview, setPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile.size > 10 * 1024 * 1024) {
      alert("파일 크기가 10MB를 초과했습니다.");
      return;
    }
    setFile(uploadedFile);

    filePreviewCheck(uploadedFile);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePreviewButton = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCancelButton = (e) => {
    e.preventDefault();
    setFile(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;

    console.log(files);
    if (files.length > 0) {
      const uploadedFile = files[0];
      if (uploadedFile.size > 10 * 1024 * 1024) {
        alert("파일 크기가 10MB를 초과했습니다.");
        return;
      }

      setFile(uploadedFile);
      filePreviewCheck(uploadedFile);
    }
  };

  const filePreviewCheck = (uploadFile) => {
    // 파일 미리보기 (예: 이미지 파일)
    if (uploadFile && uploadFile.type.includes("image")) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(uploadFile);

      setIsModalOpen(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };
  return (
    <>
      <div
        className={`drag-container ${isDragActive ? "drag-active" : ""}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {file ? (
          <div className="file-selected-container">
            <div className="file-selected-name">{file.name}</div>
            {file.type.includes("image") && (
              <button className="button" onClick={handlePreviewButton}>
                미리보기
              </button>
            )}
            <button className="button-error" onClick={handleCancelButton}>
              취소
            </button>
          </div>
        ) : (
          <div className="file-select-container">
            <div className="file-select-description">
              최대 10mb이하 파일 첨부 가능
            </div>

            <label className="file-select-label" htmlFor="file_select">
              파일 선택
            </label>
            <input
              className="input-none"
              id="file_select"
              type="file"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
      <div>
        {" "}
        {beforeFileName && (
          <div className="before-file-container">
            <div className="before-file-description">수정 전 파일</div>
            <div className="before-file-name">
              <a href={url} target="_blank" rel="noopener noreferrer">
                {beforeFileName}
              </a>
            </div>
          </div>
        )}
      </div>

      {preview && (
        <>
          <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title={file?.name || ""}
            children={
              <img src={preview} alt="미리보기" style={{ maxWidth: "100%" }} />
            }
          />
        </>
      )}
    </>
  );
};

export default FileDragDrop;
