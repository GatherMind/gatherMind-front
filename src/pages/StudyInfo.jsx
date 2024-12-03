import React, { useEffect, useState } from "react";
import "../styles/MeetingInfo.css";
import "../styles/global/Container.css";
import "../styles/global/Tabs.css";
import "../styles/global/FixedButton.css";
import "../styles/global/DropdownMenu.css";
import { useNavigate, useParams } from "react-router-dom";
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
import { MEMBER_ROLE, TABS, MEMBER_STATUS } from "../constants/constants.js";

const StudyInfo = () => {
  const { authToken } = useAuth();

  const [activeTab, setActiveTab] = useState(TABS.MEMBER);
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

  const [role, setRole] = useState(MEMBER_ROLE.MEMBER);

  // 그룹 정보/멤버 가져오기

  const fetchMeetingInfo = async () => {
    setError(null);
    setLoading(true);
    let isMounted = true;
    try {
      const [memberInfo, studyData] = await Promise.all([
        getMyInfoById(studyId, authToken),
        getStudyInfoAndMembersAndBoards(studyId, 0, 5),
      ]);

      if (isMounted) {
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
        console.log(error);
        console.error("데이터 불러오기 실패", error);
        setError("정보를 찾을 수 없습니다.");
      }
    } finally {
      if (isMounted) setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    fetchMeetingInfo();
  }, []);

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
    if (tab === TABS.MEMBER) {
      handleFetchMembers();
    }
  };

  // 탭 클릭
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

  // fixed 버튼 클릭시
  const handleButtonClick = () => {
    if (activeTab === TABS.MEMBER) {
      navigate(`/create-question`, { state: { studyId } });
    } else {
      // 일정 생성 페이지로 이동
      navigate(`/create-schedule`, { state: { studyId } });
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
          {role === MEMBER_ROLE.ADMIN && (
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

      {/* 멤버 / 약속 탭 */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === TABS.MEMBER ? "active" : ""}`}
          onClick={() => {
            handleTabClick("members");
            handleFetchMembers();
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
            pendingCnt={pendingCnt}
            setPendingCnt={setPendingCnt}
            handleConfirmClick={handleConfirmClick}
            handleResignClick={handleResignClick}
          />
        )}

        {/* 일정탭 콘텐츠 */}
        {activeTab === TABS.SCHEDULE && <ScheduleTab studyId={studyId} />}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed-button">
        <button onClick={handleButtonClick}>
          {activeTab === TABS.MEMBER ? "글쓰기" : "일정 추가"}
        </button>
      </div>
    </>
  );
};

export default StudyInfo;
