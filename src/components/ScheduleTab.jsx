import React, { useEffect, useState } from "react";
import { getStudySchedule } from "../services/apiService";
import "../styles/AppointmentTab.css";

const ScheduleTab = ({ studyId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = async (studyId) => {
    setIsLoading(true);
    try {
      const response = await getStudySchedule(studyId);
      setSchedules(response);
    } catch (error) {
      console.error("Failed to load appointments : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules(studyId);
  }, [studyId]);

  return (
    <div className="schedules">
      {isLoading ? (
        <div className="loading">Loading schedules...</div>
      ) : schedules && schedules.length > 0 ? (
        <>
          {schedules.map((schedule) => (
            <div className="schedule-item" key={schedule.scheduleId}>
              <div className="schedule-details">
                <div className="schedule-detail">
                  <strong>약속 이름:</strong> {schedule.title}
                </div>
                <div className="schedule-detail">
                  <strong>시간:</strong>{" "}
                  {new Date(schedule.scheduleTime).toLocaleString()}
                </div>
                <div className="schedule-detail">
                  <strong>장소:</strong> {schedule.location}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="no-schedules">
          약속이 없습니다. 약속을 만들어 보세요.
        </div>
      )}
    </div>
  );
};

export default ScheduleTab;
