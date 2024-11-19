import React, { useEffect, useState } from "react";

import StudyForm from "../components/StudyForm";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CreateMeeting.css";
import "../styles/global/Container.css";
import "../styles/global/Button.css";
import "../styles/global/Alert.css";
import Loading from "./../components/Feedback/Loading";
import ErrorMessage from "../components/Feedback/ErrorMessage";
import { useAuth } from "../context/AuthContext";
import {
  createStudy,
  getStudyById,
  updateStudy,
} from "../services/StudyApiService";

const StudyFormPage = ({ mode }) => {
  const navigate = useNavigate();
  const { studyId } = useParams();
  const [initialData, setInitialData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { authToken } = useAuth();

  const fetchStudyData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const studyData = await getStudyById(studyId);
      setInitialData(studyData);
    } catch (error) {
      console.error("Failed to fetch study info: ", error);
      setError("스터디 정보를 찾을 수 없습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (mode === "edit") {
      fetchStudyData().then(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [mode, studyId]);

  const handleSubmit = async (studyData) => {
    setIsLoading(true);
    try {
      let response = null;
      if (mode === "edit") {
        response = await updateStudy(studyId, { ...studyData, studyId });
        alert("성공적으로 스터디가 수정됐습니다.");
      } else {
        response = await createStudy({ ...studyData }, authToken);
        console.log(response);
        alert("성공적으로 스터디가 생성됐습니다.");
      }
      navigate(`/study-info/${response.studyId}`);
    } catch (error) {
      const errorMessage =
        error.response?.status === 400
          ? "잘못된 요청입니다."
          : `네트워크 오류입니다. ${
              mode === "edit" ? "스터디 수정 실패" : "스터디 생성 실패"
            }`;
      alert(errorMessage);
      console.error("Error: ", error.response || error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchStudyData} />;

  return (
    <div className="study-form">
      <h1>{mode === "edit" ? "스터디 수정" : "새로운 스터디 생성"}</h1>
      <StudyForm onSubmit={handleSubmit} initialData={initialData}></StudyForm>
    </div>
  );
};

export default StudyFormPage;
