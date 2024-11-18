import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyStudy } from "../services/apiService";

function AppointmentApi({ setHasAppointment }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { authToken } = useAuth();

  useEffect(() => {
    // axios
    //   .get("http://localhost:5001/api/appointment")
    //   .then((response) => {
    //     console.log(response.data.appointments);
    //     const appointments = response.data.appointments || null;
    //     setData(appointments);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setError("Error fetching data");
    //     setLoading(false);
    //   });
    const fetchMyStudyData = async () => {
      if (!authToken) {
        setHasAppointment(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await getMyStudy(authToken);
        const studies = response.data || null;
        setData(studies);

        console.log(studies);
        if (studies.length === 0) {
          setHasAppointment(true); // 데이터가 없을 때만 설정
        }
      } catch (error) {
        setError("Error fetching data");
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMyStudyData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  function handleClick(id) {
    navigate(`/study-info/${id}`);
  }

  return (
    <div className="mygroup-list">
      {data.slice(0.8).map((e) => (
        <div className="mygroup-card" key={e.studyId}>
          <button className="mybtn-card" onClick={() => handleClick(e.studyId)}>
            {e.title}
          </button>
        </div>
      ))}
    </div>
  );
}

export default AppointmentApi;
