import React, { useEffect, useState } from "react";
import "../styles/MeetingInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMeetingWithMember,
  getMeetingMembers,
} from "../services/apiService";
import MembersTab from "../components/MembersTab";
import AppointmentTab from "./../components/AppointmentTab";
import Popup from "../components/Popup";
import { useUser } from "../context/UserContext";

const MeetingInfo = () => {
  // 임시
  const { setUserId } = useUser();
  setUserId("member1");

  const [activeTab, setActiveTab] = useState("members");
  const { id } = useParams();
  const navigate = useNavigate();

  const [meeting, setMeeting] = useState(null);
  const [members, setMembers] = useState([]);
  const [rank, setRank] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 팝업 관련
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  // 그룹 정보/멤버 가져오기
  useEffect(() => {
    const fetchMeetingInfo = async () => {
      try {
        const meetingData = await getMeetingWithMember(id);
        setMeeting(meetingData);
        setMembers(meetingData.members);
        setRank(meetingData.memberLateCountDTOS);
      } catch (err) {
        console.error("그룹 정보 불러오기 실패", err);
        setError("그룹 정보를 찾을 수 없습니다.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingInfo();
  }, [id, navigate]);

  // 그룹 멤버 가져오기
  const handleFetchMembers = async () => {
    try {
      const membersData = await getMeetingMembers(id);
      setMembers(membersData.members);
      setRank(membersData.memberLateCountDTOS);
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
      // navigate();
    }
  };

  const handleAddMember = (response) => {
    setMembers((prev) => [...prev, response]);
  };

  // if (!meeting) return <div>Loading...</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="meeting-info">
      {/* 그룹 정보 */}
      <div className="meeting-intro">
        <h2>{meeting.meetingName}</h2>
        <p>{meeting.meetingInfo} </p>
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
          className={`tab-button ${
            activeTab === "appointments" ? "active" : ""
          }`}
          onClick={() => {
            handleTabClick("appointments");
          }}
        >
          약속
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="tab-content">
        {/* 멤버탭 콘텐츠 */}

        {activeTab === "members" && (
          <MembersTab members={members} rank={rank} meetingId={id} />
        )}

        {/* 약속탭 콘텐츠 */}
        {activeTab === "appointments" && <AppointmentTab meetingId={id} />}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed-button">
        <button onClick={handleButtonClick}>
          {activeTab === "members" ? "멤버 추가" : "약속 추가"}
        </button>
      </div>

      {/* popup 컴포넌트 */}
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        meetingId={id}
        onMemberAdded={handleAddMember}
      />
    </div>
  );
};

export default MeetingInfo;
