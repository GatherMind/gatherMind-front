import React, { useState } from "react";
import "../styles/MeetingForm.css";

const MeetingForm = ({ onSubmit, meetingCreatedId }) => {
  const [meetingName, setMeetingName] = useState("");
  const [meetingInfo, setMeetingInfo] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (meetingName.length < 3) {
      setError("그룹 이름은 최소 3자 이상이어야 합니다.");
    }
    if (meetingInfo.length < 10) {
      setError("그룹 소개는 최소 10자 이상이어야 합니다.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    onSubmit({ meetingName, meetingInfo, meetingCreatedId });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="meetingName">그룹 이름 : </label>
        <input
          id="meetingName"
          type="text"
          value={meetingName}
          onChange={(e) => setMeetingName(e.target.value)}
          placeholder="그룹 이름"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="meetingInfo">그룹 소개 :</label>
        <textarea
          id="meetingInfo"
          value={meetingInfo}
          onChange={(e) => setMeetingInfo(e.target.value)}
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
