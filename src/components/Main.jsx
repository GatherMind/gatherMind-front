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
import { getStudyCategory } from "../services/StudyCategoryApiService";
import StudyCategoriesComponent from "./StudyCategoriesComponent";

export default function Main({ handleLoginStatus }) {
  const studyStatus = ["OPEN", "CLOSED"];

  const [hasStudy, setHasStudy] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState(null);

  const [searchResult, setSearchResult] = useState([]);

  const [loginData, setLoginData] = useState(null);

  const [MyStudies, setMyStudies] = useState([]);

  const [studyCategories, setStudyCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [memberResponse, studyResponse] = await Promise.all([
          getMemberByToken(),
          getMyStudyByToken(),
        ]);

        setLoginData(memberResponse.data);
        handleLoginStatus(memberResponse.data);
        setMyStudies(studyResponse.data);
      } catch (error) {
        console.error("에러입니다:", error);
      }
    };

    const fetchCategory = async () => {
      try {
        const studyCategory = await getStudyCategory();
        setStudyCategories(studyCategory);
      } catch (error) {
        console.error("카테고리 조회 error :", error);
      }
    };
    fetchCategory();
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

  const navigate = useNavigate();

  function handleStatus(e) {
    setCategoryFilter(e);
  }
  function handleMakeClick() {
    navigate("/create-study");
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

          <MyStudyList categoryFilter={categoryFilter} MyStudies={MyStudies} />
        </>
      )}

      <SearchBar onSearch={handleSearch} />

      <div className="studymakediv">
        <button className="studymakebtn" onClick={handleMakeClick}>
          스터디 만들기
        </button>
      </div>

      <div className="group">
        <StudyCategoriesComponent
          studyCategories={studyCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="group-list">
          <Group
            categoryFilter={selectedCategory}
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
