import React, { useEffect, useState } from "react";
import "../styles/AppointmentTab.css";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { getStudySchedule } from "../services/StudyApiService";
import { deleteSchedule } from "../services/ScheduleApiService";

const ScheduleTab = ({ studyId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleIdToDelete, setScheduleIdToDelete] = useState(null);

  const navigate = useNavigate();

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

  const handleUpdateClick = (scheduleId) => {
    navigate(`/edit-schedule/${scheduleId}`);
  };

  const handleDeleteClick = (scheduleId) => {
    setScheduleIdToDelete(scheduleId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsModalOpen(false);
    setIsLoading(true);
    try {
      await deleteSchedule(scheduleIdToDelete);
      setSchedules((prev) =>
        prev.filter((schedule) => schedule.scheduleId !== scheduleIdToDelete)
      );
    } catch (error) {
      console.error("Failed to load appointments : ", error);
    } finally {
      setIsLoading(false);
    }
  };

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
                  {new Date(schedule.dateTime).toLocaleString()}
                </div>
                <div className="schedule-detail">
                  <strong>장소:</strong> {schedule.location}
                </div>
              </div>
              <div>
                <button
                  className="button btn-left"
                  onClick={() => handleUpdateClick(schedule.scheduleId)}
                >
                  수정
                </button>
                <button
                  className="button-error btn-right"
                  onClick={() => handleDeleteClick(schedule.scheduleId)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="no-schedules">
          약속이 없습니다. 약속을 만들어 보세요.
        </div>
      )}

      {isModalOpen && (
        <ConfirmModal
          message="정말 삭제하시겠습니까?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ScheduleTab;
