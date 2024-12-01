import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ScheduleForm from "../components/ScheduleForm";
import "../styles/MeetingForm.css";
import "../styles/CreateSchedule.css";
import {
  createSchedule,
  getSchedule,
  updateSchedule,
} from "../services/ScheduleApiService";
import { useAuth } from "../context/AuthContext";

const CreateSchedule = ({ isModify }) => {
  const navigate = useNavigate();
  const LocationDom = useLocation();
  const { id } = useParams();
  const { studyId } = LocationDom.state || {};
  const { authToken } = useAuth();

  const [scheduleInitData, setScheduleInitData] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (isModify) {
      // 수정 모드일 때 데이터 불러옴
      const fetchSchedule = async () => {
        try {
          const scheduleInitData = await getSchedule(id);

          setScheduleInitData(scheduleInitData);
        } catch (error) {
          console.error("일정 정보를 불러오지 못했습니다.", error);
        }
      };
      fetchSchedule();
    }
  }, [isModify, id]);

  // 데이터 전송
  const handleSaveSchedule = async (scheduleData) => {
    try {
      var response = null;
      if (isModify) {
        response = await updateSchedule(id, scheduleData);
      } else {
        response = await createSchedule(
          { ...scheduleData, studyId },
          authToken
        ); // studyId 임시
      }
    } catch (error) {
      console.error(`일정 ${isModify ? "수정" : "생성"} 실패`, error);
      setError(
        "저장 실패하였습니다.\n로그인 정보 또는 스터디 가입 정보를 확인해주세요."
      );
    }
    navigate(`/study-info/${studyId}`);
  };

  if (error) {
    alert(error);
    setError("");
  }

  return (
    <div>
      <h1>{isModify ? "일정 수정하기" : "새로운 일정 생성"}</h1>
      <ScheduleForm
        onSubmit={handleSaveSchedule}
        scheduleData={scheduleInitData}
      />
    </div>
  );
};

export default CreateSchedule;
