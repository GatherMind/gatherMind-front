import React from "react";
import "../styles/ScheduleItem.css";

const ScheduleItem = ({ schedule, onEdit, onDelete }) => {
  const { title, dateTime, location, nickname } = schedule;

  // 날짜와 시간 포맷팅
  const formattedDate = new Date(dateTime).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = new Date(dateTime).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="schedule-item">
      <div className="schedule-details">
        <div className="schedule-detail">
          <strong>약속 이름:</strong> {title}
        </div>
        <div className="schedule-detail">
          <strong>날짜:</strong> {formattedDate}
        </div>
        <div className="schedule-detail">
          <strong>시간:</strong> {formattedTime}
        </div>
        <div className="schedule-detail">
          <strong>장소:</strong> {location}
        </div>
        <div className="schedule-detail">
          <strong>주최자:</strong> {nickname}
        </div>
      </div>
      <div className="btn-container">
        <button className="button" onClick={onEdit}>
          수정
        </button>
        <button className="button-error button" onClick={onDelete}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default ScheduleItem;
