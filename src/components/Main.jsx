import "../css/main.css";
import Group from "../components/Group";
import Nostudy from "./Nostudy";
import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SerchBar";
import Slide from "../components/Slide";
import checkLoginStatus from '../hooks/checkLoginStatus'
import MyStudyList from "./MyStudyList";

export default function Main() {
  const [hasStudy, setHasStudy] = useState(false);

  const [statusFilter, setStatusFilter] = useState(null);

  const [searchResult, setSearchResult] = useState([]);

  const [loginData, setLoginData] = useState(null);

  const [dataLoaded, setDataLoaded] = useState(false);


  useEffect(() => {
    const verifyLoginStatus = async () => {
      const status = await checkLoginStatus();
      setLoginData(status);
      console.log(status)
    };

    verifyLoginStatus(); // 컴포넌트 로드 시 로그인 상태 확인
  }, []);

  function handleSearch(query) {
    console.log(query);
    setSearchResult([query]);
  }

  function handlemakeclick() {

    navigate('/makegroup')
  } 

  const navigate = useNavigate();


  function handleStatus(e) {
    setStatusFilter(e);
  }

function handdlesetDataLoaded() {

  setDataLoaded()
}

  return (
    <>
      {loginData ? (
             <Profile loginData={loginData}/>
      ) : (
        <p>로그인되지dd 않았습니다.</p>
      )}



    
      <Slide />

      <div className="mytitle">내 스터디</div>

   
        {hasStudy ? (
          <Nostudy />
        ) : (
          <MyStudyList
          statusFilter={statusFilter}
          setHasStudy={setHasStudy}
          handdlesetDataLoaded={handdlesetDataLoaded}
        />
        )}


      <SearchBar onSearch={handleSearch} />

      <div className="studymakediv">
        <button className="studymakebtn" onClick={handlemakeclick}>스터디 만들기</button>
      </div>

      <div className="group">
        <div className="group-header">
          {" "}
          <div className="groupheader-title" onClick={() => handleStatus(null)}>
            전체
          </div>
          <div
            className="groupheader-title"
            onClick={() => handleStatus("false")}
          >
            모집중
          </div>{" "}
          <div className="groupheader-title" onClick={() => handleStatus("true")}>
            모집완료
          </div>{" "}
        </div>

        <div className="group-list">
          <Group
            statusFilter={statusFilter}
            searchResult={searchResult}
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
