import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AppointmentApi({ setHasAppointment }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/appointment")
      .then((response) => {
        console.log(response.data.appointments);
        const appointments = response.data.appointments || null;
        setData(appointments);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (data === null || data.length === 0) {
    setHasAppointment(true);
  }

  function handleClick(id) {
    navigate(`/main/appointment/${id}`);
  }

  return (
    <div className="mygroup-list">
      {data.slice(0.8).map((e) => (
        <div className="mygroup-card" key={e.id}>
          <button className="mybtn-card" onClick={() => handleClick(e.id)}>
            {e.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default AppointmentApi;
