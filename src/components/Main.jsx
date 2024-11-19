import "../css/main.css";
import Group from "../components/Group";
import AppointmentApi from "../server/AppointmentApi";
import Noappointment from "../components/Noappointment";
import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SerchBar";
import Slide from "../components/Slide";
import MakeGroup from "./GroupInfo";

export default function Main() {
  const [hasAppointment, setHasAppointment] = useState(false);

  const [statusFilter, setStatusFilter] = useState(null);

  const [searchResult, setSearchResult] = useState([]);

  function handleSearch(query) {
    console.log(query);
    setSearchResult([query]);
  }

  const navigate = useNavigate();

  function handleStatus(e) {
    setStatusFilter(e);
  }

  return (
    <>
      <Profile />

      <Slide />

      <div className="mytitle">내 스터디</div>

      <div className="mygrouplist">
        {hasAppointment ? (
          <Noappointment />
        ) : (
          <AppointmentApi setHasAppointment={setHasAppointment} />
        )}
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="group">
        <div className="group-header">
          {" "}
          <div className="groupheader-title" onClick={() => handleStatus(null)}>
            전체
          </div>
          <div
            className="groupheader-title"
            onClick={() => handleStatus(false)}
          >
            모집중
          </div>{" "}
          <div className="groupheader-title" onClick={() => handleStatus(true)}>
            모집완료
          </div>{" "}
        </div>

        <div className="group-list">
          <Group
            statusFilter={statusFilter}
            searchResult={searchResult}
            setHasAppointment={setHasAppointment}
          />
        </div>
      </div>
    </>
  );
}

// {hasAppointment ? <>
//   {/* <div className="modal">
// <Toast isOpen={isModalOpen} onClose={handleCloseModal}>
// <p>현재 소속된 그룹이없습니다</p>
// <button className="modal-btn" onClick={modalclick}>그룹생성</button>

// </Toast>
// </div> */}
//    <Nogroup/> </>  :  <GroupApi setHasAppointment={setHasAppointment}/>
