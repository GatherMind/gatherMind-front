import UseMemberApi from "../server/UseMemberApi"
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import greenlighticon from "../assets/greenlighticon.png";
import redlighticon from "../assets/redlighticon.png";
import UseGroupApi from "../server/UseGroupApi";
import GroupInfo from "./GroupInfo";




export default function MyStudyList({setHasStudy,handdlesetDataLoaded}){ 

  const [isModalOpen, setModalOpen] = useState(false);
  const [groupInfoData, setGroupInfoData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);


  const navigate = useNavigate();


  const {data, loading, error} = UseMemberApi(); 


  useEffect(() => {
    handdlesetDataLoaded(dataLoaded)

    if (data.length>0) {
      setHasStudy(true);  // 데이터가 있으면 hasStudy 상태를 true로 설정
    } else {
      setHasStudy(false);  // 데이터가 없으면 false
    }  // 데이터 로딩 완료
  }, []); 
  

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpenModal = () => {
    console.log("열림");

    setModalOpen(true);
  };

  function handleClick(data) {
    console.log(data)
    setGroupInfoData(data)
    handleOpenModal();
  }




  return (

    <div className="mygrouplist">
     
    <GroupInfo isOpen={isModalOpen} onClose={handleCloseModal} groupInfoData={groupInfoData}>
      <h2></h2>
    </GroupInfo>

         {data.map((item) => (
          <div className="mygroup-card" key={item.id}>
            <button className="my-card" onClick={() => handleClick(item)}>
              <div className="status">
                {item.status === "false" ? (
                  <div className={`status ${item.status}`}>
                    <img src={greenlighticon} width={12} height={12} alt="Green light" />
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



  )
}