import React, { useEffect, useState } from "react";
import "../styles/MeetingInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  getStudyWithMember,
  getStudyMembers,
  getMyInfoById,
} from "../services/apiService";
import MembersTab from "../components/MembersTab";
import Popup from "../components/Popup";
import { useUser } from "../context/UserContext";
import ScheduleTab from "../components/ScheduleTab";
import { FaCog } from "react-icons/fa";

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
        const [memberInfo, meetingData] = await Promise.all([
          getMyInfoById(userId, studyId),
          getStudyWithMember(studyId),
        ]);

        setRole(memberInfo.role);
        setStudy(meetingData);
        setMembers(meetingData.members);
        setBoards(meetingData.questions);
      } catch (error) {
        console.error("데이터 불러오기 실패", error);
        setError("정보를 찾을 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingInfo();
  }, [studyId, userId]);

  // 그룹 멤버 가져오기
  const handleFetchMembers = async () => {
    try {
      const membersData = await getStudyMembers(studyId);
      setMembers(membersData.members);
      setBoards(membersData.questions);
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
      openPopup();
    } else {
      // 약속 생성 페이지로 이동
      navigate(`/schedule-create/${studyId}`);
    }
  };

  const handleAddMember = (response) => {
    setMembers((prev) => [...prev, response]);
  };

  const toggleMenu = () => setShowMenu((prevShowMenu) => !prevShowMenu);

  if (loading) return <div>Loading...</div>;

  //   if (loading) return <Loading />;
  // if (error) return <Error message={error} />;

  return (
    <div className="study-info">
      {/* 그룹 정보 */}
      <div className="study-intro">
        <h2>{study.title}</h2>
        <p>{study.description} </p>
        <div className="settings-icon" onClick={toggleMenu}>
          {role === "Leader" && (
            <>
              <FaCog />
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
          <MembersTab members={members} meetingId={studyId} boards={boards} />
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

      {/* popup 컴포넌트 */}
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        studyId={studyId}
        onMemberAdded={handleAddMember}
      />
    </div>
  );
};

export default StudyInfo;
