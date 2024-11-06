import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import {
  attendAppointment,
  getMeetingAppointment,
} from "../services/apiService";
import "../styles/AppointmentTab.css";

const AppointmentTab = ({ meetingId }) => {
  const { userId } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // 페이지별 약속 목록 가져오기
  const loadAppointments = async (pageNumber = 0) => {
    setIsLoading(true);
    try {
      const response = await getMeetingAppointment(
        meetingId,
        userId,
        pageNumber
      );
      setAppointments(response.content);
      setPage(response.pageable.pageNumber);
      setTotalPages(response.totalPages);

      const initialStatus = response.content.reduce((acc, appoint) => {
        acc[appoint.appointmentId] = appoint.isAttend;
        return acc;
      }, {});
      setAttendanceStatus(initialStatus);
    } catch (error) {
      console.error("Failed to load appointments : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments(page);
  }, [page]);

  // 참석 버튼
  const handleAttend = async (appointmentId) => {
    setIsLoading(true);
    const formData = {
      member: { memberId: userId },
      meeting: { meetingId: meetingId },
      appointment: { appointmentId: appointmentId },
    };
    try {
      await attendAppointment(formData);

      setAttendanceStatus((prev) => ({
        ...prev,
        [appointmentId]: !prev[appointmentId],
      }));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const renderAppointment = (appoint) => {
    // `appointmentTime`을 Date 객체로 변환
    const appointmentTime = new Date(appoint.appointmentTime);
    const currentTime = new Date();
    const isAttended = attendanceStatus[appoint.appointmentId];

    return (
      <div className="appointment-item" key={appoint.appointmentId}>
        <div className="appointment-details">
          <div className="appointment-detail">
            <strong>약속 이름:</strong> {appoint.appointmentName}
          </div>
          <div className="appointment-detail">
            <strong>시간:</strong> {appoint.appointmentTime}
          </div>
          <div className="appointment-detail">
            <strong>장소:</strong> {appoint.location}
          </div>
          <div className="appointment-detail">
            <strong>상태:</strong>{" "}
            {appoint.appointmentStatus ? "약속 예정" : "약속 완료"}
          </div>
          <div className="appointment-detail">
            <strong>패널티:</strong> {appoint.penalty}
          </div>
        </div>
        {!isLoading &&
          appoint.appointmentStatus &&
          currentTime < appointmentTime && (
            <button
              className={`attend-button`}
              onClick={() => {
                if (!isAttended) {
                  handleAttend(appoint.appointmentId);
                }
              }}
              disabled={isAttended}
            >
              {isAttended ? "참석중" : "참석"}
            </button>
          )}
      </div>
    );
  };
  return (
    <div className="appointments">
      {appointments && appointments.length > 0 ? (
        <>
          {appointments.map(renderAppointment)}
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 0}>
              Previous
            </button>
            {[...Array(totalPages).keys()]
              .slice(Math.max(0, page - 2), Math.min(totalPages, page + 3))
              .map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  disabled={pageNumber === page}
                  className={pageNumber === page ? "active" : ""}
                >
                  {pageNumber + 1}
                </button>
              ))}
            <button onClick={handleNextPage} disabled={page === totalPages - 1}>
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="no-appointments">
          {" "}
          약속이 없습니다. 약속을 만들어 보세요.
        </div>
      )}
    </div>
  );
};

export default AppointmentTab;
