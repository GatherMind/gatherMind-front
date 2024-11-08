import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import greenlighticon from "../assets/greenlighticon.png"
import redlighticon from "../assets/redlighticon.png"

function GroupApi({ setHasAppointment, statusFilter,searchResult }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate =useNavigate();

  

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/group")
      .then((response) => {
        console.log(response.data.groups);
        const appointments = response.data.groups || null;
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

  function handleclick(id) {
    navigate(`/main/group/${id}`);
  }

  const filteredData = data.filter((e) => {
    if (statusFilter === null) return true; // 전체
    return e.status === statusFilter;
  });


  const dataToRender = searchResult.length > 0
    ? filteredData.filter((e) =>
        searchResult.some((i) =>
          e.name.toLowerCase().includes(i.toLowerCase())
        )
      )
    : filteredData;


  return (
    <div className="group-list">
      {   dataToRender.length === 0 ? (<div>검색결과가 없습니다</div>) : 
      
      dataToRender.map((e) => (
        <div className="group-card" key={e.id}>
            
          <button className="btn-component" onClick={()=>handleclick(e.id)}>
          <div className="status">
        
        {e.status === false ?  (
        <div className={`status ${e.status}`}><img src={greenlighticon} width={12} height={12}/>모집중</div>) : ( <div className={`status ${e.status}`}>❗모집완료</div> )}
      </div>
            <div className="btn-name">
            {e.name}

            </div>
          
            
            
            </button>
        </div>
      ))}
    </div>
  );
}

export default GroupApi;
