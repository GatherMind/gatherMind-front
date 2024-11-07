import React, { useEffect, useState } from "react";

import StudyForm from "../components/StudyForm";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CreateMeeting.css";
import { createStudy, getStudyById, updateStudy } from "../services/apiService";
import { useUser } from "./../context/UserContext";

const StudyFormPage = ({ mode }) => {
  const navigate = useNavigate();
  const { memberId, studyId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const { userId } = useUser();

  useEffect(() => {
    if (mode === "edit") {
      const fetchStudyData = async () => {
        try {
          const studyData = await getStudyById(studyId);
          setInitialData(studyData);
        } catch (error) {
          console.error("Failed to fetch study info: ", error);
        }
      };
      fetchStudyData();
    }
  }, [mode, studyId]);

  const handleSubmit = async (studyData) => {
    try {
      let response = null;
      if (mode === "edit") {
        response = await updateStudy(studyId, { ...studyData, studyId });
        alert("성공적으로 스터디가 수정됐습니다.");
      } else {
        response = await createStudy({ ...studyData, memberId });
        alert("성공적으로 스터디가 생성됐습니다.");
      }
      // navigate(`/study-info/${response.studyId}`);
    } catch (error) {
      const errorMessage =
        error.response?.status === 400
          ? "잘못된 요청입니다."
          : `네트워크 오류입니다. ${
              mode === "edit" ? "스터디 수정 실패" : "스터디 생성 실패"
            }`;
      alert(errorMessage);
      console.error("Error: ", error.response || error);
    }
  };

  return (
    <div className="container">
      <h1>{mode === "edit" ? "스터디 수정" : "새로운 스터디 생성"}</h1>
      <div className="study-form">
        <StudyForm
          onSubmit={handleSubmit}
          initialData={initialData}
          studyCreatedUserId={memberId}
        ></StudyForm>
      </div>
    </div>
  );
};

export default StudyFormPage;
