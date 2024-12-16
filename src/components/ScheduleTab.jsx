import React, { useEffect, useState } from "react";
import "../styles/AppointmentTab.css";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { getStudySchedule } from "../services/StudyApiService";
import { deleteSchedule } from "../services/ScheduleApiService";
import ScheduleItem from "./ScheduleItem";

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
      <div className="tab-header">
        <h3>일정 목록</h3>
        <button
          className="create-button"
          onClick={() => navigate(`/create-schedule`, { state: { studyId } })}
        >
          일정 추가
        </button>
      </div>
      {isLoading ? (
        <div className="loading">Loading schedules...</div>
      ) : schedules && schedules.length > 0 ? (
        schedules.map((schedule) => (
          <ScheduleItem
            key={schedule.scheduleId}
            schedule={schedule}
            onEdit={() =>
              navigate(`/edit-schedule/${schedule.scheduleId}`, {
                state: { studyId },
              })
            }
            onDelete={() => handleDeleteClick(schedule.scheduleId)}
          />
        ))
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
