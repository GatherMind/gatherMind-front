import React, { useState } from "react";
import "../styles/MeetingForm.css";

const MeetingForm = ({ onSubmit, studyCreatedId }) => {
  const [studyTitle, setStudyTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (studyTitle.length < 3) {
      setError("스터디 이름은 최소 3자 이상이어야 합니다.");
    }
    if (description.length < 10) {
      setError("스터디 소개는 최소 10자 이상이어야 합니다.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    onSubmit({ studyTitle, description, studyCreatedId });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="studyTitle">스터디 이름 : </label>
        <input
          id="studyTitle"
          type="text"
          value={studyTitle}
          onChange={(e) => setStudyTitle(e.target.value)}
          placeholder="그룹 이름"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">스터디 소개 :</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="그룹 소개"
          required
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? "생성 중..." : "그룹 생성"}
      </button>
    </form>
  );
};

export default MeetingForm;
