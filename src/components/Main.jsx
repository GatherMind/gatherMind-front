import "../css/main.css";
import Group from "../components/Group";
import Nostudy from "./Nostudy";
import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SerchBar";
import Slide from "../components/Slide";
import checkLoginStatus from "../hooks/checkLoginStatus";
import MyStudyList from "./MyStudyList";
import {
  getMemberByToken,
  getMyStudyByToken,
} from "../services/MemberApiService";

export default function Main({ handleLoginStatus }) {
  const [hasStudy, setHasStudy] = useState(false);

  const [statusFilter, setStatusFilter] = useState(null);

  const [searchResult, setSearchResult] = useState([]);

  const [loginData, setLoginData] = useState(null);

  const [MyStudies, setMyStudies] = useState([]);

  useEffect(() => {
    const verifyLoginStatus = async () => {
      try {
        const response = await getMemberByToken();
        setLoginData(response.data);
        handleLoginStatus(response.data);
      } catch (error) {
        console.error("에러입니다:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await getMyStudyByToken(); // 사용자 스터디 조회

        setMyStudies(response.data);
      } catch (error) {
        console.error("에러입니다:", error);
      }
    };

    verifyLoginStatus();
    fetchData();
  }, []);

  useEffect(() => {
    if (MyStudies.length > 0) {
      setHasStudy(true); // 데이터가 있으면 hasStudy 상태를 true로 설정
    } else {
      setHasStudy(false); // 데이터가 없으면 false
    }
  }, [MyStudies]);

  function handleSearch(query) {
    setSearchResult([query]);
  }

  function handlemakeclick() {
    navigate("/create-study");
  }

  const navigate = useNavigate();

  function handleStatus(e) {
    setStatusFilter(e);
  }

  return (
    <>
      {loginData && <Profile loginData={loginData} />}

      <Slide />

      {!hasStudy ? (
        <Nostudy />
      ) : (
        <>
          <div className="mytitle">내 스터디</div>

          <MyStudyList statusFilter={statusFilter} MyStudies={MyStudies} />
        </>
      )}

      <SearchBar onSearch={handleSearch} />

      <div className="studymakediv">
        <button className="studymakebtn" onClick={handlemakeclick}>
          스터디 만들기
        </button>
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
          <div
            className="groupheader-title"
            onClick={() => handleStatus("true")}
          >
            모집완료
          </div>{" "}
        </div>

        <div className="group-list">
          <Group
            statusFilter={statusFilter}
            searchResult={searchResult}
            loginData={loginData}
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
