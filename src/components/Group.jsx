import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import greenlighticon from "../assets/greenlighticon.png";
import redlighticon from "../assets/redlighticon.png";
import UseGroupApi from "../server/UseGroupApi";
import GroupInfo from "./GroupInfo";
import { CATEGORY_ALL } from "./../constants/constants";

function Group({ categoryFilter, searchResult, loginData }) {
  const studyStatus = ["OPEN", "CLOSED"];

  const [isModalOpen, setModalOpen] = useState(false);
  const [groupInfoData, setGroupInfoData] = useState();

  const { data, loading, error } = UseGroupApi();

  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  function handleclick(data) {
    setGroupInfoData(data);
    handleOpenModal();
  }

  const filteredData = data.filter((e) => {
    if (categoryFilter === CATEGORY_ALL) return true; // 전체
    return e.category === categoryFilter;
  });

  const dataToRender =
    searchResult.length > 0
      ? filteredData.filter((e) =>
          searchResult.some((i) =>
            e.title.toLowerCase().includes(i.toLowerCase())
          )
        )
      : filteredData;

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="group-list">
      <div className="studymakediv">
        <GroupInfo
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          groupInfoData={groupInfoData}
          loginData={loginData}
        ></GroupInfo>
      </div>

      {dataToRender.length === 0 ? (
        <div>검색결과가 없습니다</div>
      ) : (
        dataToRender.map((data) => (
          <div className="group-card" key={data.studyId}>
            <button className="btn-component" onClick={() => handleclick(data)}>
              <div className="status">
                {data.status === studyStatus[0] ? (
                  <div className={`status ${data.status}`}>
                    <img src={greenlighticon} alt="" width={12} height={12} />
                    모집중
                  </div>
                ) : (
                  <div className={`status ${data.status}`}>❗모집완료</div>
                )}
              </div>
              <div className="btn-name">{data.title}</div>
              <div className="additional-content">{data.createdAt.slice(0, 10)}</div>
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Group;
