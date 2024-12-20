import React from "react";
import { useNavigate } from "react-router-dom";
import greenlighticon from "../assets/greenlighticon.png";
import redlighticon from "../assets/redlighticon.png";


export default function MyStudyList({ MyStudies }) {
  const navigate = useNavigate();

  // MyStudies가 배열인지 확인하고, 아니면 빈 배열로 초기화
  const validStudies = Array.isArray(MyStudies) ? MyStudies : [];

  function handleClick(data) {
    navigate(`/study-info/${data.studyId}`);
  }

  // 필터링된 데이터
  const filteredData = validStudies.filter((e) => e.status);

  return (
    <div className="mygrouplist">
      {filteredData.map((item) => (
        <div className="mygroup-card" key={item.studyId}>
          <button className="my-card" onClick={() => handleClick(item)}>
            <div className="status">
              {item.status === "OPEN" ? (
                <div className={`status ${item.status}`}>
                  <img
                    src={greenlighticon}
                    width={12}
                    height={12}
                    alt="Green light"
                  />
                  모집중
                </div>
              ) : (
                <div className={`status ${item.status}`}>❗모집완료</div>
              )}
            </div>
            <div className="btn-name">{item.title}</div>
          </button>
        </div>
      ))}
    </div>
  );
}
