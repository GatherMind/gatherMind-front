import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import greenlighticon from "../assets/greenlighticon.png";
import redlighticon from "../assets/redlighticon.png";
import UseGroupApi from "../server/UseGroupApi";
import GroupInfo from "./GroupInfo";

function GroupApi({ setHasAppointment, statusFilter, searchResult }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [groupInfoData, setGroupInfoData] = useState();

  const { data, loading, error } = UseGroupApi();

  const navigate = useNavigate();


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  function handleclick(data) {
    console.log(data)
    setGroupInfoData(data)
    handleOpenModal();
  }

  function handlemakeclick() {

    navigate('/makegroup')
  } 

  const filteredData = data.filter((e) => {
    if (statusFilter === null) return true; // 전체
    return e.status === statusFilter;
  });

  const dataToRender =
    searchResult.length > 0
      ? filteredData.filter((e) =>
          searchResult.some((i) =>
            e.title.toLowerCase().includes(i.toLowerCase())
          )
        )
      : filteredData;

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpenModal = () => {
    console.log("열림");

    setModalOpen(true);
  };

  return (
    <div className="group-list">
      <div className="studymakediv">
        <GroupInfo isOpen={isModalOpen} onClose={handleCloseModal} groupInfoData={groupInfoData}>
          <h2></h2>
        </GroupInfo>

        <button className="studymakebtn" onClick={handlemakeclick}>스터디 만들기</button>
      </div>

      {dataToRender.length === 0 ? (
        <div>검색결과가 없습니다</div>
      ) : (
        dataToRender.map((data) => (
          <div className="group-card" key={data.id}>
            <button className="btn-component" onClick={() => handleclick(data)}>
              <div className="status">
                {data.status === false ? (
                  <div className={`status ${data.status}`}>
                    <img src={greenlighticon} width={12} height={12} />
                    모집중
                  </div>
                ) : (
                  <div className={`status ${data.status}`}>❗모집완료</div>
                )}
              </div>
              <div className="btn-name">{data.title}</div>
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default GroupApi;
