import React, { useCallback, useEffect, useState } from "react";
import "../styles/MeetingInfo.css";
import "../styles/global/Tabs.css";
import "../styles/global/DropdownMenu.css";
import "../styles/global/Card.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMyInfoById } from "../services/MemberApiService";
import MembersTab from "../components/MembersTab";
import ScheduleTab from "../components/ScheduleTab";
import { FaCog } from "react-icons/fa";
import Loading from "./../components/Feedback/Loading";
import ErrorMessage from "../components/Feedback/ErrorMessage";
import { useAuth } from "../context/AuthContext";
import {
  getStudyMembersAndBoards,
  getStudyInfoAndMembersAndBoards,
  deleteStudy,
  getBoards,
} from "../services/StudyApiService.jsx";
import {
  confirmStudyMember,
  resignStudyMember,
} from "../services/StudyMemberApiService.jsx";
import { STUDY_ROLE, TABS, MEMBER_STATUS } from "../constants/constants.js";
import BoardsTab from "../components/BoardsTab.jsx";

const StudyInfo = () => {
  const location = useLocation();
  const { activeTab: initialTab } = location.state || {}; // 전달된 state에서 activeTab 가져오기

  const { authToken } = useAuth();

  const [activeTab, setActiveTab] = useState(initialTab || TABS.MEMBER);
  const { studyId } = useParams();
  const navigate = useNavigate();

  const [study, setStudy] = useState(null);
  const [members, setMembers] = useState([]);
  const [boards, setBoards] = useState([]);
  const [pendingCnt, setPendingCnt] = useState(0);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // boards page
  const [boardsPage, setBoardsPage] = useState(0);
  const [boardsTotalPages, setBoardsTotalPages] = useState(1);
  const [boardsTotalElements, setBoardsTotalElements] = useState(0);

  // 톱니바퀴 버튼
  const [showMenu, setShowMenu] = useState(false);

  const [role, setRole] = useState(STUDY_ROLE.MEMBER);
  const [myMemberId, setMyMemberId] = useState("");

  // 그룹 정보/멤버 가져오기

  const fetchMeetingInfo = useCallback(async () => {
    setError(null);
    setLoading(true);
    let isMounted = true;
    try {
      const [memberInfo, studyData] = await Promise.all([
        getMyInfoById(studyId, authToken),
        getStudyInfoAndMembersAndBoards(studyId, 0, 5),
      ]);

      if (isMounted) {
        setMyMemberId(memberInfo.memberId);
        setRole(memberInfo.role);
        setStudy(studyData);
        setMembers(studyData.members);
        setBoards(studyData.questions.content);
        setBoardsPage(studyData.questions.pageable.pageNumber);
        setBoardsTotalPages(studyData.questions.totalPages);
        setBoardsTotalElements(studyData.questions.totalElements);
        setPendingCnt(studyData.pendingCnt);
      }
    } catch (error) {
      if (isMounted) {
        console.error("데이터 불러오기 실패", error);
        setError("정보를 찾을 수 없습니다.");
      }
    } finally {
      if (isMounted) setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [studyId, authToken]); // studyId와 authToken이 변경될 때만 새로 생성

  useEffect(() => {
    fetchMeetingInfo();
  }, [fetchMeetingInfo]); // fetchMeetingInfo가 변경될 때만 실행

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
      setPendingCnt(membersData.pendingCnt);
    } catch (err) {
      setError("멤버 정보를 가져오지 못했습니다.");
    }
  };

  // 탭 클릭
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleStudyDelete = async () => {
    setError(null);
    setLoading(true);
    try {
      await deleteStudy(studyId, authToken);
      alert("삭제 완료");
      navigate("/");
    } catch (error) {
      console.error("스터디 삭제 실패", error);
      setError("스터디 삭제에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmClick = async (memberId) => {
    try {
      await confirmStudyMember({ studyId, memberId }, authToken);
      setMembers((prev) =>
        prev.map((member) =>
          member.memberId === memberId
            ? { ...member, status: MEMBER_STATUS.APPROVED }
            : member
        )
      );
      setPendingCnt((prev) => (prev ?? 0) - 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResignClick = async (memberId) => {
    try {
      await resignStudyMember({ studyId, memberId }, authToken);
      setMembers((prev) =>
        prev.filter((member) => member.memberId !== memberId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = () => setShowMenu((prevShowMenu) => !prevShowMenu);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchMeetingInfo} />;

  return (
    // <div className="study-info">
    <>
      {/* 그룹 정보 */}
      <div className="study-intro">
        <h2>{study.title}</h2>
        <p>{study.description} </p>
        <div className="settings-icon" onClick={toggleMenu}>
          {role === STUDY_ROLE.ADMIN && (
            <>
              <FaCog />
              {showMenu && (
                <div className="menu">
                  <button
                    onClick={() => navigate(`/edit-study/${study.studyId}`)}
                  >
                    수정
                  </button>
                  <button onClick={() => handleStudyDelete()}>삭제</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* 탭 */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === TABS.MEMBER ? "active" : ""}`}
          onClick={() => {
            handleTabClick(TABS.MEMBER);
          }}
        >
          멤버
        </button>
        <button
          className={`tab-button ${
            activeTab === TABS.SCHEDULE ? "active" : ""
          }`}
          onClick={() => {
            handleTabClick(TABS.SCHEDULE);
          }}
        >
          약속
        </button>
        <button
          className={`tab-button ${activeTab === TABS.BOARD ? "active" : ""}`}
          onClick={() => handleTabClick(TABS.BOARD)}
        >
          게시판
        </button>
      </div>
      {/* 탭 콘텐츠 */}
      <div className="tab-content">
        {/* 멤버탭 콘텐츠 */}

        {activeTab === TABS.MEMBER && (
          <MembersTab
            members={members}
            boards={boards}
            boardsPage={boardsPage}
            boardsTotalPages={boardsTotalPages}
            boardsTotalElements={boardsTotalElements}
            onPageChange={handlePageChange}
            studyId={studyId}
            role={role}
            myMemberId={myMemberId}
            pendingCnt={pendingCnt}
            setPendingCnt={setPendingCnt}
            handleConfirmClick={handleConfirmClick}
            handleResignClick={handleResignClick}
          />
        )}

        {/* 일정탭 콘텐츠 */}
        {activeTab === TABS.SCHEDULE && <ScheduleTab studyId={studyId} />}

        {/* 게시판 탭 */}
        {activeTab === TABS.BOARD && (
          <BoardsTab
            boards={boards}
            boardsPage={boardsPage}
            boardsTotalPages={boardsTotalPages}
            boardsTotalElements={boardsTotalElements}
            onPageChange={handlePageChange}
            studyId={studyId}
          />
        )}
      </div>
      {/* 하단 고정 버튼
      <div className="fixed-button-container">
        <button className="fixed-button" onClick={handleButtonClick}>
          {activeTab === TABS.MEMBER ? (
            <>
              <i className="icon fa fa-pencil-alt" aria-hidden="true"></i>
              <span>글쓰기</span>
            </>
          ) : (
            <>
              <i className="icon fa fa-calendar-plus" aria-hidden="true"></i>
              <span>일정 추가</span>
            </>
          )}
        </button>
      </div> */}
    </>
  );
};

export default StudyInfo;
