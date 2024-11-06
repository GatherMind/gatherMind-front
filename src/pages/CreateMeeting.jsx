import React from "react";

import MeetingForm from "../components/MeetingForm";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CreateMeeting.css";
import { useUser } from "../context/UserContext";
import { createMeeting } from "../services/apiService";

const CreateMeeting = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setUserId } = useUser();

  const handleGroupCreate = async (meetingData) => {
    try {
      const response = await createMeeting(meetingData);

      // 201 created
      setUserId(id);
      alert("성공적으로 그룹이 생성됐습니다.");
      navigate(`/meeting-info/${response.meetingId}`);
    } catch (error) {
      if (error.response) {
        // 서버에서 반환한 에러 응답이 있는 경우
        console.error("그룹 생성 실패", error.response);
        if (error.response.status === 400) {
          alert("잘못된 요청입니다.");
        } else {
          alert("그룹 생성 실패 : " + error.response.data.message);
        }
      } else {
        console.error("네트워크 오류,", error);
        alert("네트워크 오류입니다.");
      }
    }
  };

  return (
    <div className="container">
      <h1>새로운 그룹 생성</h1>
      <div className="meeting-form">
        <MeetingForm
          onSubmit={handleGroupCreate}
          meetingCreatedId={id}
        ></MeetingForm>
      </div>
    </div>
  );
};

export default CreateMeeting;
