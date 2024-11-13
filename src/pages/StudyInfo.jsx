import React, { useEffect, useState } from "react";
import "../styles/MeetingInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMyInfoById,
  getStudyMembersAndBoards,
  getStudyInfoAndMembersAndBoards,
  getBoards,
} from "../services/apiService";
import MembersTab from "../components/MembersTab";
import { useUser } from "../context/UserContext";
import ScheduleTab from "../components/ScheduleTab";
// import { FaCog } from "react-icons/fa";

const StudyInfo = () => {
  // 임시
  const userId = "member1";
  const { setUserId } = useUser();

  const [activeTab, setActiveTab] = useState("members");
  const { studyId } = useParams();
  const navigate = useNavigate();

  const [study, setStudy] = useState(null);
  const [members, setMembers] = useState([]);
  const [boards, setBoards] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // boards page
  const [boardsPage, setBoardsPage] = useState(0);
  const [boardsTotalPages, setBoardsTotalPages] = useState(1);
  const [boardsTotalElements, setBoardsTotalElements] = useState(0);

  // 팝업 관련
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  // 톱니바퀴 버튼
  const [showMenu, setShowMenu] = useState(false);

  const [role, setRole] = useState("Member");

  // 그룹 정보/멤버 가져오기
  useEffect(() => {
    setUserId(userId);
    const fetchMeetingInfo = async () => {
      try {
        const [memberInfo, studyData] = await Promise.all([
          getMyInfoById(userId, studyId),
          getStudyInfoAndMembersAndBoards(studyId, 0, 5),
        ]);

        setRole(memberInfo.role);
        setStudy(studyData);
        setMembers(studyData.members);
        setBoards(studyData.questions.content);
        setBoardsPage(studyData.questions.pageable.pageNumber);
        setBoardsTotalPages(studyData.questions.totalPages);
        setBoardsTotalElements(studyData.questions.totalElements);
      } catch (error) {
        console.error("데이터 불러오기 실패", error);
        setError("정보를 찾을 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingInfo();
  }, [studyId, userId]);

  // 페이지 변경 함수
  const handlePageChange = async (newPage) => {
    try {
      const response = await getBoards(studyId, newPage); // API 호출
      setBoards(response.content);
      setBoardsPage(response.pageable.pageNumber);
      setBoardsTotalPages(response.totalPages);
      setBoardsTotalElements(response.totalElements);
    } catch (error) {
      console.error("게시판 목록을 불러오지 못했습니다.", error);
      setError("게시판 목록을 불러오지 못했습니다.");
    }
  };

  // 그룹 멤버 가져오기
  const handleFetchMembers = async () => {
    try {
      const membersData = await getStudyMembersAndBoards(studyId);
      setMembers(membersData.members);
      setBoards(membersData.questions.content);
      setBoardsPage(membersData.questions.pageable.pageNumber);
      setBoardsTotalPages(membersData.questions.totalPages);
      setBoardsTotalElements(membersData.questions.totalElements);
    } catch (err) {
      setError("멤버 정보를 가져오지 못했습니다.");
    }
  };

  // 탭 클릭
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "members") {
      handleFetchMembers();
    }
  };

  // fixed 버튼 클릭시
  const handleButtonClick = () => {
    if (activeTab === "members") {
      navigate(`/create-question`, { state: { studyId } });
    } else {
      // 일정 생성 페이지로 이동
      navigate(`/create-schedule`, { state: { studyId } });
    }
  };

  const handleAddMember = (response) => {
    setMembers((prev) => [...prev, response]);
  };

  const toggleMenu = () => setShowMenu((prevShowMenu) => !prevShowMenu);

  if (loading) return <div>Loading...</div>;

  //   if (loading) return <Loading />;
  // if (error) return <Error message={error} />;
  if (error) return <div>{error}</div>;

  return (
    <div className="study-info">
      {/* 그룹 정보 */}
      <div className="study-intro">
        <h2>{study.title}</h2>
        <p>{study.description} </p>
        <div className="settings-icon" onClick={toggleMenu}>
          {role === "Leader" && (
            <>
              {/* <FaCog /> */}
              {showMenu && (
                <div className="menu">
                  <button
                    onClick={() => navigate(`/edit-study/${study.studyId}`)}
                  >
                    수정
                  </button>
                  <button onClick={() => console.log("삭제")}>삭제</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {/* 멤버 / 약속 탭 */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "members" ? "active" : ""}`}
          onClick={() => {
            handleTabClick("members");
            handleFetchMembers();
          }}
        >
          멤버
        </button>
        <button
          className={`tab-button ${activeTab === "schedules" ? "active" : ""}`}
          onClick={() => {
            handleTabClick("schedules");
          }}
        >
          약속
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="tab-content">
        {/* 멤버탭 콘텐츠 */}

        {activeTab === "members" && (
          <MembersTab
            members={members}
            boards={boards}
            boardsPage={boardsPage}
            boardsTotalPages={boardsTotalPages}
            boardsTotalElements={boardsTotalElements}
            onPageChange={handlePageChange}
          />
        )}

        {/* 일정탭 콘텐츠 */}
        {activeTab === "schedules" && <ScheduleTab studyId={studyId} />}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed-button">
        <button onClick={handleButtonClick}>
          {activeTab === "members" ? "글쓰기" : "일정 추가"}
        </button>
      </div>
    </div>
  );
};

export default StudyInfo;
